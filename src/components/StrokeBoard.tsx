import React, { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Play, RotateCcw } from 'lucide-react';
import { HangulLetter } from '../data/hangulData';

interface StrokeBoardProps {
  letter: HangulLetter;
}

export const StrokeBoard: React.FC<StrokeBoardProps> = ({ letter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [animStep, setAnimStep] = useState<number>(letter.strokes.length);
  const [animKey, setAnimKey] = useState<number>(0);

  useEffect(() => {
    clearCanvas();
    setAnimStep(letter.strokes.length);
    setAnimKey((k) => k + 1);
  }, [letter.id, letter.strokes.length]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const replayStrokes = () => {
    setAnimStep(0);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    if (animStep < letter.strokes.length) {
      const timer = setTimeout(() => {
        setAnimStep((s) => s + 1);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [animStep, letter.strokes.length]);

  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Lavagna di scrittura ({letter.strokes.length}{' '}
            {letter.strokes.length === 1 ? 'tratto' : 'tratti'})
          </h3>
          <p className="text-sm text-slate-600">
            Guarda l’ordine animato a sinistra e ricalca a destra
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={replayStrokes}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Anima tratti
          </button>
          <button
            type="button"
            onClick={() => setShowGuide((g) => !g)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={showGuide ? 'Nascondi guida' : 'Mostra guida'}
          >
            {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showGuide ? 'Nascondi guida' : 'Mostra guida'}
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Pulisci
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {/* Left: Animated Stroke Order */}
        <div className="relative aspect-square max-h-56 w-full mx-auto bg-[#F8FAFC] border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
          {/* Quadrant Grid */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            aria-label={`Ordine dei tratti per ${letter.char}`}
          >
            <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

            {/* Faint base outline */}
            {letter.strokes.map((d, idx) => (
              <path
                key={`bg-${idx}`}
                d={d}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Animated strokes */}
            {letter.strokes.map((d, idx) => {
              const isVisible = idx < animStep;
              const isCurrent = idx === animStep;
              if (!isVisible && !isCurrent) return null;
              return (
                <path
                  key={`fg-${animKey}-${idx}`}
                  d={d}
                  fill="none"
                  stroke={isCurrent ? '#0284C7' : '#0F172A'}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isCurrent ? 'animate-stroke-draw' : ''}
                />
              );
            })}
          </svg>
          <span className="absolute bottom-2 left-3 text-[11px] font-medium text-slate-500">
            Ordine guidato
          </span>
        </div>

        {/* Right: Interactive Tracing Pad */}
        <div className="relative aspect-square max-h-56 w-full mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden touch-none">
          {/* Grid background */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <line x1="50" y1="0" x2="50" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
            {showGuide && (
              <text
                x="50"
                y="67"
                textAnchor="middle"
                className="font-hangul"
                fontSize="66"
                fontWeight="700"
                fill="#E2E8F0"
              >
                {letter.char}
              </text>
            )}
          </svg>

          <canvas
            ref={canvasRef}
            width={240}
            height={240}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative z-10 w-full h-full cursor-crosshair"
          />
          <span className="absolute bottom-2 left-3 text-[11px] font-medium text-slate-400 pointer-events-none">
            Spazio per ricalcare
          </span>
        </div>
      </div>
    </div>
  );
};
