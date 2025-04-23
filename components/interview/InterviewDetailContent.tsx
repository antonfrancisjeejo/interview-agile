"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, FileText, Mic, Video } from "lucide-react";
import InterviewTimer from "./InterviewTimer";
import InterviewParticipant from "./InterviewParticipant";

interface InterviewDetailContentProps {
  title: string;
  interviewer: {
    name: string;
    role: string;
  };
  interviewee: {
    name: string;
    role: string;
  };
  startTime?: Date;
}

const InterviewDetailContent = ({
  title,
  interviewer,
  interviewee,
  startTime,
}: InterviewDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<
    "chat" | "transcript" | "recording"
  >("chat");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <InterviewTimer startTime={startTime} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InterviewParticipant {...interviewer} />
        <InterviewParticipant {...interviewee} />
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === "chat" ? "default" : "outline"}
          onClick={() => setActiveTab("chat")}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat
        </Button>
        <Button
          variant={activeTab === "transcript" ? "default" : "outline"}
          onClick={() => setActiveTab("transcript")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Transcript
        </Button>
        <Button
          variant={activeTab === "recording" ? "default" : "outline"}
          onClick={() => setActiveTab("recording")}
        >
          <Video className="mr-2 h-4 w-4" />
          Recording
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {activeTab === "chat" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Start speaking to begin the interview
                </span>
              </div>
            </div>
          )}
          {activeTab === "transcript" && (
            <div className="text-center text-gray-500">
              Transcript will appear here
            </div>
          )}
          {activeTab === "recording" && (
            <div className="text-center text-gray-500">
              Recording will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewDetailContent;
