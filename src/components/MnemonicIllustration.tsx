import React from 'react';
import { HangulLetter } from '../data/hangulData';

interface MnemonicIllustrationProps {
  letter: HangulLetter;
}

export const MnemonicIllustration: React.FC<MnemonicIllustrationProps> = ({ letter }) => {
  const renderScene = () => {
    switch (letter.id) {
      case 'a':
      case 'ya':
        return (
          <g>
            {/* Horizon ground */}
            <path d="M 10 82 Q 60 76 110 82 L 110 100 L 10 100 Z" fill="#DCFCE7" />
            {/* Rising Sun */}
            <circle cx="84" cy="48" r="14" fill="#FBBF24" />
            <circle cx="84" cy="48" r="19" fill="#FBBF24" opacity="0.22" />
            {/* Person standing looking right */}
            <circle cx="44" cy="24" r="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
            <path d="M 44 33 L 44 76" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 44 48 L 68 48" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
            {letter.id === 'ya' && (
              <path d="M 44 60 L 68 60" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
            )}
          </g>
        );
      case 'eo':
      case 'yeo':
        return (
          <g>
            <path d="M 10 82 Q 60 76 110 82 L 110 100 L 10 100 Z" fill="#E0F2FE" />
            {/* Call bubble on left */}
            <circle cx="28" cy="42" r="12" fill="#FDE68A" />
            <path d="M 24 42 L 29 42" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            {/* Person looking left */}
            <circle cx="72" cy="24" r="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
            <path d="M 72 33 L 72 76" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            <path d="M 46 49 L 72 49" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
            {letter.id === 'yeo' && (
              <path d="M 46 61 L 72 61" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
            )}
          </g>
        );
      case 'o':
      case 'yo':
        return (
          <g>
            {/* Sky & meadow */}
            <rect x="10" y="66" width="100" height="24" rx="6" fill="#BBF7D0" />
            <circle cx="60" cy="30" r="13" fill="#FCD34D" opacity="0.45" />
            {/* Earth line */}
            <path d="M 20 66 L 100 66" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            {letter.id === 'o' ? (
              <path d="M 60 36 L 60 66" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M 48 36 L 48 66" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
                <path d="M 72 36 L 72 66" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
              </>
            )}
          </g>
        );
      case 'u':
      case 'yu':
        return (
          <g>
            {/* Cloud */}
            <path
              d="M 28 36 Q 28 22 44 22 Q 52 14 66 20 Q 82 18 88 32 Q 96 36 90 42 L 26 42 Z"
              fill="#BAE6FD"
            />
            <path d="M 22 44 L 98 44" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
            {letter.id === 'u' ? (
              <>
                <path d="M 60 44 L 60 76" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
                <circle cx="60" cy="84" r="4" fill="#38BDF8" />
              </>
            ) : (
              <>
                <path d="M 48 44 L 48 76" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
                <path d="M 72 44 L 72 76" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
                <circle cx="48" cy="84" r="3.5" fill="#38BDF8" />
                <circle cx="72" cy="84" r="3.5" fill="#38BDF8" />
              </>
            )}
          </g>
        );
      case 'eu':
        return (
          <g>
            <path d="M 14 58 Q 60 42 106 58 L 106 88 L 14 88 Z" fill="#D1FAE5" />
            <circle cx="88" cy="28" r="9" fill="#FDE68A" />
            <path d="M 20 54 L 100 54" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
          </g>
        );
      case 'i':
        return (
          <g>
            <path d="M 16 84 L 104 84" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="20" r="9" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
            <path d="M 60 32 L 60 82" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
          </g>
        );
      case 'g':
      case 'k':
        return (
          <g>
            {/* Golden wooden hook */}
            <circle cx="34" cy="34" r="14" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <path
              d="M 32 32 L 82 32 L 82 80"
              fill="none"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {letter.id === 'k' && (
              <>
                <path d="M 34 55 L 80 55" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
                <path d="M 88 48 L 102 42 M 88 56 L 104 56 M 88 64 L 102 70" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
          </g>
        );
      case 'n':
        return (
          <g>
            {/* Cute nose sniffing flower */}
            <circle cx="84" cy="54" r="10" fill="#FBCFE8" />
            <circle cx="84" cy="54" r="4" fill="#FBBF24" />
            <path d="M 84 64 L 84 82" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <circle cx="48" cy="36" r="3" fill="#0F172A" />
            <path
              d="M 36 24 L 36 74 L 78 74"
              fill="none"
              stroke="#0284C7"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      case 'd':
      case 't':
        return (
          <g>
            {/* Door frame */}
            <rect x="34" y="24" width="52" height="54" rx="4" fill="#E0F2FE" />
            <circle cx="68" cy="50" r="3.5" fill="#D97706" />
            <path
              d="M 78 24 L 34 24 L 34 78 L 80 78"
              fill="none"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {letter.id === 't' && (
              <>
                <path d="M 36 51 L 74 51" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
                <path d="M 86 44 L 100 38 M 86 52 L 102 52" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}
          </g>
        );
      case 'r':
        return (
          <g>
            {/* Flowing winding river */}
            <path
              d="M 28 22 L 82 22 L 82 48 L 32 48 L 32 78 L 86 78"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 32 22 L 82 22 L 82 48 L 32 48 L 32 78 L 84 78"
              fill="none"
              stroke="#0284C7"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      case 'm':
        return (
          <g>
            {/* Smiling square mouth */}
            <rect x="28" y="24" width="64" height="52" rx="8" fill="#FFE4E6" />
            <path d="M 42 52 Q 60 66 78 52" fill="none" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" />
            <rect
              x="32"
              y="26"
              width="56"
              height="48"
              fill="none"
              stroke="#0F172A"
              strokeWidth="7"
              strokeLinejoin="round"
            />
          </g>
        );
      case 'b':
      case 'p':
        return (
          <g>
            {letter.id === 'b' ? (
              <>
                {/* Glass with blue water */}
                <rect x="34" y="48" width="52" height="28" fill="#BAE6FD" />
                <path
                  d="M 34 22 L 34 78 L 86 78 L 86 22 M 34 48 L 86 48"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <>
                {/* Temple columns */}
                <rect x="24" y="24" width="72" height="52" fill="#FEF3C7" opacity="0.45" />
                <path
                  d="M 24 26 L 96 26 M 24 76 L 96 76 M 44 26 L 44 76 M 76 26 L 76 76"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        );
      case 's':
      case 'ss':
        return (
          <g>
            <path d="M 12 82 L 46 28 L 80 82 Z" fill="#BAE6FD" opacity="0.5" />
            {letter.id === 's' ? (
              <path
                d="M 60 22 L 30 78 M 57 48 L 90 78"
                fill="none"
                stroke="#0F172A"
                strokeWidth="7"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M 40 24 L 20 78 M 38 48 L 56 78 M 80 24 L 60 78 M 78 48 L 98 78"
                fill="none"
                stroke="#0284C7"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      case 'ng':
        return (
          <g>
            {/* Resonance Gong / Throat */}
            <circle cx="60" cy="50" r="32" fill="#FEF3C7" />
            <circle cx="60" cy="50" r="24" fill="#FFFFFF" stroke="#0284C7" strokeWidth="7" />
            <circle cx="60" cy="50" r="7" fill="#F59E0B" opacity="0.45" />
          </g>
        );
      case 'j':
      case 'ch':
      case 'jj':
        return (
          <g>
            {letter.id === 'jj' ? (
              <>
                <path d="M 18 28 L 52 28 M 35 28 L 18 78 M 34 50 L 52 78" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M 64 28 L 98 28 M 81 28 L 64 78 M 80 50 L 98 78" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Mountain wearing hat */}
                <path d="M 28 28 L 92 28" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
                {letter.id === 'ch' && (
                  <>
                    <path d="M 60 12 L 60 26" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 70 15 Q 84 10 86 20" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
                  </>
                )}
                <path d="M 60 28 L 28 78 M 57 50 L 92 78" fill="none" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
              </>
            )}
          </g>
        );
      case 'h':
        return (
          <g>
            {/* Smiling face wearing hat */}
            <circle cx="60" cy="60" r="20" fill="#FEF3C7" stroke="#0F172A" strokeWidth="6" />
            <circle cx="53" cy="57" r="2.2" fill="#0F172A" />
            <circle cx="67" cy="57" r="2.2" fill="#0F172A" />
            <path d="M 54 65 Q 60 70 66 65" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 26 33 L 94 33" stroke="#0284C7" strokeWidth="6.5" strokeLinecap="round" />
            <path d="M 60 14 L 60 27" stroke="#0284C7" strokeWidth="6.5" strokeLinecap="round" />
          </g>
        );
      case 'kk':
      case 'tt':
      case 'pp':
        return (
          <g>
            {/* Twin blocks */}
            <rect x="16" y="20" width="40" height="62" rx="8" fill="#E0F2FE" />
            <rect x="64" y="20" width="40" height="62" rx="8" fill="#FEF3C7" />
            <text
              x="60"
              y="66"
              textAnchor="middle"
              className="font-hangul"
              fontSize="44"
              fontWeight="800"
              fill="#0F172A"
            >
              {letter.char}
            </text>
          </g>
        );
      default:
        // Compound vowels visual equation
        return (
          <g>
            <rect x="14" y="16" width="92" height="68" rx="12" fill="#F1F5F9" />
            <circle cx="32" cy="30" r="6" fill="#FDE68A" />
            <circle cx="88" cy="70" r="8" fill="#BAE6FD" />
            <text
              x="60"
              y="65"
              textAnchor="middle"
              className="font-hangul"
              fontSize="46"
              fontWeight="800"
              fill="#0284C7"
            >
              {letter.char}
            </text>
          </g>
        );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-sky-50/90 border-2 border-sky-200 rounded-2xl p-4 sm:p-5">
      <div className="w-28 h-24 shrink-0 rounded-xl bg-white border border-sky-200 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 120 100" className="w-full h-full" aria-hidden="true">
          {renderScene()}
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#0369A1]">
          Immagine per ricordare · {letter.mnemonicTitle}
        </p>
        <p className="text-base text-slate-800 leading-relaxed mt-1">
          {letter.mnemonicStory}
        </p>
      </div>
    </div>
  );
};
