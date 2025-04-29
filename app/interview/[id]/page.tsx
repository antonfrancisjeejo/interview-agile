"use client";

import React, { Suspense, useState, useEffect } from "react";
import { OngoingCall } from "@/components/assessment/ongoing-call/OngoingCall";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="text-sm text-purple-600">Initializing interview...</p>
    </div>
  </div>
);

const InterviewPage = () => {
  const [timer, setTimer] = useState("00:00");
  const router = useRouter();
  const params = useParams();
  const interviewId = params.id as string;

  const persona = {
    id: "1",
    name: "Sarah Chen",
    difficulty: "Easy",
    mood: "Good",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&crop=faces&auto=format&fit=crop",
  };

  const userProfile = {
    name: "Rick Sanchez",
    role: "Sales Representative",
    organization: "Victorinox",
    image: "/placeholder.svg",
  };

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

    return () => clearInterval(interval);
  }, []);

  const handleEndInterview = () => {
    router.push("/dashboard");
  };

  const showTranscript = () => {};

  return (
    <div className="h-screen">
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
      <main className="pl-64 pt-16 h-[calc(100vh-4rem)]">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-[calc(100vw-18rem)] px-6">
            <Suspense fallback={<LoadingFallback />}>
              <OngoingCall
                interviewId={interviewId}
                persona={persona}
                user={userProfile}
                onShowTranscript={showTranscript}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;
