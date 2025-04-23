"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Play, Calendar, Clock, FileText } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface CompletedInterview {
  id: string;
  user_id: string;
  position: string;
  date: string;
  duration: number;
  overall_score: number;
  communication_score: number;
  technical_score: number;
  created_at: string;
}

export default function InterviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<CompletedInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      // Get the current user's session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);

      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to view your interviews",
          variant: "destructive",
        });
        return;
      }

      // Fetch all completed interviews for the current user
      const { data, error } = await supabase
        .from("completed_interviews")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Completed Interviews</h1>
          <Button
            onClick={() => router.push("/start-interview")}
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
                <p className="text-center text-gray-500">
                  No completed interviews yet
                </p>
              </CardContent>
            </Card>
          ) : (
            interviews.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{interview.position}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {interview.duration}
                        </div>
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
