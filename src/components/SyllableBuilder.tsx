import React, { useMemo, useState } from 'react';
import { Volume2, Layers } from 'lucide-react';
import { composeHangul } from '../utils/speech';

interface SyllableBuilderProps {
  onSpeak: (text: string, label?: string) => void;
  activeSpeakKey: string | null;
}

const INITIALS = [
  { char: 'ㄱ', rom: 'g/k' },
  { char: 'ㄴ', rom: 'n' },
  { char: 'ㄷ', rom: 'd/t' },
  { char: 'ㄹ', rom: 'r' },
  { char: 'ㅁ', rom: 'm' },
  { char: 'ㅂ', rom: 'b/p' },
  { char: 'ㅅ', rom: 's' },
  { char: 'ㅇ', rom: 'muto' },
  { char: 'ㅈ', rom: 'j' },
  { char: 'ㅊ', rom: 'ch' },
  { char: 'ㅋ', rom: 'k' },
  { char: 'ㅌ', rom: 't' },
  { char: 'ㅍ', rom: 'p' },
  { char: 'ㅎ', rom: 'h' },
  { char: 'ㄲ', rom: 'kk' },
  { char: 'ㄸ', rom: 'tt' },
  { char: 'ㅃ', rom: 'pp' },
  { char: 'ㅆ', rom: 'ss' },
  { char: 'ㅉ', rom: 'jj' },
];

const VOWELS = [
  { char: 'ㅏ', rom: 'a', orient: 'vertical' },
  { char: 'ㅑ', rom: 'ya', orient: 'vertical' },
  { char: 'ㅓ', rom: 'eo', orient: 'vertical' },
  { char: 'ㅕ', rom: 'yeo', orient: 'vertical' },
  { char: 'ㅗ', rom: 'o', orient: 'horizontal' },
  { char: 'ㅛ', rom: 'yo', orient: 'horizontal' },
  { char: 'ㅜ', rom: 'u', orient: 'horizontal' },
  { char: 'ㅠ', rom: 'yu', orient: 'horizontal' },
  { char: 'ㅡ', rom: 'eu', orient: 'horizontal' },
  { char: 'ㅣ', rom: 'i', orient: 'vertical' },
  { char: 'ㅐ', rom: 'ae', orient: 'vertical' },
  { char: 'ㅔ', rom: 'e', orient: 'vertical' },
  { char: 'ㅘ', rom: 'wa', orient: 'complex' },
  { char: 'ㅝ', rom: 'wo', orient: 'complex' },
  { char: 'ㅟ', rom: 'wi', orient: 'complex' },
  { char: 'ㅢ', rom: 'ui', orient: 'complex' },
];

const FINALS = [
  { char: '', label: 'Nessuno', rom: '', note: 'Sillaba aperta (finisce per vocale).' },
  { char: 'ㄱ', label: 'ㄱ', rom: 'k', note: 'Suono "k" trattenuto in gola senza aria.' },
  { char: 'ㄴ', label: 'ㄴ', rom: 'n', note: 'Suono nasale "n" dolce.' },
  { char: 'ㄷ', label: 'ㄷ', rom: 't', note: 'Suono "t" bloccato con la punta della lingua.' },
  { char: 'ㄹ', label: 'ㄹ', rom: 'l', note: 'In Batchim diventa sempre una "L" piena!' },
  { char: 'ㅁ', label: 'ㅁ', rom: 'm', note: 'Labbra chiuse in una "m" morbida.' },
  { char: 'ㅂ', label: 'ㅂ', rom: 'p', note: 'Labbra chiuse in una "p" muta senza soffio.' },
  { char: 'ㅅ', label: 'ㅅ', rom: 't', note: 'Eccezione Batchim: non sibila, si ferma come una "t"!' },
  { char: 'ㅇ', label: 'ㅇ', rom: 'ng', note: 'In Batchim non è più muto: suona "ng" come in gong!' },
  { char: 'ㅈ', label: 'ㅈ', rom: 't', note: 'Eccezione Batchim: si neutralizza in una "t" muta!' },
  { char: 'ㅊ', label: 'ㅊ', rom: 't', note: 'Eccezione Batchim: perde il soffio e diventa "t" muta!' },
  { char: 'ㅋ', label: 'ㅋ', rom: 'k', note: 'Eccezione Batchim: perde il soffio e suona come ㄱ!' },
  { char: 'ㅌ', label: 'ㅌ', rom: 't', note: 'Eccezione Batchim: perde il soffio e resta "t" muta.' },
  { char: 'ㅍ', label: 'ㅍ', rom: 'p', note: 'Eccezione Batchim: perde il soffio e suona come ㅂ.' },
  { char: 'ㅎ', label: 'ㅎ', rom: 't', note: 'Da sola si ferma come "t" (o sparisce prima di vocale).' },
  { char: 'ㅆ', label: 'ㅆ', rom: 't', note: 'Da sola si ferma come "t" (ma davanti a vocale scatta "ss"!).' },
];

export const SyllableBuilder: React.FC<SyllableBuilderProps> = ({
  onSpeak,
  activeSpeakKey,
}) => {
  const [initial, setInitial] = useState('ㅎ');
  const [vowel, setVowel] = useState('ㅏ');
  const [finalC, setFinalC] = useState('ㄴ');

  const syllable = useMemo(
    () => composeHangul(initial, vowel, finalC),
    [initial, vowel, finalC]
  );

  const vowelMeta = VOWELS.find((v) => v.char === vowel) ?? VOWELS[0];
  const initialMeta = INITIALS.find((i) => i.char === initial) ?? INITIALS[0];
  const finalMeta = FINALS.find((f) => f.char === finalC) ?? FINALS[0];

  const teacherPronunciationNote = useMemo(() => {
    const notes: string[] = [];

    if (initial === 'ㅇ') {
      notes.push('La consonante iniziale ㅇ è muta: ascolterai direttamente la vocale.');
    } else if (
      (initial === 'ㅅ' || initial === 'ㅆ') &&
      (vowel === 'ㅣ' || vowel === 'ㅑ' || vowel === 'ㅕ' || vowel === 'ㅛ' || vowel === 'ㅠ' || vowel === 'ㅟ')
    ) {
      notes.push(`Attenzione! Con ${vowel}, la ${initial} si addolcisce e suona "SH" (come in sciarpa)!`);
    }

    if (finalC !== '') {
      notes.push(finalMeta.note);
    }

    if (notes.length === 0) {
      notes.push('Combinazione regolare: unisci la consonante iniziale con il suono della vocale.');
    }

    return notes.join(' ');
  }, [initial, vowel, finalC, finalMeta.note]);

  const approxReading = useMemo(() => {
    const initPart =
      initial === 'ㅇ'
        ? ''
        : (initial === 'ㅅ' || initial === 'ㅆ') && (vowel === 'ㅣ' || vowel === 'ㅟ')
        ? initial === 'ㅆ'
          ? 'ssh'
          : 'sh'
        : initialMeta.rom.split('/')[0];

    const vowelPart = vowelMeta.rom;
    const finalPart = finalMeta.rom;
    return `${initPart}${vowelPart}${finalPart}`;
  }, [initial, vowel, initialMeta.rom, vowelMeta.rom, finalMeta.rom]);

  const blockGeometryDesc =
    vowelMeta.orient === 'vertical'
      ? finalC
        ? 'Blocco a 3 zone: Consonante a sinistra, Vocale a destra, Batchim sotto'
        : 'Blocco affiancato: Consonante a sinistra + Vocale verticale a destra'
      : vowelMeta.orient === 'horizontal'
      ? finalC
        ? 'Blocco a torre (3 piani): Consonante sopra, Vocale al centro, Batchim sotto'
        : 'Blocco sovrapposto: Consonante sopra + Vocale orizzontale sotto'
      : finalC
      ? 'Blocco avvolgente + Batchim sotto'
      : 'Blocco avvolgente: la vocale composta abbraccia la consonante';

  return (
    <section className="space-y-6">
      <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#1E3A8A] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-sky-200">
              Laboratorio pratico · Blocchi sillabici Hangul
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-0.5">
              Fabbrica delle Sillabe
            </h2>
          </div>
          <span className="text-sm font-medium text-sky-100">
            Unisci Consonante + Vocale + Batchim
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-2xl">
              In coreano le lettere non stanno mai in fila indiana come in italiano: si incastrano in un quadratino armonioso! Scegli una consonante iniziale, una vocale e un eventuale Batchim finale per vedere e ascoltare la sillaba reale.
            </p>

            <div className="flex items-center gap-5 bg-slate-100 border-2 border-slate-300 rounded-2xl p-5 shrink-0">
              <div className="w-28 h-28 bg-white border-2 border-slate-300 rounded-xl flex items-center justify-center">
                <span className="font-hangul text-6xl sm:text-7xl font-bold text-slate-900 select-none">
                  {syllable}
                </span>
              </div>
              <div className="space-y-2.5 min-w-[175px]">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-mono-tabular">
                  <span>{initial}</span>
                  <span>+</span>
                  <span>{vowel}</span>
                  {finalC && (
                    <>
                      <span>+</span>
                      <span>{finalC}</span>
                    </>
                  )}
                </div>
                <p className="text-2xl font-bold text-slate-900">[{approxReading}]</p>
                <button
                  type="button"
                  onClick={() => onSpeak(syllable, `builder-${syllable}`)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSpeakKey === `builder-${syllable}`
                      ? 'bg-[#D97706] text-white'
                      : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  Ascolta Sillaba
                </button>
              </div>
            </div>
          </div>

          {/* Geometry & Teacher explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-4 sm:p-5 flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#0284C7] shrink-0 mt-1" />
              <div>
                <p className="text-sm font-bold text-slate-900">Come si incastrano i pezzi</p>
                <p className="text-base text-slate-700 mt-1 leading-relaxed">{blockGeometryDesc}</p>
              </div>
            </div>
            <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-4 sm:p-5">
              <p className="text-sm font-bold text-[#B45309]">Nota della Maestra</p>
              <p className="text-base text-slate-800 mt-1 leading-relaxed">
                {teacherPronunciationNote}
              </p>
            </div>
          </div>

          {/* Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Initial Consonant */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">
                1. Consonante iniziale ({initial})
              </p>
              <div className="grid grid-cols-5 gap-2">
                {INITIALS.map((item) => (
                  <button
                    key={item.char}
                    type="button"
                    onClick={() => {
                      setInitial(item.char);
                      onSpeak(composeHangul(item.char, vowel, finalC), `builder-init-${item.char}`);
                    }}
                    className={`py-2.5 px-1 rounded-xl border text-center transition-colors cursor-pointer ${
                      initial === item.char
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-white text-slate-900 border-slate-300 hover:bg-sky-50'
                    }`}
                  >
                    <span className="block font-hangul text-2xl font-bold leading-none">
                      {item.char}
                    </span>
                    <span
                      className={`block text-[11px] mt-1 ${
                        initial === item.char ? 'text-sky-100' : 'text-slate-500'
                      }`}
                    >
                      {item.rom}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Vowel */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">
                2. Vocale centrale ({vowel})
              </p>
              <div className="grid grid-cols-4 gap-2">
                {VOWELS.map((item) => (
                  <button
                    key={item.char}
                    type="button"
                    onClick={() => {
                      setVowel(item.char);
                      onSpeak(composeHangul(initial, item.char, finalC), `builder-vow-${item.char}`);
                    }}
                    className={`py-2.5 px-1 rounded-xl border text-center transition-colors cursor-pointer ${
                      vowel === item.char
                        ? 'bg-[#0284C7] text-white border-[#0284C7]'
                        : 'bg-white text-slate-900 border-slate-300 hover:bg-sky-50'
                    }`}
                  >
                    <span className="block font-hangul text-2xl font-bold leading-none">
                      {item.char}
                    </span>
                    <span
                      className={`block text-[11px] mt-1 ${
                        vowel === item.char ? 'text-sky-100' : 'text-slate-500'
                      }`}
                    >
                      {item.rom}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Batchim */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">
                3. Batchim finale ({finalC || 'nessuno'})
              </p>
              <div className="grid grid-cols-4 gap-2">
                {FINALS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setFinalC(item.char);
                      onSpeak(composeHangul(initial, vowel, item.char), `builder-fin-${item.label}`);
                    }}
                    className={`py-2.5 px-1 rounded-xl border text-center transition-colors cursor-pointer ${
                      finalC === item.char
                        ? 'bg-[#D97706] text-white border-[#D97706]'
                        : 'bg-white text-slate-900 border-slate-300 hover:bg-amber-50'
                    }`}
                  >
                    <span className="block font-hangul text-xl font-bold leading-none truncate px-1">
                      {item.char || '∅'}
                    </span>
                    <span
                      className={`block text-[11px] mt-1 truncate px-1 ${
                        finalC === item.char ? 'text-amber-100' : 'text-slate-500'
                      }`}
                    >
                      {item.rom || 'aperto'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
