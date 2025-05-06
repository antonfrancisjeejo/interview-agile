"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useResumes } from "@/hooks/useResumes";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  FileImage,
  FileVideo,
  FileArchive,
  FileAudio,
  FileSpreadsheet,
  FileJson,
  FileCode,
  File,
} from "lucide-react";
import SelectQuestionsDialog from "./SelectQuestionsDialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PersonaOption {
  id: string;
  name: string;
  company: string;
  image: string | null;
}

interface SelectQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (selectedQuestions: string[]) => void;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: string;
}

interface QuestionSet {
  technicalQuestions: string[];
  experienceQuestions: string[];
  behavioralQuestions: string[];
  clarificationQuestions: string[];
}

interface SelectedQuestions {
  [key: string]: boolean;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
    case "txt":
    case "doc":
    case "docx":
      return <FileText className="h-4 w-4 text-purple-600 mr-2" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage className="h-4 w-4 text-blue-500 mr-2" />;
    case "mp4":
    case "mov":
    case "avi":
      return <FileVideo className="h-4 w-4 text-pink-500 mr-2" />;
    case "zip":
    case "rar":
      return <FileArchive className="h-4 w-4 text-yellow-700 mr-2" />;
    case "mp3":
    case "wav":
      return <FileAudio className="h-4 w-4 text-green-600 mr-2" />;
    case "csv":
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="h-4 w-4 text-green-700 mr-2" />;
    case "json":
      return <FileJson className="h-4 w-4 text-blue-700 mr-2" />;
    case "js":
    case "ts":
    case "tsx":
    case "py":
    case "java":
    case "cpp":
    case "c":
      return <FileCode className="h-4 w-4 text-gray-800 mr-2" />;
    default:
      return <File className="h-4 w-4 text-gray-400 mr-2" />;
  }
};

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const { toast } = useToast();
  const { resumes, loading: resumesLoading } = useResumes();
  const [personas, setPersonas] = useState<PersonaOption[]>([]);
  const [personasLoading, setPersonasLoading] = useState(false);
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState<string>("");
  const [selectedResume, setSelectedResume] = useState<string>("");
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [isStartingInterview, setIsStartingInterview] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPersonas = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user?.id) return;
      setPersonasLoading(true);
      try {
        const { data, error } = await supabase
          .from("ai_personas")
          .select("*")
          .eq("user_id", session?.user?.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPersonas(data || []);
      } catch (error) {
        console.error("Error fetching personas:", error);
        toast({
          title: "Error",
          description: "Failed to load AI personas",
          variant: "destructive",
        });
      } finally {
        setPersonasLoading(false);
      }
    };

    if (open) {
      fetchPersonas();
    }
  }, [open, user]);

  const handleJobDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(event.target.value);
  };

  const handleResumeSelect = (value: string) => {
    setSelectedResume(value);
  };

  const handlePersonaSelect = (value: string) => {
    setSelectedPersona(value);
  };

  const handleInitialSubmit = async () => {
    if (jobDescription && selectedResume && selectedPersona) {
      try {
        setIsStartingInterview(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user?.id) {
          toast({
            title: "Error",
            description: "Please log in to continue",
            variant: "destructive",
          });
          return;
        }
        // Fetch questions from the API
        const { data: questions } = await axios.post("/api/questions", {
          jobDescription,
          resumeUrl: selectedResume,
        });
        // Create a new interview record
        const { data: interview, error } = await supabase
          .from("interviews")
          .insert([
            {
              user_id: session.user.id,
              job_description: jobDescription,
              resume_url: selectedResume,
              persona_id: selectedPersona,
              questions: questions,
              status: "pending",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Interview starting",
          description: "Preparing your interview session...",
        });

        // Redirect to interview page
        window.location.href = `/interview/${interview.id}`;
      } catch (error) {
        console.error("Error creating interview:", error);
        toast({
          title: "Error",
          description: "Failed to create interview session",
          variant: "destructive",
        });
      } finally {
        setIsStartingInterview(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Start Interview</DialogTitle>
          <DialogDescription>
            Choose a resume and interviewer persona to start your interview.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Job Description
            </label>
            <Textarea
              placeholder="Paste or type the job description here..."
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              className="min-h-[200px] resize-none"
            />
          </div>
          {resumesLoading ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Select Resume
              </label>
              <Skeleton className="h-10 w-full" />
            </div>
          ) : resumes.length > 0 ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Select Resume
              </label>
              <Select value={selectedResume} onValueChange={handleResumeSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resumes
                    .filter((resume) => resume.url)
                    .map((resume, index) => (
                      <SelectItem key={index} value={resume.url!}>
                        <div className="flex items-center gap-2">
                          {getFileIcon(resume.name)}
                          <span className="truncate">{resume.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                No resumes uploaded yet. Please upload a resume in the
                Dashboard.
              </p>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Select Interviewer Persona
            </label>
            {personasLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : personas.length > 0 ? (
              <Select
                value={selectedPersona}
                onValueChange={handlePersonaSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an AI persona" />
                </SelectTrigger>
                <SelectContent>
                  {personas.map((persona) => (
                    <SelectItem key={persona.id} value={persona.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={persona.image || undefined}
                            alt={persona.name}
                          />
                          <AvatarFallback>{persona.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>
                          {persona.name} ({persona.company})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm text-gray-500">
                No AI personas found. You can add some in the AI Prompts tab.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleInitialSubmit}
            className="sm:w-auto w-full"
            disabled={
              resumesLoading ||
              !jobDescription ||
              !selectedResume ||
              !selectedPersona ||
              isStartingInterview
            }
          >
            {isStartingInterview ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Starting Interview...
              </>
            ) : (
              "Start Interview"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
