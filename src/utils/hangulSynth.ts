import { CHOSEONG_LIST, JONGSEONG_LIST, JUNGSEONG_LIST } from './speech';

// Formant frequencies (Hz) [F1, F2, F3] for Korean vowels
const VOWEL_FORMANTS: Record<string, [number, number, number]> = {
  ㅏ: [750, 1220, 2600],
  ㅑ: [730, 1240, 2600],
  ㅓ: [560, 980, 2500],
  ㅕ: [550, 1020, 2500],
  ㅗ: [440, 780, 2450],
  ㅛ: [430, 800, 2450],
  ㅜ: [320, 760, 2350],
  ㅠ: [320, 820, 2350],
  ㅡ: [360, 1380, 2450],
  ㅣ: [290, 2250, 2950],
  ㅐ: [620, 1780, 2650],
  ㅒ: [600, 1800, 2650],
  ㅔ: [490, 1920, 2700],
  ㅖ: [480, 1950, 2700],
  ㅘ: [740, 1200, 2580],
  ㅙ: [610, 1760, 2640],
  ㅚ: [490, 1850, 2650],
  ㅝ: [550, 990, 2500],
  ㅞ: [490, 1900, 2680],
  ㅟ: [295, 2200, 2900],
  ㅢ: [310, 2100, 2850],
};

// Glide start formants for y- and w- diphthongs
const GLIDE_START: Record<string, [number, number, number]> = {
  ㅑ: [290, 2250, 2950],
  ㅕ: [290, 2250, 2950],
  ㅛ: [290, 2250, 2950],
  ㅠ: [290, 2250, 2950],
  ㅒ: [290, 2250, 2950],
  ㅖ: [290, 2250, 2950],
  ㅘ: [380, 740, 2400],
  ㅙ: [380, 740, 2400],
  ㅚ: [380, 740, 2400],
  ㅝ: [320, 760, 2350],
  ㅞ: [320, 760, 2350],
  ㅟ: [320, 760, 2350],
  ㅢ: [360, 1380, 2450],
};

interface DecomposedSyllable {
  initial: string;
  medial: string;
  final: string;
}

function decomposeKoreanText(text: string): DecomposedSyllable[] {
  const result: DecomposedSyllable[] = [];
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const fIdx = offset % 28;
      const mIdx = ((offset - fIdx) / 28) % 21;
      const iIdx = Math.floor(offset / (21 * 28));
      result.push({
        initial: CHOSEONG_LIST[iIdx],
        medial: JUNGSEONG_LIST[mIdx],
        final: JONGSEONG_LIST[fIdx],
      });
    } else if (JUNGSEONG_LIST.includes(ch as (typeof JUNGSEONG_LIST)[number])) {
      result.push({ initial: 'ㅇ', medial: ch, final: '' });
    } else if (CHOSEONG_LIST.includes(ch as (typeof CHOSEONG_LIST)[number])) {
      result.push({ initial: ch, medial: 'ㅏ', final: '' });
    }
  }
  return result;
}

function createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

let sharedAudioCtx: AudioContext | null = null;
let activeEndTimer: ReturnType<typeof setTimeout> | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioCtx();
  }
  return sharedAudioCtx;
}

/**
 * Must be called synchronously inside a user click/pointer event so the browser
 * unlocks Web Audio even if playback happens slightly later in an async fallback.
 */
export function unlockAudioContext(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch {
    // Ignore
  }
}

export async function synthesizeKoreanAudio(
  text: string,
  rate = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }

  const syllables = decomposeKoreanText(text);
  if (syllables.length === 0) return false;

  if (activeEndTimer) {
    clearTimeout(activeEndTimer);
    activeEndTimer = null;
  }

  onStart?.();

  // Master compressor + output gain for loud, clean, clipping-free playback
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-16, ctx.currentTime);
  compressor.knee.setValueAtTime(12, ctx.currentTime);
  compressor.ratio.setValueAtTime(6, ctx.currentTime);
  compressor.attack.setValueAtTime(0.005, ctx.currentTime);
  compressor.release.setValueAtTime(0.1, ctx.currentTime);

  const outGain = ctx.createGain();
  outGain.gain.setValueAtTime(0.95, ctx.currentTime);
  compressor.connect(outGain);
  outGain.connect(ctx.destination);

  const speedScale = Math.max(0.65, Math.min(1.4, 0.9 / Math.max(0.5, rate)));
  const syllableDur = 0.3 * speedScale;
  const gap = 0.055 * speedScale;

  let cursor = ctx.currentTime + 0.025;

  syllables.forEach((syl, idx) => {
    const start = cursor;
    const isLast = idx === syllables.length - 1;
    const dur = isLast ? syllableDur * 1.18 : syllableDur;

    // 1. Initial consonant onset
    let vowelDelay = 0.015;
    let basePitch = 190;
    let consonantGain = 0.0;
    let noiseFreq = 1800;
    let noiseDur = 0.035;

    if (['ㅋ', 'ㅌ', 'ㅍ', 'ㅊ', 'ㅎ'].includes(syl.initial)) {
      consonantGain = syl.initial === 'ㅎ' ? 0.36 : 0.45;
      noiseFreq = syl.initial === 'ㅊ' ? 3400 : syl.initial === 'ㅎ' ? 1400 : 2100;
      noiseDur = syl.initial === 'ㅎ' ? 0.08 : 0.065;
      vowelDelay = 0.06;
      basePitch = 212;
    } else if (['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'].includes(syl.initial)) {
      consonantGain = syl.initial === 'ㅆ' ? 0.48 : 0.25;
      noiseFreq = syl.initial === 'ㅆ' ? 4400 : 2300;
      noiseDur = syl.initial === 'ㅆ' ? 0.075 : 0.025;
      vowelDelay = syl.initial === 'ㅆ' ? 0.06 : 0.02;
      basePitch = 230;
    } else if (['ㅅ', 'ㅈ'].includes(syl.initial)) {
      const isPalatal = ['ㅣ', 'ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅟ'].includes(syl.medial);
      consonantGain = 0.38;
      noiseFreq = syl.initial === 'ㅅ' ? (isPalatal ? 2800 : 4000) : 3100;
      noiseDur = 0.06;
      vowelDelay = 0.05;
    } else if (['ㄱ', 'ㄷ', 'ㅂ'].includes(syl.initial)) {
      consonantGain = 0.24;
      noiseFreq = syl.initial === 'ㄱ' ? 1250 : syl.initial === 'ㄷ' ? 2000 : 900;
      noiseDur = 0.025;
      vowelDelay = 0.022;
    } else if (['ㄴ', 'ㅁ', 'ㄹ'].includes(syl.initial)) {
      const oscMurmur = ctx.createOscillator();
      const gainMurmur = ctx.createGain();
      oscMurmur.type = 'sine';
      oscMurmur.frequency.setValueAtTime(syl.initial === 'ㅁ' ? 210 : 250, start);
      gainMurmur.gain.setValueAtTime(0.001, start);
      gainMurmur.gain.linearRampToValueAtTime(0.28, start + 0.015);
      gainMurmur.gain.exponentialRampToValueAtTime(0.001, start + 0.06);
      oscMurmur.connect(gainMurmur);
      gainMurmur.connect(compressor);
      oscMurmur.start(start);
      oscMurmur.stop(start + 0.065);
      vowelDelay = 0.038;
    }

    if (consonantGain > 0) {
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = createNoiseBuffer(ctx, noiseDur);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(noiseFreq, start);
      filter.Q.setValueAtTime(1.6, start);

      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.001, start);
      nGain.gain.linearRampToValueAtTime(consonantGain, start + 0.008);
      nGain.gain.exponentialRampToValueAtTime(0.001, start + noiseDur);

      noiseSrc.connect(filter);
      filter.connect(nGain);
      nGain.connect(compressor);
      noiseSrc.start(start);
      noiseSrc.stop(start + noiseDur + 0.01);
    }

    // 2. Vowel Body: warm fundamental sine + 2nd harmonic + 3 boosted formant filters
    const vStart = start + vowelDelay;
    const vDur = Math.max(0.16, dur - vowelDelay);
    const targetFormants = VOWEL_FORMANTS[syl.medial] ?? [750, 1220, 2600];
    const startFormants = GLIDE_START[syl.medial] ?? targetFormants;

    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0.001, vStart);
    voiceGain.gain.linearRampToValueAtTime(0.65, vStart + 0.025);
    voiceGain.gain.setValueAtTime(0.58, vStart + vDur * 0.65);
    voiceGain.gain.exponentialRampToValueAtTime(0.001, vStart + vDur);
    voiceGain.connect(compressor);

    // Warm chest fundamental + octave harmonic so volume is always rich and audible
    const fundOsc = ctx.createOscillator();
    fundOsc.type = 'sine';
    fundOsc.frequency.setValueAtTime(basePitch, vStart);
    fundOsc.frequency.linearRampToValueAtTime(isLast ? 168 : 182, vStart + vDur);
    const fundGain = ctx.createGain();
    fundGain.gain.setValueAtTime(0.32, vStart);
    fundOsc.connect(fundGain);
    fundGain.connect(voiceGain);
    fundOsc.start(vStart);
    fundOsc.stop(vStart + vDur + 0.02);

    // Rich harmonic source through formant filters with strong makeup gain
    const sawOsc = ctx.createOscillator();
    sawOsc.type = 'sawtooth';
    sawOsc.frequency.setValueAtTime(basePitch, vStart);
    sawOsc.frequency.linearRampToValueAtTime(isLast ? 168 : 182, vStart + vDur);

    const filterConfigs = [
      { idx: 0, q: 4.5, gain: 2.4 },
      { idx: 1, q: 5.5, gain: 1.5 },
      { idx: 2, q: 6.5, gain: 0.7 },
    ];

    filterConfigs.forEach(({ idx: fIdx, q, gain }) => {
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(q, vStart);
      bp.frequency.setValueAtTime(startFormants[fIdx], vStart);
      if (GLIDE_START[syl.medial]) {
        bp.frequency.exponentialRampToValueAtTime(
          targetFormants[fIdx],
          vStart + Math.min(0.1, vDur * 0.45)
        );
      }
      const fGain = ctx.createGain();
      fGain.gain.setValueAtTime(gain, vStart);
      sawOsc.connect(bp);
      bp.connect(fGain);
      fGain.connect(voiceGain);
    });

    sawOsc.start(vStart);
    sawOsc.stop(vStart + vDur + 0.02);

    // 3. Final Batchim coda
    if (syl.final) {
      const codaStart = vStart + vDur * 0.76;
      if (['ㄴ', 'ㅁ', 'ㅇ', 'ㄹ'].includes(syl.final)) {
        const codaOsc = ctx.createOscillator();
        const codaGain = ctx.createGain();
        codaOsc.type = 'sine';
        codaOsc.frequency.setValueAtTime(syl.final === 'ㅇ' ? 185 : 225, codaStart);
        codaGain.gain.setValueAtTime(0.001, codaStart);
        codaGain.gain.linearRampToValueAtTime(0.24, codaStart + 0.015);
        codaGain.gain.exponentialRampToValueAtTime(0.001, codaStart + 0.08);
        codaOsc.connect(codaGain);
        codaGain.connect(compressor);
        codaOsc.start(codaStart);
        codaOsc.stop(codaStart + 0.085);
      }
    }

    cursor += dur + gap;
  });

  const totalMs = Math.max(250, Math.round((cursor - ctx.currentTime) * 1000));
  activeEndTimer = setTimeout(() => {
    activeEndTimer = null;
    onEnd?.();
  }, totalMs);

  return true;
}
