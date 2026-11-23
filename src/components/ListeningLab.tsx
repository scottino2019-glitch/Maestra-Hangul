import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Volume2, XCircle } from 'lucide-react';
import { HANGUL_LETTERS } from '../data/hangulData';
import { EAR_QUIZ_ITEMS, EarQuizItem } from '../data/exceptionsData';
import { playFeedbackTone } from '../utils/speech';

interface ListeningLabProps {
  onSpeak: (text: string, key?: string) => void;
  activeSpeakKey: string | null;
}

type QuizMode = 'minimal_pairs' | 'exceptions' | 'all_letters';

function buildLetterQuestions(): EarQuizItem[] {
  const pool = [...HANGUL_LETTERS];
  return pool.slice(0, 12).map((target, index) => {
    const distractors = HANGUL_LETTERS.filter(
      (l) => l.id !== target.id && l.category === target.category
    ).slice(0, 2);

    const rawOptions = [target, ...distractors];
    // Deterministic rotation based on index
    const rotated = rawOptions.map((_, i) => rawOptions[(i + index) % rawOptions.length]);

    return {
      id: `let-${target.id}`,
      mode: 'all_letters',
      promptSpeak: target.speakSyllable,
      promptHint: `Ascolta il suono della lezione ${target.lessonNumber} e trova la lettera giusta!`,
      correctOption: target.char,
      options: rotated.map((opt) => ({
        label: opt.char,
        sublabel: `${opt.nameKo} · "${opt.romanization}"`,
      })),
      teacherFeedback: `Esatto, è ${target.char} (${target.nameKo})! ${target.mnemonicTitle}: ${target.mnemonicStory}`,
    };
  });
}

export const ListeningLab: React.FC<ListeningLabProps> = ({
  onSpeak,
  activeSpeakKey,
}) => {
  const [mode, setMode] = useState<QuizMode>('minimal_pairs');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const items = useMemo(() => {
    if (mode === 'all_letters') return buildLetterQuestions();
    return EAR_QUIZ_ITEMS.filter((item) => item.mode === mode);
  }, [mode]);

  const current = items[index % items.length];
  const isAnswered = selected !== null;
  const isCorrect = selected === current.correctOption;

  const handleModeChange = (nextMode: QuizMode) => {
    setMode(nextMode);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnsweredCount(0);
  };

  const handleSelectOption = (label: string) => {
    if (isAnswered) return;
    setSelected(label);
    setAnsweredCount((c) => c + 1);
    if (label === current.correctOption) {
      setScore((s) => s + 1);
      playFeedbackTone('correct');
    } else {
      playFeedbackTone('retry');
    }
  };

  const handleNext = () => {
    setSelected(null);
    setIndex((i) => (i + 1) % items.length);
  };

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#0F766E] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-teal-100">
              Riconoscimento fonetico · Allenamento dell’orecchio
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-0.5">
              Laboratorio di Ascolto
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm font-mono-tabular text-teal-50">
            <span>
              Domanda {(index % items.length) + 1}/{items.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-white">
              Corrette: {score}/{answeredCount}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl mb-6 w-fit">
            <button
              type="button"
              onClick={() => handleModeChange('minimal_pairs')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'minimal_pairs'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Suoni simili (ㄱ/ㅋ/ㄲ · ㅓ/ㅗ)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('exceptions')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'exceptions'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Parole con eccezioni
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('all_letters')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'all_letters'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Lettere base
            </button>
          </div>

          {/* Audio Prompt Stage */}
          <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-6 text-center space-y-4">
            <p className="text-base sm:text-lg font-medium text-slate-800 max-w-lg mx-auto">
              {current.promptHint}
            </p>

            <button
              type="button"
              onClick={() => onSpeak(current.promptSpeak, `quiz-${current.id}`)}
              className={`inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSpeakKey === `quiz-${current.id}`
                  ? 'bg-[#D97706] text-white'
                  : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              Ascolta la pronuncia coreana
            </button>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {current.options.map((opt) => {
              const isChosen = selected === opt.label;
              const isRightOption = opt.label === current.correctOption;

              let cardClass =
                'bg-white border-2 border-slate-300 hover:border-[#0284C7] hover:bg-sky-50 text-slate-900';
              if (isAnswered) {
                if (isRightOption) {
                  cardClass = 'bg-emerald-50 border-2 border-emerald-600 text-slate-900';
                } else if (isChosen) {
                  cardClass = 'bg-rose-50 border-2 border-rose-500 text-slate-900';
                } else {
                  cardClass = 'bg-slate-50 border-2 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={opt.label}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.label)}
                  className={`p-5 rounded-2xl text-center transition-colors cursor-pointer disabled:cursor-default ${cardClass}`}
                >
                  <span className="block font-hangul text-4xl sm:text-5xl font-bold">
                    {opt.label}
                  </span>
                  <span className="block text-sm font-medium text-slate-700 mt-2.5">
                    {opt.sublabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Teacher Feedback */}
          {isAnswered && (
            <div
              className={`mt-6 p-5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-400'
                  : 'bg-amber-50 border-amber-400'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-base font-bold text-slate-900">
                    {isCorrect
                      ? 'Risposta esatta!'
                      : `Quasi! La risposta giusta era ${current.correctOption}`}
                  </p>
                  <p className="text-base text-slate-800 mt-1 leading-relaxed">
                    {current.teacherFeedback}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onSpeak(current.promptSpeak, `quiz-replay-${current.id}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Riascolta
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Prossima domanda
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
