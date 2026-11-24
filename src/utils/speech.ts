export interface SpeechCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (reason: string) => void;
}

export interface KoreanVoiceChoice {
  id: string;
  label: string;
  provider: 'google-hd' | 'device';
  voice?: SpeechSynthesisVoice;
}

export const GOOGLE_HD_VOICE_ID = 'google-tts-hd';

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
let currentAudio: HTMLAudioElement | null = null;

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function formatDeviceVoiceLabel(v: SpeechSynthesisVoice): string {
  const lower = `${v.name} ${v.voiceURI}`.toLowerCase();
  if (lower.includes('google') && (lower.includes('ko-kr') || lower.includes('android') || lower.includes('x-'))) {
    return `Android / Google — ${v.name}`;
  }
  if (lower.includes('google')) {
    return `Google Browser — ${v.name}`;
  }
  if (lower.includes('samsung')) {
    return `Android Samsung — ${v.name}`;
  }
  return `Dispositivo — ${v.name} (${v.lang})`;
}

function voicePriority(v: SpeechSynthesisVoice): number {
  const lower = `${v.name} ${v.voiceURI}`.toLowerCase();
  if (lower.includes('google')) return 0;
  if (lower.includes('samsung') || lower.includes('android')) return 1;
  if (lower.includes('yuna') || lower.includes('sora') || lower.includes('heami')) return 2;
  return 3;
}

export function getKoreanVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
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
  return ko.sort((a, b) => voicePriority(a) - voicePriority(b));
}

export function getAllKoreanVoiceChoices(): KoreanVoiceChoice[] {
  const choices: KoreanVoiceChoice[] = [
    {
      id: GOOGLE_HD_VOICE_ID,
      label: 'Google Coreano (Voce Naturale HD)',
      provider: 'google-hd',
    },
  ];

  const deviceVoices = getKoreanVoices();
  for (const v of deviceVoices) {
    choices.push({
      id: v.voiceURI,
      label: formatDeviceVoiceLabel(v),
      provider: 'device',
      voice: v,
    });
  }

  return choices;
}

export function stopKoreanSpeech(): void {
  if (speakTimer) {
    clearTimeout(speakTimer);
    speakTimer = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  currentUtterance = null;
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
}

function speakWithDeviceVoice(
  text: string,
  rate: number,
  voice: SpeechSynthesisVoice | undefined,
  callbacks?: SpeechCallbacks
): void {
  if (!isSpeechSupported()) {
    callbacks?.onError?.('Sintesi vocale del dispositivo non disponibile.');
    callbacks?.onEnd?.();
    return;
  }

  const synth = window.speechSynthesis;
  const trigger = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;
    utterance.lang = 'ko-KR';
    // Avoid extreme slow stretching on Android/Google TTS
    utterance.rate = rate < 0.8 ? 0.75 : 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => callbacks?.onStart?.();
    utterance.onend = () => {
      currentUtterance = null;
      callbacks?.onEnd?.();
    };
    utterance.onerror = (event) => {
      currentUtterance = null;
      if (event.error === 'canceled' || event.error === 'interrupted') {
        callbacks?.onEnd?.();
        return;
      }
      callbacks?.onError?.(
        'La voce selezionata sul dispositivo non ha risposto. Prova la voce Google Coreano HD.'
      );
      callbacks?.onEnd?.();
    };

    try {
      synth.resume();
      synth.speak(utterance);
    } catch {
      callbacks?.onError?.('Impossibile avviare la voce del dispositivo.');
      callbacks?.onEnd?.();
    }
  };

  if (synth.speaking || synth.pending) {
    synth.cancel();
    speakTimer = setTimeout(trigger, 60);
  } else {
    trigger();
  }
}

export function speakKorean(
  text: string,
  options?: {
    rate?: number;
    voiceId?: string;
    callbacks?: SpeechCallbacks;
  }
): void {
  const rate = options?.rate ?? 1.0;
  const voiceId = options?.voiceId ?? GOOGLE_HD_VOICE_ID;
  const callbacks = options?.callbacks;

  stopKoreanSpeech();

  if (voiceId === GOOGLE_HD_VOICE_ID) {
    const audio = new Audio(`/api/tts?q=${encodeURIComponent(text)}`);
    currentAudio = audio;
    audio.playbackRate = rate < 0.8 ? 0.74 : 1.0;

    audio.onplay = () => callbacks?.onStart?.();
    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      callbacks?.onEnd?.();
    };
    audio.onerror = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      // Graceful fallback to first Google/Android device voice if network TTS fails
      const deviceVoices = getKoreanVoices();
      if (deviceVoices.length > 0) {
        speakWithDeviceVoice(text, rate, deviceVoices[0], callbacks);
      } else {
        callbacks?.onError?.('Voce Google non raggiungibile e nessuna voce ko-KR trovata sul dispositivo.');
        callbacks?.onEnd?.();
      }
    };

    audio.play().catch(() => {
      const deviceVoices = getKoreanVoices();
      if (deviceVoices.length > 0) {
        speakWithDeviceVoice(text, rate, deviceVoices[0], callbacks);
      } else {
        callbacks?.onError?.('Riproduzione bloccata dal browser. Tocca di nuovo per ascoltare.');
        callbacks?.onEnd?.();
      }
    });
    return;
  }

  const deviceVoices = getKoreanVoices();
  const matched = deviceVoices.find((v) => v.voiceURI === voiceId) ?? deviceVoices[0];
  speakWithDeviceVoice(text, rate, matched, callbacks);
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
          gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.08 + 0.02);
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
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
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
