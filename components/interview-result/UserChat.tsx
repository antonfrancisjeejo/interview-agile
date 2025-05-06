import { getTimeDifference } from "@/utils/time";

const UserChat = ({
  transcript,
  firstReceivedTime,
  lastReceivedTime,
}: {
  transcript: string;
  firstReceivedTime: number;
  lastReceivedTime: number;
}) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[80%]">
        <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none">
          <p className="text-sm">{transcript}</p>
          <p className="text-xs text-blue-100 mt-1">
            {/* {getTimeDifference(firstReceivedTime, lastReceivedTime)} */}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">You</p>
      </div>
    </div>
  );
};

export default UserChat;
