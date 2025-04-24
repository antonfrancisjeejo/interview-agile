
'use client'
import React from "react";
import { PlaybackControls } from "./player/PlaybackControls";
import { ProgressBar } from "./player/ProgressBar";
import { VolumeControl } from "./player/VolumeControl";
import { useAudioPlayer } from "./player/useAudioPlayer";

interface RecordingPlayerProps {
  audioUrl: string;
}

export function RecordingPlayer({ audioUrl }: RecordingPlayerProps) {
  const {
    audioRef,
    isPlaying,
    isMuted,
    duration,
    currentTime,
    volume,
    handlePlayPause,
    handleMuteToggle,
    handleVolumeChange,
    handleProgressChange,
    formatTime,
    skipForward,
    skipBackward
  } = useAudioPlayer({ audioUrl });

  return (
    <div className="flex flex-col w-full gap-2">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        className="hidden"
        onEnded={() => handlePlayPause()} // Fixed: Replaced setIsPlaying(false) with handlePlayPause()
      />
      
      <ProgressBar 
        currentTime={currentTime}
        duration={duration}
        onProgressChange={handleProgressChange}
        formatTime={formatTime}
      />
      
      <div className="flex items-center justify-between">
        <PlaybackControls 
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipBackward={skipBackward}
          onSkipForward={skipForward}
        />
        
        <VolumeControl 
          isMuted={isMuted}
          volume={volume}
          onMuteToggle={handleMuteToggle}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
