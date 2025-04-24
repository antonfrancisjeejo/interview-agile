/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useAgent } from "@/hooks/use-agent";
import AnalysisResult from "./AnalysisResult";

const Analysis = () => {
  const [conversation, setConversationText] = useState<any>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [resdata, setResdata] = useState<any>(null);
  const { displayTranscriptions } = useAgent();
  useEffect(() => {
    setConversationText(displayTranscriptions);
  }, [displayTranscriptions]);

  //   const conversationText = `
  // Buyer: Hi, I'm interested in your product. Can you tell me more about it?
  // Seller: Sure! This cap is made of premium cotton, and it's available in multiple colors.
  // Buyer: Sounds good. Is there any discount?
  // Seller: Yes! If you buy two, you get 10% off.
  // Buyer: That’s great! How long does shipping take?
  // Seller: It usually takes 3-5 business days.
  // Buyer: Alright, I’ll place an order. Thanks!
  // Seller: Thank you! Let me know if you need anything else.
  // `;

  const analyzeConversation = async () => {
    const conversationText = conversation.map((item: any) => ({
      role:
        item.participant.metadata === "human" ? "Interviewee" : "Interviewer",
      text: item.segment.text,
    })); // Extract the 'text' from each 'segment' // Join all texts into one string with a space in between
    console.log("conversationText", conversationText);
    if (!conversationText) {
      setError("No conversation text available.");
      return;
    }

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

    // setLoading(false);
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
          Analyze Conversation Whole Conversation
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
};

export default Analysis;
