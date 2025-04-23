"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Interview {
  id: string;
  user_id: string;
  job_description: string;
  resume_id: string;
  persona_id: string;
  status: string;
  created_at: string;
}

export default function InterviewPage() {
  const params = useParams();
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Error",
            description: "Please log in to view this interview",
            variant: "destructive",
          });
          return;
        }

        const { data, error } = await supabase
          .from("interviews")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setInterview(data);
      } catch (error) {
        console.error("Error fetching interview:", error);
        toast({
          title: "Error",
          description: "Failed to load interview details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Loading interview...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Interview not found</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{interview.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Job Description
                </h3>
                <p className="mt-1 whitespace-pre-wrap">
                  {interview.job_description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
