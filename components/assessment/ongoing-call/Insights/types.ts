
import { LucideIcon } from "lucide-react";
export interface CallHistory {
    id: string;
    personaId: string;
    personaName: string;
    personaImage: string;
    date: string;
    duration: string;
    performance: string;
    summary: string;
    suggestions: string[];
    audioUrl: string;
  }

  export interface SpeechMetric {
    label: string;
    value: string;
    icon: LucideIcon;
    description: string;
  }
  
  