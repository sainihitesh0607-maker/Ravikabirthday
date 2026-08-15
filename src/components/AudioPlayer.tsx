import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { CONFIG } from '../config';

export interface AudioPlayerRef {
  play: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, {}>((props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          }).catch(() => {
            // Silently catch audio play errors (e.g. if the user hasn't uploaded the file yet)
            setHasStarted(true);
          });
        }
      }
    }
  }));

  const togglePlayMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={CONFIG.music} loop preload="auto" />
      {hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-3 animate-in fade-in duration-1000">
          <button 
            onClick={togglePlayMute}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            {isMuted ? <VolumeX size={18} /> : <Music size={18} />}
          </button>
        </div>
      )}
    </>
  );
});
AudioPlayer.displayName = 'AudioPlayer';
