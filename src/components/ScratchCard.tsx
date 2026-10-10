import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Eye, RotateCcw } from 'lucide-react';

interface ScratchCardProps {
  children: React.ReactNode;
  eventId: 'nikkah' | 'walima';
  eventTitle: string;
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  eventId,
  eventTitle,
  onRevealed,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const scratchCount = useRef(0);

  // Paint the luxurious gold foil layer onto the canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Use device pixel ratio for ultra-crisp display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#A67C38');
    grad.addColorStop(0.2, '#D4AF37');
    grad.addColorStop(0.4, '#F5E396');
    grad.addColorStop(0.6, '#AA7C28');
    grad.addColorStop(0.8, '#D8B34A');
    grad.addColorStop(1, '#8C6220');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle golden glitter texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(140, 98, 32, 0.35)';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Refined gold borders & Islamic corner motifs
    ctx.strokeStyle = '#F7E7A9';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = 'rgba(140, 98, 32, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Center luxury text instructions
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Center medallion
    ctx.fillStyle = 'rgba(74, 21, 28, 0.85)'; // Deep royal maroon background
    ctx.beginPath();
    ctx.roundRect(width / 2 - 140, height / 2 - 40, 280, 80, 14);
    ctx.fill();
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Emblem
    ctx.font = 'bold 16px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#FBF1C9';
    ctx.fillText('✦ SACRED DATE ✦', width / 2, height / 2 - 15);

    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Scratch here to unveil ceremony date', width / 2, height / 2 + 12);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      initCanvas();
    }
  }, [initCanvas, isRevealed]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Calculate percentage cleared
  const calculateScratchedArea = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;
      // Sample every 16th pixel for high performance
      const step = 16;
      let samples = 0;

      for (let i = 3; i < data.length; i += 4 * step) {
        samples++;
        if (data[i] < 128) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / samples) * 100);
      setScratchPercent(percent);

      if (percent > 38 && !isRevealed) {
        setIsRevealed(true);
        if (onRevealed) onRevealed();
      }
    } catch {
      // Ignore security errors if any
    }
  }, [isRevealed, onRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32 * dpr, 0, Math.PI * 2);
    ctx.fill();

    scratchCount.current++;
    if (scratchCount.current % 12 === 0) {
      calculateScratchedArea();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    setIsScratching(false);
    calculateScratchedArea();
  };

  const handleRevealInstantly = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    if (onRevealed) onRevealed();
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRevealed(false);
    setScratchPercent(0);
    scratchCount.current = 0;
    setTimeout(() => initCanvas(), 50);
  };

  return (
    <div className="relative max-w-xl mx-auto w-full">
      {/* Scratch Header Indicator */}
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#72222B]">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>
            {isRevealed ? 'Auspicious Date Revealed' : 'Interactive Gold Foil Reveal'}
          </span>
        </div>

        {isRevealed ? (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-[#5C4D44] hover:text-[#72222B] transition-colors cursor-pointer"
            title="Cover date to scratch again"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Scratch Again</span>
          </button>
        ) : (
          <button
            onClick={handleRevealInstantly}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#72222B] hover:text-[#5C1A22] bg-[#FAF7F2] hover:bg-[#F5EFE6] px-2.5 py-1 rounded-full border border-[#C5A059]/40 transition-colors cursor-pointer"
          >
            <Eye className="w-3 h-3 text-[#C5A059]" />
            <span>Reveal Instantly</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-md border border-[#C5A059]/50 transition-all duration-300"
      >
        {/* Underneath: The actual ceremony date card */}
        <div className="w-full">{children}</div>

        {/* Overlay: Interactive Scratch Canvas */}
        {!isRevealed && (
          <div className="absolute inset-0 z-20 touch-none">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`w-full h-full cursor-crosshair transition-opacity duration-500 select-none ${
                isScratching ? 'scale-[1.002]' : ''
              }`}
              style={{ touchAction: 'none' }}
              aria-label={`Scratch to reveal ${eventTitle} date`}
            />

            {/* Quick scratch percentage progress pill */}
            {scratchPercent > 5 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-black/60 backdrop-blur-xs text-amber-200 text-[11px] font-medium px-3 py-1 rounded-full border border-amber-300/40">
                Revealed {scratchPercent}% (Scratch a bit more to unveil)
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
