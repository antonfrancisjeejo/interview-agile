
import React from "react";
import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onProgressChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

export function ProgressBar({ 
  currentTime,
  duration,
  onProgressChange,
  formatTime
}: ProgressBarProps) {
  // Calculate progress percentage for the gradient
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full h-14 bg-gradient-to-r from-orange-50/95 to-red-50/95 dark:from-gray-900/90 dark:to-gray-800/90 rounded-lg overflow-hidden shadow-md backdrop-blur-sm">
      {/* Timestamp indicators */}
      <div className="absolute top-0 w-full flex justify-between px-3 pt-1 text-xs text-amber-700 dark:text-amber-300 font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* Progress overlay with custom gradient slider */}
      <div className="absolute inset-x-0 top-6 px-3">
        <div className="relative h-3 w-full">
          <div className="absolute h-1 w-full top-1 bg-red-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.01}
            onValueChange={(value) => onProgressChange(value)}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          
          {/* Custom slider thumb */}
          <div 
            className="absolute h-3 w-3 bg-white dark:bg-amber-200 rounded-full shadow-md border border-amber-400 dark:border-amber-500 cursor-grab active:cursor-grabbing"
            style={{ 
              left: `calc(${progressPercentage}% - 6px)`, 
              top: '0px',
              display: progressPercentage > 0 ? 'block' : 'none'  
            }}
          />
        </div>
      </div>
    </div>
  );
}
