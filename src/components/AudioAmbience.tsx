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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}wedding-nasheed.mp3`
    );

    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audioRef.current = null;
    };
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Unable to play wedding music:', error);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {onTogglePetals && (
        <button
          onClick={onTogglePetals}
          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 cursor-pointer ${
            showPetals
              ? 'bg-[#FAF7F2]/95 text-[#72222B] border-[#C5A059]'
              : 'bg-[#FAF7F2]/70 text-[#5C4D44] border-stone-300'
          }`}
          title={
            showPetals
              ? 'Pause flower & heart shower'
              : 'Enable flower & heart shower'
          }
          aria-label="Toggle flower and heart shower"
        >
          <Sparkles
            className={`w-4 h-4 ${
              showPetals ? 'text-[#C5A059] animate-pulse' : 'text-stone-400'
            }`}
          />
          <span className="text-xs font-serif hidden sm:inline tracking-wider">
            {showPetals ? 'Petals Active' : 'Petals Paused'}
          </span>
        </button>
      )}

      <button
        onClick={toggleSound}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#72222B] text-white border-[#C5A059]'
            : 'bg-[#FAF7F2]/90 text-[#2C1810] border-[#C5A059]/40 hover:border-[#72222B]'
        }`}
        title={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        aria-label="Toggle wedding music"
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-amber-200 animate-pulse" />
              <span className="w-0.5 h-2 bg-amber-200 animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-amber-200 animate-pulse delay-150" />
            </div>
            <Volume2 className="w-4 h-4 text-amber-200" />
            <span className="text-xs font-serif hidden sm:inline tracking-wider">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#72222B]" />
            <VolumeX className="w-4 h-4 text-[#72222B]/70" />
            <span className="text-xs font-serif hidden sm:inline text-[#2C1810] tracking-wider">
              Play Music
            </span>
          </>
        )}
      </button>
    </div>
  );
};
