"use client";
import { useEffect } from "react";
import {
  AgentState,
  BarVisualizer,
  useVoiceAssistant,
} from "@livekit/components-react";

export function SimpleVoiceAssistant2({ onStateChange }: { onStateChange: (state: AgentState) => void }) {
  const { state, audioTrack } = useVoiceAssistant();
  // const [transcript, setTranscript] = useState<{ sender: string; text: string }[]>([]);
  // const [aiMessageBuffer, setAiMessageBuffer] = useState(""); // Store AI response in progress
  // const [lastAiUpdateTime, setLastAiUpdateTime] = useState<number | null>(null);

  useEffect(() => {
    onStateChange(state);
  }, [onStateChange, state]);


      // console.log("agentTranscriptions", agentTranscriptions);
      // console.log("audioTrack", audioTrack);



  // Handle AI Transcriptions
  // useEffect(() => {
  //   if (agentTranscriptions.length > 0) {
  //     const lastSegment = agentTranscriptions[agentTranscriptions.length - 1].text;
  //     console.log("lastSegment", lastSegment);
  //     console.log("agentTranscriptions", agentTranscriptions);

  //     const now = Date.now();

  //     if (lastAiUpdateTime && now - lastAiUpdateTime > 1500) {
  //       // If last message was 1.5+ seconds ago, treat this as a NEW response
  //       setTranscript((prev) => [...prev, { sender: "AI", text: lastSegment }]);
  //       setAiMessageBuffer(lastSegment);
  //     } else {
  //       // Otherwise, add to the current response buffer
  //       setAiMessageBuffer((prev) => prev + " " + lastSegment);
  //       setTranscript((prev) => {
  //         const newTranscripts = [...prev];
  //         if (newTranscripts.length > 0 && newTranscripts[newTranscripts.length - 1].sender === "AI") {
  //           newTranscripts[newTranscripts.length - 1].text = aiMessageBuffer + " " + lastSegment;
  //         } else {
  //           newTranscripts.push({ sender: "AI", text: lastSegment });
  //         }
  //         return newTranscripts;
  //       });
  //     }

  //     setLastAiUpdateTime(now);
  //   }
  // }, [agentTranscriptions]);

  // Capture User Speech (Using Web Speech API)
  // useEffect(() => {
  //   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //   recognition.continuous = true;
  //   recognition.interimResults = false;
  //   recognition.lang = "en-US";

  //   recognition.onresult = (event) => {
  //     const lastTranscript = event.results[event.results.length - 1][0].transcript;
  //     setTranscript((prev) => [...prev, { sender: "User", text: lastTranscript }]);
  //   };

  //   recognition.onerror = (event) => console.error("Speech recognition error:", event.error);

  //   recognition.start();

  //   return () => recognition.stop();
  // }, []);


  return (
    <div className="h-40 w-40 mx-auto p-4 ">
      <BarVisualizer
        state={state}
        barCount={5}
        trackRef={audioTrack}
        className="agent-visualizer "
        options={{ minHeight: 14, }}
      />
   

      {/* Transcript Display */}
      {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg overflow-y-auto h-40 border border-gray-300">
        {transcript.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === "User" ? "text-blue-600" : "text-green-600"}`}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div> */}
    </div>
  );
}