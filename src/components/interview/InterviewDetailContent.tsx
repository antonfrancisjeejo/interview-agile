
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import InterviewOverviewCard from "@/components/interview/InterviewOverviewCard";
import PerformanceMetricsCard from "@/components/interview/PerformanceMetricsCard";
import QuestionAnalysisCard from "@/components/interview/QuestionAnalysisCard";
import InterviewDetailSkeleton from "@/components/interview/InterviewDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Json } from "@/integrations/supabase/types";
import InterviewSidebar from "./InterviewSidebar";
import InterviewTranscriptDialog from "./InterviewTranscriptDialog";
import InterviewRecordingDialog from "./InterviewRecordingDialog";

interface ConversationTranscript {
  role: string;
  text: string;
}

interface InterviewQuestion {
  id: number;
  question: string;
  answer: string;
  feedback: string;
  score: number;
}

interface InterviewData {
  id: string;
  user_id: string;
  position: string;
  company: string;
  date: string | null;
  duration: string | null;
  overall_score: number | null;
  communication_score: number | null;
  technical_score: number | null;
  questions_answered: number | null;
  recording_url: string | null;
  status: string | null;
  conversation_transcript: Json[] | null;
  created_at: string | null;
  updated_at: string | null;
  persona_id: string | null;
  persona: {
    name: string;
    company: string;
    image: string | null;
  } | null;
  questions?: InterviewQuestion[];
}

const getInterviewData = async (id: string) => {
  const { data, error } = await supabase
    .from('interviews')
    .select(`
      *,
      persona:persona_id (
        name,
        company,
        image
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  // For now, generate mock questions data since it's not in the database yet
  const mockQuestions = [
    {
      id: 1,
      question: "Tell me about yourself",
      answer: "I am a software engineer with 5 years of experience...",
      feedback: "Good introduction, but could be more concise",
      score: 8
    },
    {
      id: 2,
      question: "What's your biggest weakness?",
      answer: "I sometimes focus too much on details...",
      feedback: "Good self-awareness, try to emphasize growth more",
      score: 7
    }
  ];
  
  return { ...data, questions: mockQuestions };
};

const InterviewDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isTranscriptDialogOpen, setIsTranscriptDialogOpen] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);

  const { data: interview, isLoading, error } = useQuery({
    queryKey: ['interview', id],
    queryFn: () => getInterviewData(id || ""),
    retry: 1,
    meta: {
      onSettled: (_data, error: Error | null) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load interview details. Please try again later.",
            variant: "destructive",
          });
        }
      }
    },
  });

  if (error) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Link to="/interviews" className="flex items-center text-gray-600 hover:text-purple-600 mr-4">
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back to Interviews</span>
          </Link>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load interview details. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex">
      <InterviewSidebar />
      <main className="flex-1 px-2 sm:px-8 py-4">
        <div className="flex items-center mb-6">
          <Link to="/interviews" className="flex items-center text-gray-600 hover:text-purple-600 mr-4">
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back to Interviews</span>
          </Link>
          <h1 className="text-2xl font-bold">Interview Details</h1>
        </div>

        {isLoading ? (
          <InterviewDetailSkeleton />
        ) : (
          interview && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <InterviewOverviewCard 
                  position={interview.position || ""}
                  company={interview.company || ""}
                  date={interview.date}
                  duration={interview.duration}
                  overallScore={interview.overall_score}
                />
                <PerformanceMetricsCard metrics={{
                  confidence: interview.overall_score || 0,
                  fluency: interview.communication_score || 0,
                  technicalAccuracy: interview.technical_score || 0,
                  pauses: 0,
                  fillerWords: 0,
                  wordsPerMinute: 0,
                }} />
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsTranscriptDialogOpen(true)}
                  >
                    View Conversation Transcript
                  </Button>
                  {interview.recording_url && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsRecordingDialogOpen(true)}
                    >
                      View Interview Recording
                    </Button>
                  )}
                </div>
              </div>

              {interview.questions && <QuestionAnalysisCard questions={interview.questions} />}

              <InterviewTranscriptDialog
                open={isTranscriptDialogOpen}
                onOpenChange={setIsTranscriptDialogOpen}
                transcripts={interview.conversation_transcript as any[] || []}
              />

              <InterviewRecordingDialog
                open={isRecordingDialogOpen}
                onOpenChange={setIsRecordingDialogOpen}
                recordingUrl={interview.recording_url}
              />
            </>
          )
        )}
      </main>
    </div>
  );
};

export default InterviewDetailContent;
