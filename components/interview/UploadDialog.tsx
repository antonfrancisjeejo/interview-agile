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
  const [showQuestionSelection, setShowQuestionSelection] = useState(false);
  const supabase = createClientComponentClient();
  const [questions, setQuestions] = useState<QuestionSet | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestions>(
    {}
  );
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isStartingInterview, setIsStartingInterview] = useState(false);

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

  const handleQuestionSelectionComplete = async () => {
    try {
      setIsStartingInterview(true);
      // Get the stored interview data
      const currentInterviewData = JSON.parse(
        localStorage.getItem("currentInterviewData") || "{}"
      );

      // Get all selected questions
      const selectedQuestionList = Object.entries(selectedQuestions)
        .filter(([_, isSelected]) => isSelected)
        .map(([question]) => question);

      const supabase = createClientComponentClient();

      const { error } = await supabase
        .from("interviews")
        .update({
          questions: selectedQuestionList,
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentInterviewData.interviewId);

      if (error) throw error;

      toast({
        title: "Interview starting",
        description: "Preparing your interview session...",
      });

      setTimeout(() => {
        window.location.href = `/interview/${currentInterviewData.interviewId}`;
      }, 1000);
    } catch (error) {
      console.error("Error starting interview:", error);
      toast({
        title: "Error",
        description: "Failed to start interview session",
        variant: "destructive",
      });
    } finally {
      setIsStartingInterview(false);
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  const handleInitialSubmit = async () => {
    if (jobDescription && selectedResume && selectedPersona) {
      try {
        setIsLoadingQuestions(true);
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

        // Create a new interview record
        const { data: interview, error } = await supabase
          .from("interviews")
          .insert([
            {
              user_id: session.user.id,
              job_description: jobDescription,
              resume_url: selectedResume,
              persona_id: selectedPersona,
              status: "pending",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        // Store the interview ID in localStorage for later use
        localStorage.setItem(
          "currentInterviewData",
          JSON.stringify({
            jobDescription,
            resume: selectedResume,
            persona: selectedPersona,
            interviewId: interview.id,
          })
        );

        // Fetch questions with job description and resume information
        const { data: fetchedQuestions } = await axios.post("/api/questions", {
          jobDescription,
          resumeUrl: selectedResume,
        });
        setQuestions(fetchedQuestions);
        setShowQuestionSelection(true);
      } catch (error) {
        console.error("Error creating interview:", error);
        toast({
          title: "Error",
          description: "Failed to create interview session",
          variant: "destructive",
        });
      } finally {
        setIsLoadingQuestions(false);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Resume</DialogTitle>
            <DialogDescription>
              Choose a resume and interviewer persona to use for your interview
              preparation.
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
                <Select
                  value={selectedResume}
                  onValueChange={handleResumeSelect}
                >
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
                isLoadingQuestions
              }
            >
              {isLoadingQuestions ? (
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
                  Loading Questions...
                </>
              ) : (
                "Continue to Questions"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showQuestionSelection}
        onOpenChange={() => setShowQuestionSelection(false)}
      >
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Questions</DialogTitle>
            <DialogDescription>
              Choose the questions you want to practice with
            </DialogDescription>
          </DialogHeader>
          {isLoadingQuestions ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : questions ? (
            <div className="space-y-6">
              {Object.entries(questions).map(([category, questionList]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-lg font-semibold capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <div className="grid gap-4">
                    {questionList.map((question: string, index: number) => (
                      <Card key={`${category}-${index}`}>
                        <CardHeader className="flex flex-row items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedQuestions[question] || false}
                            onChange={() => handleQuestionSelect(question)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <CardTitle className="text-lg">{question}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No questions available
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleQuestionSelectionComplete}
              disabled={
                Object.values(selectedQuestions).filter(Boolean).length === 0 ||
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
    </>
  );
};

export default UploadDialog;
