"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

interface InterviewRecordingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const InterviewRecordingDialog = ({
  open,
  onOpenChange,
  isRecording,
  onStartRecording,
  onStopRecording,
}: InterviewRecordingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Interview Recording</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-4 py-4">
          {!isRecording ? (
            <Button
              onClick={onStartRecording}
              className="bg-red-500 hover:bg-red-600"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={onStopRecording}
              className="bg-red-500 hover:bg-red-600"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop Recording
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewRecordingDialog;
