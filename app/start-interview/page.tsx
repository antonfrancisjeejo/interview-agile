"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResumes } from "@/hooks/useResumes";

interface Resume {
  id: string;
  name: string;
  content: string;
  created_at: string;
}

interface Persona {
  id: string;
  name: string;
  company: string;
  description: string;
  prompt: string;
}

export default function StartInterviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  //   const [resumes, setResumes] = useState<Resume[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [formData, setFormData] = useState({
    job_description: "",
    resume_id: "",
    persona_id: "",
  });
  const { resumes } = useResumes();

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("ai_personas")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPersonas(data || []);
    } catch (error) {
      console.error("Error fetching personas:", error);
      toast({
        title: "Error",
        description: "Failed to load personas",
        variant: "destructive",
      });
    }
  };

  console.log(resumes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to start an interview",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("interviews")
        .insert([
          {
            user_id: session.user.id,
            job_description: formData.job_description,
            resume_id: formData.resume_id,
            persona_id: formData.persona_id,
            status: "scheduled",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Interview scheduled successfully",
      });

      router.push(`/interview/${data.id}`);
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast({
        title: "Error",
        description: "Failed to schedule interview",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Start New Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  value={formData.job_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      job_description: e.target.value,
                    })
                  }
                  placeholder="Enter the job description"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Resume</label>
                <Select
                  value={formData.resume_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, resume_id: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem
                        key={resume.url || `resume-${resume.name}`}
                        value={resume.url || `resume-${resume.name}`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {resume.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select Interviewer
                </label>
                <Select
                  value={formData.persona_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, persona_id: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {personas.map((persona) => (
                      <SelectItem key={persona.id} value={persona.id}>
                        {persona.name} ({persona.company})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Starting..." : "Start Interview"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
