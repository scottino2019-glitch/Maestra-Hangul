import { synthesizeKoreanAudio, unlockAudioContext } from './hangulSynth';

export type AudioEnginePreference = 'auto' | 'system' | 'synth';

export interface SpeechCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (reason: string) => void;
  onEngineUsed?: (engine: 'system' | 'synth') => void;
}

export const CHOSEONG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const;

export const JUNGSEONG_LIST = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
] as const;

export const JONGSEONG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const;

export function composeHangul(initial: string, medial: string, final = ''): string {
  const iIdx = CHOSEONG_LIST.indexOf(initial as (typeof CHOSEONG_LIST)[number]);
  const mIdx = JUNGSEONG_LIST.indexOf(medial as (typeof JUNGSEONG_LIST)[number]);
  const fIdx = JONGSEONG_LIST.indexOf(final as (typeof JONGSEONG_LIST)[number]);

  if (iIdx === -1 || mIdx === -1 || fIdx === -1) {
    return initial + medial + final;
  }

  const codePoint = 0xac00 + (iIdx * 21 + mIdx) * 28 + fIdx;
  return String.fromCharCode(codePoint);
}

let cachedVoices: SpeechSynthesisVoice[] = [];
let currentUtterance: SpeechSynthesisUtterance | null = null;
let speakTimer: ReturnType<typeof setTimeout> | null = null;
let watchdogTimer: ReturnType<typeof setTimeout> | null = null;

export function getKoreanVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  const source = voices.length > 0 ? voices : cachedVoices;
  const ko = source.filter((v) => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();
    return (
      lang.startsWith('ko') ||
      lang.includes('kor') ||
      name.includes('korean') ||
      name.includes('corean') ||
      name.includes('한국')
    );
  });
  // Prefer local OS voices over remote cloud voices (which often fail silently inside iframes)
  return ko.sort((a, b) => Number(b.localService) - Number(a.localService));
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopKoreanSpeech(): void {
  if (speakTimer) {
    clearTimeout(speakTimer);
    speakTimer = null;
  }
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }
  currentUtterance = null;
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakKorean(
  text: string,
  options?: {
    rate?: number;
    voiceURI?: string;
    engine?: AudioEnginePreference;
    callbacks?: SpeechCallbacks;
  }
): void {
  // CRITICAL: Unlock Web Audio synchronously inside user click gesture
  unlockAudioContext();

  const rate = options?.rate ?? 0.85;
  const preference = options?.engine ?? 'auto';
  const callbacks = options?.callbacks;

  stopKoreanSpeech();

  const koVoices = getKoreanVoices();
  const hasLocalKoVoice = koVoices.some((v) => v.localService);
  const canUseSystemVoice =
    isSpeechSupported() &&
    (preference === 'system' ? koVoices.length > 0 : hasLocalKoVoice);

  if (preference === 'synth' || (preference === 'auto' && !canUseSystemVoice)) {
    synthesizeKoreanAudio(
      text,
      rate,
      () => {
        callbacks?.onEngineUsed?.('synth');
        callbacks?.onStart?.();
      },
      () => callbacks?.onEnd?.()
    ).then((ok) => {
      if (!ok) {
        callbacks?.onError?.('Audio del browser non disponibile.');
        callbacks?.onEnd?.();
      }
    });
    return;
  }

  if (!isSpeechSupported()) {
    callbacks?.onError?.('Sintesi vocale di sistema non supportata.');
    return;
  }

  const synth = window.speechSynthesis;
  const selectedVoice = options?.voiceURI
    ? koVoices.find((v) => v.voiceURI === options.voiceURI)
    : undefined;

  const fallbackToSynth = () => {
    synthesizeKoreanAudio(
      text,
      rate,
      () => {
        callbacks?.onEngineUsed?.('synth');
        callbacks?.onStart?.();
      },
      () => callbacks?.onEnd?.()
    );
  };

  const triggerSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    if (selectedVoice ?? koVoices[0]) {
      utterance.voice = selectedVoice ?? koVoices[0];
    }

    let started = false;
    let startTimestamp = 0;

    watchdogTimer = setTimeout(() => {
      if (!started && preference === 'auto') {
        synth.cancel();
        currentUtterance = null;
        fallbackToSynth();
      }
    }, 450);

    utterance.onstart = () => {
      started = true;
      startTimestamp = Date.now();
      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
      callbacks?.onEngineUsed?.('system');
      callbacks?.onStart?.();
    };

    utterance.onend = () => {
      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
      currentUtterance = null;

      // Detect silent Chrome remote-voice failure (started & ended almost instantaneously)
      const elapsed = startTimestamp > 0 ? Date.now() - startTimestamp : 0;
      if (preference === 'auto' && (!started || elapsed < 85)) {
        fallbackToSynth();
        return;
      }
      callbacks?.onEnd?.();
    };

    utterance.onerror = (event) => {
      if (watchdogTimer) {
        clearTimeout(watchdogTimer);
        watchdogTimer = null;
      }
      currentUtterance = null;
      if (event.error === 'canceled' || event.error === 'interrupted') {
        callbacks?.onEnd?.();
        return;
      }
      if (preference === 'auto') {
        fallbackToSynth();
      } else {
        callbacks?.onError?.('La voce coreana di sistema non risponde.');
        callbacks?.onEnd?.();
      }
    };

    try {
      synth.resume();
      synth.speak(utterance);
    } catch {
      fallbackToSynth();
    }
  };

  if (synth.speaking || synth.pending) {
    synth.cancel();
    speakTimer = setTimeout(triggerSpeak, 60);
  } else {
    triggerSpeak();
  }
}

export function playFeedbackTone(type: 'correct' | 'retry'): void {
  if (typeof window === 'undefined') return;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  try {
    const ctx = new AudioCtx();
    const startTones = () => {
      const now = ctx.currentTime;
      if (type === 'correct') {
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.28, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.24);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.26);
        });
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.18);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      }
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 700);
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(startTones).catch(() => {});
    } else {
      startTones();
    }
  } catch {
    // Ignore audio context restrictions
  }
}
