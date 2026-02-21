'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface AudioPlayerControllerProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onSeek: (time: number) => void;
  onPlaybackRateChange: (rate: number) => void;
}

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export default function AudioPlayerController({
  isPlaying: _isPlaying,
  isPaused: _isPaused,
  currentTime,
  duration,
  playbackRate,
  onSeek,
  onPlaybackRateChange,
}: AudioPlayerControllerProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedRef.current && !speedRef.current.contains(e.target as Node)) {
        setShowSpeed(false);
      }
    };

    if (showSpeed) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSpeed]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || duration === 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSeek(percent * duration);
    },
    [duration, onSeek]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      handleProgressClick(e);
    },
    [handleProgressClick]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !progressRef.current || duration === 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSeek(percent * duration);
    },
    [isDragging, duration, onSeek]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm" onMouseLeave={handleMouseUp}>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 w-10 text-right font-mono flex-shrink-0">
          {formatTime(currentTime)}
        </span>

        <div
          ref={progressRef}
          className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden cursor-pointer group"
          onClick={handleProgressClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="h-full bg-green-500 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <span className="text-xs text-gray-400 w-10 font-mono flex-shrink-0">
          {formatTime(duration)}
        </span>

        <div ref={speedRef} className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowSpeed(!showSpeed)}
            className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
              playbackRate !== 1
                ? 'text-green-600 bg-green-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {playbackRate}x
          </button>
          {showSpeed && (
            <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border py-1 z-20 min-w-[50px]">
              {PLAYBACK_RATES.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => {
                    onPlaybackRateChange(rate);
                    setShowSpeed(false);
                  }}
                  className={`block w-full px-2 py-1 text-xs text-center hover:bg-gray-50 transition-colors ${
                    playbackRate === rate
                      ? 'text-green-600 font-medium bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
