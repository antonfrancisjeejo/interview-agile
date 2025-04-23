"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, Mic, MicOff, Speaker } from "lucide-react";
import AudioVisualization from "@/components/AudioVisualization";

const sampleQuestions = [
  "Tell me about a challenging project you worked on.",
  "How do you handle conflicts in a team?",
  "What are your greatest strengths?",
  "Where do you see yourself in 5 years?",
];

const PracticeSection = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingFeedback, setIsPlayingFeedback] = useState(false);

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setAnswer("");
    setShowAnswer(false);
    setIsRecording(false);
    setIsPlayingFeedback(false);
  };

  const handleSubmit = () => {
    setShowAnswer(true);
    // Simulate audio feedback playback
    setIsPlayingFeedback(true);
    setTimeout(() => {
      setIsPlayingFeedback(false);
    }, 5000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic would go here
      setAnswer(""); // Clear any previous text input
    } else {
      // Stop recording logic would go here
      setAnswer("Your audio response has been recorded"); // Simulate transcription
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Practice Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Select a Question
          </h3>
          <div className="space-y-3">
            {sampleQuestions.map((question) => (
              <Button
                key={question}
                variant={selectedQuestion === question ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleQuestionSelect(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          {selectedQuestion ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-800">
                {selectedQuestion}
              </h3>

              <div className="flex flex-col items-center gap-4">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  className="w-full max-w-[200px]"
                  onClick={toggleRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </>
                  )}
                </Button>

                {isRecording && (
                  <div className="w-full bg-blue-50 rounded-lg p-4">
                    <AudioVisualization isActive={true} />
                  </div>
                )}

                <Textarea
                  placeholder="Your recorded answer will appear here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!answer.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Answer
              </Button>

              {showAnswer && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-800">Feedback</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-700"
                      onClick={() => setIsPlayingFeedback(!isPlayingFeedback)}
                    >
                      <Speaker className="h-4 w-4 mr-2" />
                      {isPlayingFeedback ? "Stop" : "Play"} Audio
                    </Button>
                  </div>
                  {isPlayingFeedback && (
                    <div className="mb-3">
                      <AudioVisualization isActive={true} />
                    </div>
                  )}
                  <p className="text-green-700">
                    Good structure! Consider adding specific examples to support
                    your points. Focus on quantifiable achievements and outcomes
                    when possible.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Select a question to start practicing
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default PracticeSection;
