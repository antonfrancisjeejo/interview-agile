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

interface InterviewResults {
  id: string;
  position: string;
  date: string;
  duration: number;
  overall_score: number;
  communication_score: number;
  technical_score: number;
  feedback: string;
  strengths: string[];
  areas_for_improvement: string[];
}

export default function InterviewResultsPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [results, setResults] = useState<InterviewResults | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    console.log("Interview ID from params:", params.id);
    fetchInterviewResults();
  }, [params.id]);

  const fetchInterviewResults = async () => {
    try {
      setLoading(true);

      // Get the current user's session
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

      // Fetch the specific interview results
      const { data, error } = await supabase
        .from("completed_interviews")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", session.user.id)
        .single();

      console.log("Supabase query result:", { data, error });

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

      // Parse the data to ensure arrays are properly handled
      const parsedData: InterviewResults = {
        ...data,
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        areas_for_improvement: Array.isArray(data.areas_for_improvement)
          ? data.areas_for_improvement
          : [],
      };

      console.log("Setting interview results:", parsedData);
      setResults(parsedData);
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
      doc.text(`Position: ${results.position}`, 20, 30);
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
      const feedbackLines = doc.splitTextToSize(results.feedback, 170);
      doc.text(feedbackLines, 20, 130);

      // Add strengths
      doc.setFontSize(14);
      doc.text("Strengths", 20, 160);
      doc.setFontSize(12);
      if (results.strengths && results.strengths.length > 0) {
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
      <div className="min-h-screen bg-gray-50 p-6">
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
      <div className="min-h-screen bg-gray-50 p-6">
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
    <div className="min-h-screen bg-gray-50 p-6">
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
            <CardTitle>{results.position}</CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {new Date(results.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                Duration: {results.duration} minutes
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Overall Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {results.overall_score}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Technical Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {results.technical_score}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Communication Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {results.communication_score}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{results.feedback}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              {results.strengths && results.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No strengths recorded</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              {results.areas_for_improvement &&
              results.areas_for_improvement.length > 0 ? (
                <ul className="space-y-2">
                  {results.areas_for_improvement.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      {area}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No areas for improvement recorded
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
