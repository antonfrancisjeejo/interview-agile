/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState, useEffect, useRef } from "react";
import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";

const RoomAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Get all microphone audio tracks in the room
  const tracks = useTracks([Track.Source.Microphone]);

  useEffect(() => {
    if (tracks.length > 0) {
      const stream = new MediaStream(
        tracks
          .map((t) => t.publication.track?.mediaStreamTrack!)
          .filter(Boolean)
      );
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };
    }
  }, [tracks]);

  const startRecording = () => {
    mediaRecorderRef.current?.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioBlob && (
        <div>
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <a href={URL.createObjectURL(audioBlob)} download="recording.webm">
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default RoomAudioRecorder;
