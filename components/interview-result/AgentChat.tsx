"use client";
import { getTimeDifference } from "@/utils/time";

const AgentChat = ({
  transcript,
  firstReceivedTime,
  lastReceivedTime,
}: {
  transcript: string;
  firstReceivedTime: number;
  lastReceivedTime: number;
}) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
          <p className="text-sm">{transcript}</p>
          <p className="text-xs text-gray-500 mt-1">
            {/* {getTimeDifference(firstReceivedTime, lastReceivedTime)} */}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">Interviewer</p>
      </div>
    </div>
  );
};

export default AgentChat;
