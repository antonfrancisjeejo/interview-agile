
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

interface LiveTranscriptProps {
  messages: Message[];
  personaName: string;
}

export function LiveTranscript({ messages, personaName }: LiveTranscriptProps) {
  return (
    <Card className="h-[500px] sm:h-[600px] md:h-full md:max-h-[700px] overflow-hidden flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-blue-100 dark:border-blue-800/50 shadow-lg">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/50 p-3 sm:p-4 md:p-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
          Live Transcript
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-grow p-3 sm:p-4 md:p-5">
        <div className="space-y-3 sm:space-y-5">
          {messages.map((message, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-xs sm:text-sm ${
                  message.sender === personaName 
                    ? "text-blue-700 dark:text-blue-300" 
                    : "text-green-700 dark:text-green-300"
                }`}>
                  {message.sender}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 opacity-70 group-hover:opacity-100">
                  {message.timestamp}
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1 p-2 sm:p-3 rounded-lg ${
                message.sender === personaName 
                  ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-400 dark:border-blue-500" 
                  : "bg-green-50 dark:bg-green-900/20 border-l-2 border-green-400 dark:border-green-500"
              }`}>
                {message.text}
              </p>
            </div>
          ))}
          <div className="py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-600 dark:text-gray-300 animate-pulse">Listening...</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
