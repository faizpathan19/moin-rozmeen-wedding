import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface AudioAmbienceProps {
  showPetals?: boolean;
  onTogglePetals?: () => void;
}

export const AudioAmbience: React.FC<AudioAmbienceProps> = ({
  showPetals = true,
  onTogglePetals,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Soft pentatonic melodic notes inspired by classical eastern scales (D minor pentatonic / Hijaz vibes)
  const notes = [293.66, 329.63, 349.23, 440.0, 493.88, 587.33, 659.25];

  const playTone = (freq: number, duration: number = 3.5) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm soft envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const toggleSound = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      // Play initial gentle chord
      playTone(notes[0], 4);
      setTimeout(() => playTone(notes[3], 4), 600);

      let step = 0;
      intervalRef.current = window.setInterval(() => {
        step = (step + 1) % notes.length;
        playTone(notes[step], 4);
      }, 3500);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Flower Petals & Hearts Shower Toggle */}
      {onTogglePetals && (
        <button
          onClick={onTogglePetals}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 cursor-pointer ${
            showPetals
              ? 'bg-[#FAF7F2]/95 text-[#72222B] border-[#C5A059]'
              : 'bg-[#FAF7F2]/70 text-[#5C4D44] border-stone-300'
          }`}
          title={showPetals ? 'Pause flower & heart shower' : 'Enable flower & heart shower'}
          aria-label="Toggle flower and heart shower"
        >
          <Sparkles className={`w-4 h-4 ${showPetals ? 'text-[#C5A059] animate-pulse' : 'text-stone-400'}`} />
          <span className="text-xs font-serif hidden sm:inline tracking-wider">
            {showPetals ? 'Petals Active' : 'Petals Paused'}
          </span>
        </button>
      )}

      {/* Melodic Ambience Toggle */}
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#72222B] text-white border-[#C5A059]'
            : 'bg-[#FAF7F2]/90 text-[#2C1810] border-[#C5A059]/40 hover:border-[#72222B]'
        }`}
        title={isPlaying ? 'Mute ambient melody' : 'Play gentle ambient melody'}
        aria-label="Toggle ambient melody"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-amber-200 animate-pulse" />
              <span className="w-0.5 h-2 bg-amber-200 animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-amber-200 animate-pulse delay-150" />
            </div>
            <Volume2 className="w-4 h-4 text-amber-200" />
            <span className="text-xs font-serif hidden sm:inline tracking-wider">Melody Playing</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#72222B]" />
            <VolumeX className="w-4 h-4 text-[#72222B]/70" />
            <span className="text-xs font-serif hidden sm:inline text-[#2C1810] tracking-wider">Play Ambience</span>
          </>
        )}
      </button>
    </div>
  );
};

