import React, { useEffect, useState } from "react";
import { useTracks } from "@livekit/components-react"; // Correct import
import { Track } from "livekit-client"; // Correct import
import { useLiveKitAudioRecorder } from "../../../../hooks/useLiveKitAudioRecorder";

const AudioRecorderComponent: React.FC = () => {
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | null>(null);
  const tracks = useTracks([Track.Source.Microphone]); // ✅ Corrected: Use an array

  const { isRecording, startRecording, stopRecording, audioBlob } =
    useLiveKitAudioRecorder(audioTrack || undefined);

  useEffect(() => {
    if (tracks.length > 0 && tracks[0].publication?.track) {
      const track = tracks[0].publication.track;
      if (track?.mediaStreamTrack) {
        setAudioTrack(track.mediaStreamTrack);
      }
    }
  }, [tracks]);

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <a href={URL.createObjectURL(audioBlob)} download="recording.webm">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioRecorderComponent;
