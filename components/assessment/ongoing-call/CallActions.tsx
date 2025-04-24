import React from "react";
import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DisconnectButton2 } from "./DisconnectButton";

interface CallActionsProps {
  onEndCall?: () => void;
  onToggleTranscript: () => void;
  onToggleMute?: () => void;
  showTranscript: boolean;
  isOnMute?: boolean;
  startCall?: () => void;
}

export function CallActions({
  onEndCall,
}: // startCall,
CallActionsProps) {
  const isMobile = useIsMobile();

  // const { localParticipant } = useLocalParticipant();

  // const toggleMute = () => {
  //   if (localParticipant.isMicrophoneEnabled) {
  //     localParticipant.setMicrophoneEnabled(false); // Mute mic
  //     toast.info("Microphone muted");
  //   } else {
  //     localParticipant.setMicrophoneEnabled(true); // Unmute mic
  //     toast.info("Microphone unmuted");
  //   }
  // };

  return (
    <div className="flex justify-center gap-4 mt-4">
      {/* <Button
        onClick={startCall}
        className={`bg-primary hover:bg-primary/80 text-white  cursor-pointer px-6 py-4 sm:!px-8 sm:!py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      >
        <Phone className={`${isMobile ? "h-3 w-3" : "h-5 w-5"} mr-2`} />
        Start Call
      </Button> */}
      <DisconnectButton2
        onClick={onEndCall}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center"
      >
        <Phone className={`${isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} mr-2`} />
        <span className="font-medium text-sm">End Call</span>
      </DisconnectButton2>

      {/* <Button
        variant="outline"
        onClick={toggleMute}
        className={`border-amber-200 dark:border-amber-800 cursor-pointer ${
          isMobile ? "px-3 py-2 text-xs" : "px-6 py-4 sm:!px-8 sm:!py-6"
        } rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
          !localParticipant.isMicrophoneEnabled
            ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
            : ""
        }`}
      >
        {!localParticipant.isMicrophoneEnabled ? (
          <>
            <MicOff className={`${isMobile ? "h-3 w-3" : "h-5 w-5"} mr-2`} />
            {!isMobile && "Unmute"}
          </>
        ) : (
          <>
            <Mic className={`${isMobile ? "h-3 w-3" : "h-5 w-5"} mr-2`} />
            {!isMobile && "Mute"}
          </>
        )}
      </Button> */}

      {/* <Button
        variant="outline"
        onClick={onToggleTranscript}
        className={`border-blue-200 dark:border-blue-800 cursor-pointer ${
          isMobile ? "px-3 py-2 text-xs" : "px-6 py-4 sm:!px-8 sm:!py-6"
        } rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
          showTranscript
            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
            : ""
        }`}
      >
        <FileText className={`${isMobile ? "h-3 w-3" : "h-5 w-5"} mr-2`} />
        {showTranscript
          ? isMobile
            ? "Hide"
            : "Hide Transcript"
          : isMobile
          ? "Transcript"
          : "Show Live Transcript"}
      </Button> */}
    </div>
  );
}
