
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onSkipBackward,
  onSkipForward
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-700 dark:text-blue-300 h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full"
        onClick={onSkipBackward}
      >
        <SkipBack className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0 text-white dark:text-white h-8 w-14 rounded-full shadow-sm"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-700 dark:text-blue-300 h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full"
        onClick={onSkipForward}
      >
        <SkipForward className="h-4 w-4" />
      </Button>
    </div>
  );
}
