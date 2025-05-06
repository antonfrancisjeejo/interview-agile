"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import { useAppSelector } from "@/store/store";
import { AnalyticsState } from "@/store/services/analytics/types";
import { RootState } from "@/store/store";
import ChatInterface from "@/components/interview-result/ChatInterface";

interface InterviewResults {
  id: string;
  user_id: string;
  company: string | null;
  date: string;
  duration: number | null;
  status: string;
  overall_score: number | null;
  technical_score: number | null;
  communication_score: number | null;
  questions_answered: number | null;
  conversation_transcript: any[];
  recording_url: string | null;
  created_at: string;
  updated_at: string;
  resume_url: string | null;
  job_description: string;
  questions: string;
  persona_id: string;
  strengths: string[];
  areas_for_improvement: string[];
  transcriptions:
    | {
        end_time: number;
        is_agent: boolean;
        is_final: boolean;
        language: string;
        segment_id: string;
        start_time: number;
        updated_at: string;
        segment_text: string;
        last_received_time: number;
        first_received_time: number;
      }[]
    | null;
}

interface InterviewEvaluation {
  id: string;
  interview_id: string;
  question: string;
  answer: string;
  technical_score: number;
  communication_score: number;
  strengths: string[];
  areas_of_improvement: string[];
  what_can_be_done_better: string[];
  overall_feedback: string;
  created_at: string;
}

const InterviewResults = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [results, setResults] = useState<InterviewResults | null>(null);
  const [evaluations, setEvaluations] = useState<InterviewEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { transcription }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );

  console.log("transcription", transcription);

  useEffect(() => {
    fetchInterviewResults();
  }, [params?.id]);

  const fetchInterviewResults = async () => {
    try {
      setLoading(true);

      if (!params?.id) {
        toast({
          title: "Error",
          description: "Invalid interview ID",
          variant: "destructive",
        });
        router.push("/interviews");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("User session:", session);

      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to view interview results",
          variant: "destructive",
        });
        router.push("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", session.user.id)
        .single();

      console.log("Supabase query result:", { data, error });

      const { data: evaluationData, error: evaluationError } = await supabase
        .from("interview_evaluations")
        .select("*")
        .eq("interview_id", params.id);

      console.log("Evaluation data:", evaluationData);

      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }

      if (!data) {
        console.log("No data found for interview ID:", params.id);
        toast({
          title: "Error",
          description: "Interview results not found",
          variant: "destructive",
        });
        router.push("/interviews");
        return;
      }

      setResults(data);
      setEvaluations(evaluationData || []);
    } catch (error) {
      console.error("Error fetching interview results:", error);
      toast({
        title: "Error",
        description: "Failed to load interview results",
        variant: "destructive",
      });
      router.push("/interviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!results) return;

    try {
      // Create a new PDF document
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text("Interview Results Report", 20, 20);

      // Add position and date
      doc.setFontSize(12);
      doc.text(`Position: ${results.company || "Interview"}`, 20, 30);
      doc.text(`Date: ${new Date(results.date).toLocaleDateString()}`, 20, 40);
      doc.text(`Duration: ${results.duration} minutes`, 20, 50);

      // Add scores
      doc.setFontSize(14);
      doc.text("Performance Scores", 20, 70);
      doc.setFontSize(12);
      doc.text(`Overall Score: ${results.overall_score}%`, 20, 80);
      doc.text(`Technical Score: ${results.technical_score}%`, 20, 90);
      doc.text(`Communication Score: ${results.communication_score}%`, 20, 100);

      // Add feedback
      doc.setFontSize(14);
      doc.text("Feedback", 20, 120);
      doc.setFontSize(12);
      const feedbackLines = doc.splitTextToSize(results.job_description, 170);
      doc.text(feedbackLines, 20, 130);

      // Add strengths
      doc.setFontSize(14);
      doc.text("Strengths", 20, 160);
      doc.setFontSize(12);
      if (results?.strengths && results.strengths.length > 0) {
        results.strengths.forEach((strength, index) => {
          doc.text(`• ${strength}`, 20, 170 + index * 10);
        });
      } else {
        doc.text("No strengths recorded", 20, 170);
      }

      // Add areas for improvement
      // Calculate the starting Y position based on the number of strengths
      const strengthsY =
        results.strengths && results.strengths.length > 0
          ? 170 + results.strengths.length * 10
          : 170;

      doc.setFontSize(14);
      doc.text("Areas for Improvement", 20, strengthsY + 20);
      doc.setFontSize(12);
      if (
        results.areas_for_improvement &&
        results.areas_for_improvement.length > 0
      ) {
        results.areas_for_improvement.forEach((area, index) => {
          doc.text(`• ${area}`, 20, strengthsY + 30 + index * 10);
        });
      } else {
        doc.text("No areas for improvement recorded", 20, strengthsY + 30);
      }

      // Save the PDF
      doc.save(`interview-report-${results.id}.pdf`);

      toast({
        title: "Report Downloaded",
        description: "Your interview report has been downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate the report",
        variant: "destructive",
      });
    }
  };

  const handleShareResults = () => {
    toast({
      title: "Results Shared",
      description: "Your interview results have been shared successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 pl-[300px]">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 pl-[300px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              No Results Found
            </h2>
            <p className="mt-2 text-gray-600">
              The interview results could not be loaded.
            </p>
            <Button onClick={() => router.push("/interviews")} className="mt-4">
              Back to Interviews
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pl-[300px]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/interviews")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interviews
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDownloadReport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button
              variant="outline"
              onClick={handleShareResults}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold">Interview Results</h1>

        <Card>
          <CardHeader>
            <CardTitle>{results.company || "Interview"}</CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {new Date(results.date).toLocaleDateString()}
              </div>
              {results.duration && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  Duration: {results.duration} minutes
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {evaluations.length > 0 && (
          <div className="space-y-6">
            {evaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardHeader>
                  <CardTitle className="text-lg">Question & Answer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Question:</h3>
                    <p className="text-gray-600">{evaluation.question}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Answer:</h3>
                    <p className="text-gray-600">{evaluation.answer}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Technical Score:
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {evaluation.technical_score}/10
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Communication Score:
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        {evaluation.communication_score}/10
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Strengths:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {evaluation?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  {evaluation?.areas_of_improvement && (
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Areas for Improvement:
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {evaluation?.areas_of_improvement?.map(
                          (area, index) => (
                            <li key={index}>{area}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {evaluation?.what_can_be_done_better &&
                    evaluation?.what_can_be_done_better?.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-700">
                          What Can Be Done Better:
                        </h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {evaluation?.what_can_be_done_better?.map(
                            (item, index) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Overall Feedback:
                    </h3>
                    <p className="text-gray-600">
                      {evaluation.overall_feedback}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {results.transcriptions && results.transcriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Interview Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                {results.transcriptions.map((transcript, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      transcript.is_agent
                        ? "bg-blue-50"
                        : "bg-gray-50 ml-auto max-w-[80%] text-right"
                    }`}
                  >
                    <p className="font-semibold text-sm mb-1">
                      {transcript.is_agent ? "Interviewer:" : "You"}
                    </p>
                    <p className="text-gray-700">{transcript.segment_text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InterviewResults;
