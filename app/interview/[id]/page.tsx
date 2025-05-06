"use client";

import React, { Suspense, useState, useEffect } from "react";
import { OngoingCall } from "@/components/assessment/ongoing-call/OngoingCall";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="text-sm text-purple-600">Initializing interview...</p>
    </div>
  </div>
);

export default function InterviewPage() {
  const [timer, setTimer] = useState("00:00");
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    if (!params?.id) {
      setError("Invalid interview ID");
      return;
    }
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

  const handleAnalysis = async (interviewId: string) => {
    try {
      setIsAnalyzing(true);
      const response = await fetch(`/api/interviews/${interviewId}/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to analyze interview");
      }

      router.push(`/interview/${interviewId}/results`);
    } catch (error) {
      console.error("Error analyzing interview:", error);
      toast({
        title: "Error",
        description: "Failed to analyze interview",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  const handleEndInterview = () => {
    if (!params?.id || Array.isArray(params.id)) {
      toast({
        title: "Error",
        description: "Invalid interview ID",
        variant: "destructive",
      });
      return;
    }
    handleAnalysis(params.id);
  };

  const showTranscript = () => {};

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <Button onClick={() => router.push("/interviews")} className="mt-4">
              Back to Interviews
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="text-lg text-purple-600">
              Analyzing your interview...
            </p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-bold">{timer}</div>
          <Button onClick={handleEndInterview}>End Interview</Button>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          {params?.id && !Array.isArray(params.id) && (
            <OngoingCall
              interviewId={params.id}
              persona={persona}
              user={userProfile}
              onShowTranscript={showTranscript}
              handleEndInterview={handleEndInterview}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
