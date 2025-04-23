"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InterviewPageProps {
  params: {
    id: string;
  };
}

export default function InterviewPage({ params }: InterviewPageProps) {
  const [timer, setTimer] = useState("00:00");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [interviewData, setInterviewData] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const startTime = new Date();
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      setTimer(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    // Load interview data
    const data = localStorage.getItem("currentInterviewData");
    if (data) {
      setInterviewData(JSON.parse(data));
    }

    return () => clearInterval(interval);
  }, []);

  const handleEndInterview = async () => {
    // Save interview data and redirect
    router.push("/dashboard");
  };

  return (
    <div className="h-full pl-64">
      {/* Header */}
      <header className="bg-white border-b fixed right-0 left-64 top-0 z-10">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
              <span className="text-purple-600 text-sm">{timer}</span>
            </div>
            <h1 className="text-xl font-semibold text-purple-700">
              Technical Interview Practice
            </h1>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndInterview}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            End
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] p-6 bg-gray-50 overflow-auto mt-16">
        <div className="grid grid-cols-[1fr,300px] gap-8 max-w-[calc(100vw-16rem)] mx-auto">
          {/* Interview Area */}
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-purple-700 text-center mb-2">
                Ongoing Interview
              </h2>
              <p className="text-center text-purple-600 mb-6">
                Interview #{params.id}
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Job Description:
                  </p>
                  <p className="text-gray-600">
                    {interviewData?.jobDescription || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Resume:</p>
                  <p className="text-gray-600">
                    {interviewData?.resume?.name || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                {/* Interviewer Card */}
                <div className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="/interviewer-avatar.png" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-purple-600">
                      AI Interviewer - RCM Corp
                    </p>
                  </div>
                </div>

                {/* Candidate Card */}
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="/candidate-avatar.png" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">You</h3>
                    <p className="text-sm text-gray-600">Candidate</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Audio Visualization */}
            <div className="h-16 flex items-center justify-center">
              <div className="flex items-center gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-purple-200 rounded-full"
                    style={{
                      height: `${Math.random() * 32}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="bg-white rounded-lg border p-4 h-full overflow-auto">
            <h2 className="font-semibold mb-4">Conversation</h2>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "assistant" ? "" : "flex-row-reverse"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.role === "assistant" ? "AI" : "You"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-gray-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
