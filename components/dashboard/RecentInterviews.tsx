"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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

const RecentInterviews = () => {
  const [interviews, setInterviews] = useState<CompletedInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);

        // Get the current user's session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          toast.error("Please log in to view your interviews");
          return;
        }

        // Fetch the last 3 completed interviews for the current user
        const { data, error } = await supabase
          .from("completed_interviews")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          throw error;
        }

        setInterviews(data || []);
      } catch (error) {
        console.error("Error fetching interviews:", error);
        toast.error("Failed to load recent interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, [supabase]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (interviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            No interviews completed yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{interview.position}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(interview.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    Score: {interview.overall_score}%
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {interview.duration}
                  </p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Technical</p>
                  <p className="font-medium">{interview.technical_score}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Communication</p>
                  <p className="font-medium">
                    {interview.communication_score}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentInterviews;
