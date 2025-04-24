
import React from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (values: number[]) => void;
}

export function VolumeControl({
  isMuted,
  volume,
  onMuteToggle,
  onVolumeChange
}: VolumeControlProps) {
  const [showVolumeSlider, setShowVolumeSlider] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMuteToggle}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="px-2 h-8 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      {showVolumeSlider && (
        <div 
          className="absolute bottom-full mb-2 bg-white dark:bg-blue-950 p-2 rounded-md shadow-md z-10 w-32 border border-blue-100 dark:border-blue-800"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={(value) => onVolumeChange(value)}
            className="h-2"
          />
        </div>
      )}
    </div>
  );
}
