/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAgent } from "@/hooks/use-agent";
import AnalysisResult from "./AnalysisResult";

const AnalysisSeller = () => {
  const [conversation, setConversationText] = useState<any>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [resdata, setResdata] = useState<any>(null);
  const { displayTranscriptions } = useAgent();
  useEffect(() => {
    setConversationText(displayTranscriptions);
  }, [displayTranscriptions]);

  // participant;
  const analyzeConversation = async () => {
    const userConversation = conversation.filter(
      (item: any) => item.participant.metadata === "human"
    ); // Extract the 'text' from each 'segment'

    const conversationText = userConversation
      .map((item: any) => item.segment.text) // Extract the 'text' from each 'segment'
      .join(" "); // Join all texts into one string with a space in between
    if (!conversationText) {
      setError("No conversation text available.");
      return;
    }

    // Extract seller messages only
    // const conversationText = conversationText2
    //   .split("\n")
    //   .filter((line) => line.startsWith("Seller:"))
    //   .map((line) => line.replace("Seller: ", ""))
    //   .join("\n");

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationText }),
      });

      const data = await response.json();
      setResdata(data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze conversation.");
      }

      setAnalysis(data);
    } catch (err) {
      setError(err);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 border p-4">
      <div>
        <Button
          type="button"
          disabled={loading}
          onClick={analyzeConversation}
          className="mb-2 cursor-pointer"
        >
          {" "}
          Analyze Seller Conversation
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
};

export default AnalysisSeller;
