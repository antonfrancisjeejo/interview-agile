"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp: string;
}

interface InterviewTranscriptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transcript: TranscriptEntry[];
}

const InterviewTranscriptDialog = ({
  open,
  onOpenChange,
  transcript,
}: InterviewTranscriptDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Interview Transcript</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {transcript.map((entry, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-24 text-sm text-muted-foreground">
                  {entry.timestamp}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-primary">
                    {entry.speaker}
                  </div>
                  <div className="mt-1 text-sm">{entry.text}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewTranscriptDialog;
