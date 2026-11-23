import React, { useState } from 'react';
import { ArrowRight, Volume2 } from 'lucide-react';
import { EXCEPTION_RULES } from '../data/exceptionsData';

interface ExceptionsMasterclassProps {
  onSpeak: (text: string, key?: string) => void;
  activeSpeakKey: string | null;
}

export const ExceptionsMasterclass: React.FC<ExceptionsMasterclassProps> = ({
  onSpeak,
  activeSpeakKey,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState(EXCEPTION_RULES[0].id);
  const [imgFailed, setImgFailed] = useState(false);

  const activeRule =
    EXCEPTION_RULES.find((r) => r.id === selectedRuleId) ?? EXCEPTION_RULES[0];

  return (
    <section className="space-y-6">
      {/* Intro Split Banner */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#B45309] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-amber-100">
              Masterclass sulle eccezioni · Come leggono davvero i coreani
            </p>
            <h2 className="text-xl sm:text-2xl font-bold mt-0.5">
              Tutti i Segreti del Batchim e delle Eccezioni
            </h2>
          </div>
          <span className="text-sm font-medium text-amber-100">
            8 Regole Fondamentali
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-2xl">
              Spesso chi studia da solo impara le 40 lettere ma poi resta sorpreso sentendo parlare un coreano: perché <span className="font-hangul font-bold text-slate-900">합니다</span> si legge <em>ham-ni-da</em> e non <em>hap-ni-da</em>? Perché <span className="font-hangul font-bold text-slate-900">같이</span> diventa <em>ga-chi</em>? Qui trovi tutte le 8 leggi fonetiche spiegate con esempi reali parlati.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 min-h-[200px]">
            {!imgFailed ? (
              <img
                src="/src/assets/images/mnemonic_exceptions_bridge_1795460622180.jpg"
                alt="Illustrazione di due blocchetti di legno che si tengono per mano su un ponte sul ruscello, rappresentando il legamento dei suoni in coreano"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center bg-gradient-to-br from-sky-50 to-amber-50">
                <p className="text-base font-medium text-slate-700">
                  Ponte sonoro tra le sillabe coreane
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Rule Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rule Navigation List */}
        <div className="lg:col-span-4 bg-white border-2 border-slate-300 rounded-2xl p-3 space-y-1.5 shadow-sm">
          {EXCEPTION_RULES.map((rule) => {
            const isActive = rule.id === activeRule.id;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSelectedRuleId(rule.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-mono-tabular ${
                      isActive ? 'text-sky-200' : 'text-slate-500'
                    }`}
                  >
                    {rule.number} · {rule.koreanName}
                  </span>
                </div>
                <p className="text-base font-semibold mt-0.5 leading-snug">
                  {rule.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Rule Detailed Lesson */}
        <div className="lg:col-span-8 bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-[#0284C7] font-mono-tabular">
              Regola {activeRule.number} · {activeRule.koreanName}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
              {activeRule.title}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-slate-900 mt-3 bg-sky-50 border border-sky-200 rounded-xl p-4 leading-relaxed">
              {activeRule.shortRule}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-2">
              <p className="text-sm font-bold text-slate-900">
                Spiegazione della Maestra
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {activeRule.teacherExplanation}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 sm:p-5 space-y-2">
              <p className="text-sm font-bold text-[#B45309]">
                Immagine per ricordarlo subito
              </p>
              <p className="text-base text-slate-800 leading-relaxed">
                {activeRule.kidMetaphor}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-base font-bold text-slate-900">
              Esempi reali da ascoltare (Scritto → Pronunciato)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeRule.pairs.map((pair) => {
                const key = `exc-${activeRule.id}-${pair.written}`;
                const isPlaying = activeSpeakKey === key;
                return (
                  <button
                    key={pair.written}
                    type="button"
                    onClick={() => onSpeak(pair.written, key)}
                    className={`text-left p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-sky-50 border-[#0284C7]'
                        : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-[#0284C7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-hangul text-2xl font-bold">
                        <span className="text-slate-900">{pair.written}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-[#0284C7]">[{pair.spoken}]</span>
                      </div>
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isPlaying
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#0284C7] text-white'
                        }`}
                      >
                        <Volume2 className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-2">
                      {pair.meaning} · <span className="font-mono-tabular text-slate-600">{pair.romanization}</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {pair.note}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
