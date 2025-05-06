
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import AudioVisualization from "@/components/AudioVisualization";
import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewParticipant from "@/components/interview/InterviewParticipant";
import ConversationPanel from "@/components/interview/ConversationPanel";
import InterviewSidebar from "@/components/interview/InterviewSidebar";
import { supabase } from "@/integrations/supabase/client";

interface PersonaData {
  id: string;
  name: string;
  company?: string;
  image?: string;
}

const getCurrentInterviewData = () => {
  const data = localStorage.getItem("currentInterviewData");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

// Uses persona.image if provided, else a fallback
const getPersonaImage = (persona?: PersonaData) => {
  if (persona?.image) return persona.image;
  // fallback
  return "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
};

const StartInterview = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Interview data states
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [persona, setPersona] = useState<PersonaData | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<'ai' | 'user'>('ai');

  const getUserImage = () => {
    return user?.user_metadata?.avatar_url
      || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
  };

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle speaker animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpeaker((current) => (current === 'ai' ? 'user' : 'ai'));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const data = getCurrentInterviewData();
    if (data) {
      setJobDescription(data.jobDescription || "");
      setResume(data.resume || "");
      if (data.persona) {
        setPersonaId(data.persona);
      }
    }
  }, []);

  // Fetch persona info from supabase when personaId changes
  useEffect(() => {
    const fetchPersona = async (personaId: string) => {
      const { data, error } = await supabase
        .from('ai_personas')
        .select("id,name,company,image")
        .eq("id", personaId)
        .single();
      
      if (!error && data) {
        setPersona({
          id: data.id,
          name: data.name,
          company: data.company,
          image: data.image,
        });
      } else {
        setPersona(null);
      }
    };

    if (personaId) {
      fetchPersona(personaId);
    } else {
      setPersona(null);
    }
  }, [personaId]);

  const handleEndInterview = async () => {
    try {
      if (user) {
        const { error } = await supabase.from('interviews').insert({
          user_id: user.id,
          job_description: jobDescription,
          resume_url: resume,
          persona_id: personaId,
          status: 'completed'
        });

        if (error) throw error;
      }

      navigate("/interviews");
    } catch (error) {
      console.error("Error ending interview:", error);
      navigate("/interviews");
    }
  };

  const aiName = persona?.name || "AI Technical Interviewer";
  const aiImage = getPersonaImage(persona);
  const candidateName = user?.user_metadata?.full_name || user?.email || "You";
  const candidateImage = getUserImage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex">
      <InterviewSidebar />
      <div className="flex-1">
        <InterviewHeader elapsedTime={elapsedTime} onEndInterview={handleEndInterview} />

        <div className="pt-24 px-4 sm:px-8 pb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full max-w-[1800px] mx-auto">
            <Card className="flex-none lg:flex-[0.7] bg-white/90 backdrop-blur-sm p-4 sm:p-8 shadow-xl rounded-xl">
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h1 className="text-xl sm:text-2xl font-semibold text-purple-900">Ongoing Interview</h1>
                  <p className="text-purple-600">{elapsedTime}</p>
                  {jobDescription && (
                    <div className="mt-4 bg-purple-50 rounded-lg px-4 py-2 text-gray-700 text-sm">
                      <span className="font-semibold text-purple-700">Job Description:</span> {jobDescription}
                    </div>
                  )}
                  {resume && (
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-semibold text-purple-700">Resume:</span> {resume}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-18 sm:gap-24 py-4 sm:py-8">
                  <InterviewParticipant
                    isActive={activeSpeaker === 'ai'}
                    image={aiImage}
                    name={aiName}
                    role={persona?.company ? `AI Interviewer - ${persona.company}` : "AI Technical Interviewer"}
                  />
                  <InterviewParticipant
                    isActive={activeSpeaker === 'user'}
                    image={candidateImage}
                    name={candidateName}
                    role="Candidate"
                  />
                </div>

                <div className="bg-purple-50/50 rounded-xl p-4 sm:p-6 mx-auto max-w-3xl">
                  <AudioVisualization isActive={true} />
                </div>
              </div>
            </Card>

            <ConversationPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
