"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Play, Calendar, Clock, FileText } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UploadDialog from "@/components/interview/UploadDialog";

interface CompletedInterview {
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

export default function InterviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<CompletedInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to view your interviews",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching interviews:", error);
        toast({
          title: "Error",
          description: "Failed to load interviews",
          variant: "destructive",
        });
        return;
      }

      setInterviews(data || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast({
        title: "Error",
        description: "Failed to load interviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 pl-[300px]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Interviews</h1>
          <Button
            onClick={() => setShowUploadDialog(true)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Start New Interview
          </Button>
        </div>

        <div className="grid gap-6">
          {interviews.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">No interviews yet</p>
              </CardContent>
            </Card>
          ) : (
            interviews.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {interview.company || "Interview"}
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            interview.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {interview.status}
                        </span>
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        {interview.duration && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {interview.duration} minutes
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        router.push(`/interview/${interview.id}/results`)
                      }
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {interview.overall_score !== null && (
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Overall Score</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {interview.overall_score}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Technical Score</p>
                        <p className="text-2xl font-bold text-green-600">
                          {interview.technical_score}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Communication Score
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {interview.communication_score}%
                        </p>
                      </div>
                    </div>
                  )}
                  {interview.transcriptions &&
                    interview.transcriptions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Recent Conversation
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          {interview.transcriptions
                            .slice(-2)
                            .map((transcript, index) => (
                              <div key={index} className="mb-2">
                                <p
                                  className={`text-sm ${
                                    transcript.is_agent
                                      ? "text-blue-600"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {transcript.is_agent ? "Interviewer" : "You"}:{" "}
                                  {transcript.segment_text}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <UploadDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
      />
    </div>
  );
}
