import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
  Volume2,
  XCircle,
} from 'lucide-react';
import {
  HANGUL_LETTERS,
  LESSON_MODULES,
  ModuleId,
} from './data/hangulData';
import { LESSON_PRACTICE_MAP } from './data/lessonSentences';
import { MnemonicIllustration } from './components/MnemonicIllustration';
import { StrokeBoard } from './components/StrokeBoard';
import { SyllableBuilder } from './components/SyllableBuilder';
import { ExceptionsMasterclass } from './components/ExceptionsMasterclass';
import { ListeningLab } from './components/ListeningLab';
import {
  getAllKoreanVoiceChoices,
  GOOGLE_HD_VOICE_ID,
  isSpeechSupported,
  KoreanVoiceChoice,
  playFeedbackTone,
  speakKorean,
} from './utils/speech';

type ActiveSection = 'lessons' | 'syllables' | 'exceptions' | 'listening';

const STORAGE_KEY = 'maestra_hangul_completed_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('lessons');
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('vowels_basic');
  const [selectedLetterId, setSelectedLetterId] = useState<string>('a');

  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [voiceChoices, setVoiceChoices] = useState<KoreanVoiceChoice[]>(() =>
    getAllKoreanVoiceChoices()
  );
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(GOOGLE_HD_VOICE_ID);
  const [activeSpeakKey, setActiveSpeakKey] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const [hideReadings, setHideReadings] = useState<boolean>(false);
  const [lessonQuizChoice, setLessonQuizChoice] = useState<number | null>(null);

  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [moduleImgFailed, setModuleImgFailed] = useState(false);

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch {
      // Ignore storage errors
    }
  }, [completedIds]);

  const refreshVoices = useCallback(() => {
    const choices = getAllKoreanVoiceChoices();
    setVoiceChoices(choices);
  }, []);

  useEffect(() => {
    refreshVoices();
    if (isSpeechSupported()) {
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
      const timer = setTimeout(refreshVoices, 600);
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.removeEventListener('voiceschanged', refreshVoices);
      };
    }
  }, [refreshVoices]);

  // Reset per-letter quiz when changing letter
  useEffect(() => {
    setLessonQuizChoice(null);
  }, [selectedLetterId]);

  const handleSpeak = useCallback(
    (text: string, key?: string) => {
      setSpeechError(null);
      speakKorean(text, {
        rate: speechRate,
        voiceId: selectedVoiceId,
        callbacks: {
          onStart: () => setActiveSpeakKey(key ?? text),
          onEnd: () => setActiveSpeakKey(null),
          onError: (msg) => {
            setSpeechError(msg);
            setActiveSpeakKey(null);
          },
        },
      });
    },
    [speechRate, selectedVoiceId]
  );

  const activeModule = useMemo(
    () => LESSON_MODULES.find((m) => m.id === selectedModuleId) ?? LESSON_MODULES[0],
    [selectedModuleId]
  );

  const moduleLetters = useMemo(
    () => HANGUL_LETTERS.filter((l) => l.category === selectedModuleId),
    [selectedModuleId]
  );

  const activeLetter = useMemo(
    () => HANGUL_LETTERS.find((l) => l.id === selectedLetterId) ?? moduleLetters[0],
    [selectedLetterId, moduleLetters]
  );

  const activePractice = LESSON_PRACTICE_MAP[activeLetter.id];
  const currentGlobalIndex = HANGUL_LETTERS.findIndex((l) => l.id === activeLetter.id);

  const handleSelectModule = (modId: ModuleId) => {
    setSelectedModuleId(modId);
    setModuleImgFailed(false);
    const firstInModule = HANGUL_LETTERS.find((l) => l.category === modId);
    if (firstInModule) {
      setSelectedLetterId(firstInModule.id);
    }
  };

  const handleStepLetter = (direction: -1 | 1) => {
    const nextIndex = currentGlobalIndex + direction;
    if (nextIndex < 0 || nextIndex >= HANGUL_LETTERS.length) return;
    const nextLetter = HANGUL_LETTERS[nextIndex];
    setSelectedModuleId(nextLetter.category);
    setSelectedLetterId(nextLetter.id);
    setModuleImgFailed(false);
  };

  const toggleCompleted = (letterId: string) => {
    setCompletedIds((prev) =>
      prev.includes(letterId)
        ? prev.filter((id) => id !== letterId)
        : [...prev, letterId]
    );
  };

  const handleLessonQuizAnswer = (idx: number) => {
    if (lessonQuizChoice !== null || !activePractice) return;
    setLessonQuizChoice(idx);
    if (idx === activePractice.quizCorrectIndex) {
      playFeedbackTone('correct');
    } else {
      playFeedbackTone('retry');
    }
  };

  const isCompleted = completedIds.includes(activeLetter.id);

  const deviceVoicesCount = voiceChoices.filter((c) => c.provider === 'device').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#E5EBF3] text-[#0F172A]">
      {/* Top Bar Contract: Deep Navy for strong separation from content */}
      <header className="sticky top-0 z-30 bg-[#0F172A] text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand wordmark */}
          <button
            type="button"
            onClick={() => setActiveSection('lessons')}
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Maestra Hangul
          </button>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Navigazione principale"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {(
              [
                { id: 'lessons', label: 'Lezioni' },
                { id: 'syllables', label: 'Sillabe' },
                { id: 'exceptions', label: 'Eccezioni' },
                { id: 'listening', label: 'Ascolto' },
              ] as const
            ).map((nav) => {
              const active = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveSection(nav.id)}
                  className={`py-1.5 px-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0284C7] text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => handleSpeak('안녕하세요', 'header-test')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeSpeakKey === 'header-test'
                  ? 'bg-[#D97706] text-white'
                  : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
              }`}
            >
              Prova Voce Coreana
            </button>
          </div>
        </div>

        {/* Mobile navigation row */}
        <div className="md:hidden border-t border-slate-800 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto bg-[#1E293B]">
          {(
            [
              { id: 'lessons', label: 'Lezioni' },
              { id: 'syllables', label: 'Sillabe' },
              { id: 'exceptions', label: 'Eccezioni' },
              { id: 'listening', label: 'Ascolto' },
            ] as const
          ).map((nav) => {
            const active = activeSection === nav.id;
            return (
              <button
                key={nav.id}
                type="button"
                onClick={() => setActiveSection(nav.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#0284C7] text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {nav.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Visible Google & Android Voice Selector Bar */}
        <div className="bg-white border-2 border-slate-300 rounded-2xl px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-700">
            <span className="font-bold text-slate-900">
              Progresso: {completedIds.length}/40 lettere
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600">
              Voci dispositivo ko-KR rilevate: {deviceVoicesCount}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Voice Picker: Google & Android */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="korean-voice-picker"
                className="text-sm font-bold text-slate-900 whitespace-nowrap"
              >
                Voce:
              </label>
              <select
                id="korean-voice-picker"
                value={selectedVoiceId}
                onChange={(e) => setSelectedVoiceId(e.target.value)}
                className="px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border-2 border-slate-300 hover:border-[#0284C7] rounded-xl max-w-[290px] cursor-pointer"
              >
                {voiceChoices.map((choice) => (
                  <option key={choice.id} value={choice.id}>
                    {choice.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={refreshVoices}
                title="Aggiorna elenco voci Android e dispositivo"
                aria-label="Aggiorna elenco voci Android e dispositivo"
                className="p-2 text-slate-700 bg-slate-100 border border-slate-300 hover:bg-slate-200 rounded-xl cursor-pointer shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => setSpeechRate(0.75)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  speechRate < 0.85
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Lento
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  speechRate >= 0.85
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Naturale
              </button>
            </div>
          </div>
        </div>

        {speechError && (
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 text-base text-slate-900">
            <strong className="font-bold">Nota audio:</strong> {speechError}
          </div>
        )}

        {/* ==================== SECTION: LEZIONI ==================== */}
        {activeSection === 'lessons' && (
          <div className="space-y-8">
            {/* Welcome Classroom Banner (Compact 2-column split) */}
            <div className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-sm">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-sm font-bold text-[#0284C7]">
                  Corso guidato di alfabeto coreano · Senza AI
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1.5 leading-tight text-balance">
                  Impara a leggere, scrivere e capire l’Hangul passo dopo passo
                </h1>
                <p className="text-base sm:text-[17px] text-slate-700 mt-3 leading-relaxed max-w-2xl">
                  Segui i 4 settori qui sotto: scegli la lettera, guarda l’immagine per memorizzarla, leggi la spiegazione della maestra con le sue eccezioni, esercitati su sillabe e frasi intere, e verifica cosa hai imparato.
                </p>
              </div>

              <div className="lg:col-span-5 bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 min-h-[210px]">
                {!heroImgFailed ? (
                  <img
                    src="/src/assets/images/hero_hangul_classroom_1795460621085.jpg"
                    alt="Illustrazione di una classe coreana luminosa con un coniglietto insegnante davanti alla lavagna con le lettere Hangul"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-50 to-amber-50">
                    <span className="font-hangul text-5xl font-bold text-slate-800">
                      ㄱ ㄴ ㅁ
                    </span>
                    <p className="text-sm text-slate-600 mt-2">
                      Aula di Hangul passo dopo passo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* SETTORE 1: SCEGLI MODULO E LETTERA */}
            <section className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#1E293B] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-bold">
                  Settore 1 · Scegli il Modulo e la Lettera
                </h2>
                <span className="text-sm text-slate-300 font-mono-tabular">
                  {activeModule.subtitle}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                {/* 4 Module Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {LESSON_MODULES.map((mod) => {
                    const active = mod.id === selectedModuleId;
                    const doneInMod = HANGUL_LETTERS.filter(
                      (l) => l.category === mod.id && completedIds.includes(l.id)
                    ).length;
                    const totalInMod = HANGUL_LETTERS.filter(
                      (l) => l.category === mod.id
                    ).length;

                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => handleSelectModule(mod.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-slate-50 text-slate-900 border-slate-300 hover:bg-sky-50 hover:border-[#0284C7]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono-tabular">
                          <span className={active ? 'text-sky-200' : 'text-slate-500'}>
                            Modulo {mod.number}
                          </span>
                          <span className={active ? 'text-sky-200' : 'text-slate-600 font-semibold'}>
                            {doneInMod}/{totalInMod}
                          </span>
                        </div>
                        <p className="text-base font-bold mt-1">{mod.title}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Module Teacher Intro */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-100 border border-slate-300 rounded-xl p-4">
                  <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-white">
                    {!moduleImgFailed ? (
                      <img
                        src={activeModule.imagePath}
                        alt={activeModule.title}
                        referrerPolicy="no-referrer"
                        onError={() => setModuleImgFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-600">
                        {activeModule.number}
                      </div>
                    )}
                  </div>
                  <p className="text-base text-slate-800 leading-relaxed">
                    {activeModule.teacherIntro}
                  </p>
                </div>

                {/* Big Clear Letter Selector Tiles */}
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2.5">
                    Premi una lettera per aprire la lezione:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {moduleLetters.map((letter) => {
                      const selected = letter.id === activeLetter.id;
                      const done = completedIds.includes(letter.id);
                      return (
                        <button
                          key={letter.id}
                          type="button"
                          onClick={() => setSelectedLetterId(letter.id)}
                          className={`min-w-[72px] px-3.5 py-3 rounded-xl border-2 text-center transition-colors cursor-pointer ${
                            selected
                              ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                              : done
                              ? 'bg-emerald-50 text-slate-900 border-emerald-500 hover:bg-emerald-100'
                              : 'bg-white text-slate-900 border-slate-300 hover:border-[#0284C7] hover:bg-sky-50'
                          }`}
                        >
                          <span className="block font-hangul text-3xl font-bold leading-none">
                            {letter.char}
                          </span>
                          <span
                            className={`block text-xs font-mono-tabular mt-1.5 font-semibold ${
                              selected ? 'text-sky-200' : 'text-slate-600'
                            }`}
                          >
                            {letter.romanization}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* SETTORE 2: LA LETTERA, IMMAGINE E SPIEGAZIONE DELLA MAESTRA */}
            <section className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#1E3A8A] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-sky-200 font-mono-tabular">
                    Lezione {String(activeLetter.lessonNumber).padStart(2, '0')} di 40 · Nome coreano: {activeLetter.nameKo}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold mt-0.5">
                    Settore 2 · La Lettera {activeLetter.char} e la Spiegazione della Maestra
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentGlobalIndex <= 0}
                    onClick={() => handleStepLetter(-1)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Precedente
                  </button>
                  <button
                    type="button"
                    disabled={currentGlobalIndex >= HANGUL_LETTERS.length - 1}
                    onClick={() => handleStepLetter(1)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-sky-50 disabled:opacity-40 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                  >
                    Prossima
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Dominant Letter Card + Audio + Visual Mnemonic */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-2xl bg-white text-slate-900 flex items-center justify-center">
                      <span className="font-hangul text-7xl font-black select-none">
                        {activeLetter.char}
                      </span>
                    </div>

                    <div>
                      <p className="text-2xl font-bold">
                        Suono [{activeLetter.romanization}]
                      </p>
                      <p className="text-base text-slate-300 mt-1 leading-snug">
                        {activeLetter.italianApprox}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeak(activeLetter.speakSyllable, `sound-${activeLetter.id}`)
                        }
                        className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeSpeakKey === `sound-${activeLetter.id}`
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        Ascolta ({activeLetter.speakSyllable})
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeak(activeLetter.nameKo, `name-${activeLetter.id}`)
                        }
                        className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          activeSpeakKey === `name-${activeLetter.id}`
                            ? 'bg-[#D97706] text-white border-[#D97706]'
                            : 'bg-slate-800 border-slate-600 text-white hover:bg-slate-700'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        Nome ({activeLetter.nameKo})
                      </button>
                    </div>
                  </div>

                  {/* Child-Friendly Visual Mnemonic SVG */}
                  <MnemonicIllustration letter={activeLetter} />
                </div>

                {/* Right: Large-Font Teacher Explanation + Mouth + Exceptions */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 sm:p-6 space-y-2">
                    <h3 className="text-sm font-bold text-[#1E3A8A]">
                      La Maestra ti spiega
                    </h3>
                    <p className="text-lg text-slate-900 leading-relaxed">
                      {activeLetter.teacherSpeech}
                    </p>
                  </div>

                  <div className="bg-sky-50 border border-sky-300 rounded-2xl p-5 space-y-1.5">
                    <h3 className="text-sm font-bold text-[#0369A1]">
                      Come posizionare bocca e lingua
                    </h3>
                    <p className="text-base sm:text-[17px] text-slate-800 leading-relaxed">
                      {activeLetter.mouthTip}
                    </p>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 space-y-3.5">
                    <h3 className="text-base font-bold text-[#B45309]">
                      Eccezioni e regole speciali di {activeLetter.char}
                    </h3>

                    {activeLetter.exceptions.map((exc, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-amber-300 rounded-xl p-4 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-base font-bold text-slate-900">
                            {exc.title}
                          </span>
                          <span className="text-xs font-semibold text-amber-800">
                            {exc.position}
                          </span>
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed">
                          {exc.rule}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            handleSpeak(exc.exampleWord, `exc-let-${activeLetter.id}-${idx}`)
                          }
                          className="w-full flex items-center justify-between gap-3 bg-amber-50/70 border border-amber-300 hover:bg-amber-100 rounded-xl px-4 py-3 text-left transition-colors cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="font-hangul text-xl font-bold text-slate-900">
                              {exc.exampleWord}
                            </span>
                            <span className="text-sm text-slate-700 ml-2.5">
                              [{exc.exampleReading}] · {exc.exampleMeaning}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706] text-white text-xs font-bold rounded-lg shrink-0">
                            <Volume2 className="w-4 h-4" />
                            Ascolta
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SETTORE 3: LETTURA GUIDATA — SILLABE, PAROLE E FRASE INTERA */}
            <section className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0F766E] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    Settore 3 · Lettura Guidata: Sillabe, Parole ed Esempio Reale
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-100 mt-0.5">
                    Non solo lettere singole: allenati a leggere intere sillabe, parole e una frase vera!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setHideReadings((h) => !h)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold bg-teal-900/60 hover:bg-teal-900 text-white rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                >
                  {hideReadings ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {hideReadings ? 'Mostra trascrizione' : 'Nascondi trascrizione (allenati!)'}
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* 3A: Syllables Row */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      1. Leggi la famiglia di sillabe
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleSpeak(
                          activeLetter.quickCombos.join(' '),
                          `row-${activeLetter.id}`
                        )
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeSpeakKey === `row-${activeLetter.id}`
                          ? 'bg-[#D97706] text-white'
                          : 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      Leggi tutta la riga
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {activeLetter.quickCombos.map((combo) => {
                      const key = `combo-${activeLetter.id}-${combo}`;
                      const playing = activeSpeakKey === key;
                      return (
                        <button
                          key={combo}
                          type="button"
                          onClick={() => handleSpeak(combo, key)}
                          className={`py-4 px-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            playing
                              ? 'bg-[#0284C7] text-white border-[#0284C7]'
                              : 'bg-slate-50 text-slate-900 border-slate-300 hover:bg-sky-50 hover:border-[#0284C7]'
                          }`}
                        >
                          <span className="font-hangul text-3xl font-bold leading-none">
                            {combo}
                          </span>
                          <Volume2
                            className={`w-4 h-4 ${
                              playing ? 'text-sky-100' : 'text-[#0284C7]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3B: Example Words + Complete Teacher Sentence */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-200">
                  <div className="lg:col-span-6 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      2. Parole d’esempio con lettura
                    </h3>
                    <div className="space-y-3">
                      {activeLetter.examples.map((ex, idx) => {
                        const key = `ex-${activeLetter.id}-${idx}`;
                        const playing = activeSpeakKey === key;
                        return (
                          <button
                            key={ex.word}
                            type="button"
                            onClick={() => handleSpeak(ex.word, key)}
                            className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${
                              playing
                                ? 'bg-sky-50 border-[#0284C7]'
                                : 'bg-slate-50 border-slate-300 hover:bg-white hover:border-[#0284C7]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-3">
                                <span className="font-hangul text-2xl sm:text-3xl font-bold text-slate-900">
                                  {ex.word}
                                </span>
                                {!hideReadings && (
                                  <span className="text-sm font-mono-tabular text-[#0284C7] font-bold">
                                    [{ex.reading}]
                                  </span>
                                )}
                              </div>
                              <p className="text-base text-slate-800 mt-1">
                                <strong className="font-bold">{ex.meaning}</strong> ·{' '}
                                <span className="text-slate-600 text-sm">{ex.syllableNote}</span>
                              </p>
                            </div>
                            <span
                              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                playing
                                  ? 'bg-[#D97706] text-white'
                                  : 'bg-[#0284C7] text-white'
                              }`}
                            >
                              <Volume2 className="w-5 h-5" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3C: Real Full Korean Sentence */}
                  {activePractice && (
                    <div className="lg:col-span-6 flex flex-col justify-between bg-teal-50/70 border-2 border-teal-300 rounded-2xl p-6 space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-base sm:text-lg font-bold text-[#0F766E]">
                          3. Leggi e ascolta una vera frase completa
                        </h3>

                        <div className="bg-white border border-teal-200 rounded-xl p-5 space-y-2">
                          <p className="font-hangul text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                            {activePractice.sentenceKo}
                          </p>
                          {!hideReadings && (
                            <p className="text-sm font-mono-tabular font-semibold text-[#0284C7]">
                              [{activePractice.sentenceReading}]
                            </p>
                          )}
                          <p className="text-base font-bold text-slate-800 pt-1">
                            “{activePractice.sentenceMeaning}”
                          </p>
                        </div>

                        <p className="text-base text-slate-800 leading-relaxed">
                          {activePractice.sentenceBreakdown}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleSpeak(
                            activePractice.sentenceKo,
                            `sent-${activeLetter.id}`
                          )
                        }
                        className={`w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-base font-bold rounded-xl transition-colors cursor-pointer ${
                          activeSpeakKey === `sent-${activeLetter.id}`
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#0F766E] hover:bg-[#115E59] text-white'
                        }`}
                      >
                        <Volume2 className="w-5 h-5" />
                        Ascolta tutta la frase
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SETTORE 4: VERIFICA LAMPO & LAVAGNA DI SCRITTURA */}
            <section className="bg-white border-2 border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#334155] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-bold">
                  Settore 4 · Verifica Lampo e Scrittura a Mano
                </h2>
                <button
                  type="button"
                  onClick={() => toggleCompleted(activeLetter.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-white text-slate-900 hover:bg-sky-50'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {isCompleted ? 'Lettera completata!' : 'Segna lezione come imparata'}
                </button>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Active Lesson Mini-Quiz */}
                {activePractice && (
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-300 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-[#0284C7]">
                        Mini-verifica della lezione {activeLetter.lessonNumber}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                        {activePractice.quizQuestion}
                      </h3>
                    </div>

                    <div className="space-y-2.5">
                      {activePractice.quizOptions.map((opt, idx) => {
                        const isChosen = lessonQuizChoice === idx;
                        const isRight = idx === activePractice.quizCorrectIndex;
                        const answered = lessonQuizChoice !== null;

                        let btnStyle =
                          'bg-white border-slate-300 text-slate-900 hover:border-[#0284C7] hover:bg-sky-50';
                        if (answered) {
                          if (isRight) {
                            btnStyle = 'bg-emerald-50 border-emerald-600 text-slate-900';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-50 border-rose-500 text-slate-900';
                          } else {
                            btnStyle = 'bg-slate-100 border-slate-200 text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={answered}
                            onClick={() => handleLessonQuizAnswer(idx)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-base font-medium transition-colors cursor-pointer disabled:cursor-default ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {lessonQuizChoice !== null && (
                      <div
                        className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                          lessonQuizChoice === activePractice.quizCorrectIndex
                            ? 'bg-emerald-50 border-emerald-400'
                            : 'bg-amber-50 border-amber-400'
                        }`}
                      >
                        {lessonQuizChoice === activePractice.quizCorrectIndex ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        )}
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                          {activePractice.quizExplanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Right: Stroke Order & Tracing Canvas */}
                <div className="lg:col-span-7">
                  <StrokeBoard letter={activeLetter} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== SECTION: SILLABE ==================== */}
        {activeSection === 'syllables' && (
          <SyllableBuilder onSpeak={handleSpeak} activeSpeakKey={activeSpeakKey} />
        )}

        {/* ==================== SECTION: ECCEZIONI ==================== */}
        {activeSection === 'exceptions' && (
          <ExceptionsMasterclass onSpeak={handleSpeak} activeSpeakKey={activeSpeakKey} />
        )}

        {/* ==================== SECTION: ASCOLTO ==================== */}
        {activeSection === 'listening' && (
          <ListeningLab onSpeak={handleSpeak} activeSpeakKey={activeSpeakKey} />
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-slate-300 bg-white mt-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
          <p>
            Maestra Hangul · Corso completo di alfabeto coreano con audio locale (senza AI)
          </p>
          <div className="flex items-center gap-5 font-medium">
            <button
              type="button"
              onClick={() => setActiveSection('lessons')}
              className="hover:text-slate-900 cursor-pointer"
            >
              40 Lettere
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('syllables')}
              className="hover:text-slate-900 cursor-pointer"
            >
              Fabbrica Sillabe
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('exceptions')}
              className="hover:text-slate-900 cursor-pointer"
            >
              8 Regole & Eccezioni
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
