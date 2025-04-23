"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Search, Filter } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Question {
  id: string;
  question: string;
  type: "technical" | "behavioral" | "situational";
  created_at: string;
}

export default function InterviewQuestionsContent() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<Question["type"] | "all">("all");
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "technical" as Question["type"],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);

    // Get the current user's session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(session);

    if (!session) {
      toast({
        title: "Error",
        description: "Please log in to view your interviews",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from("interview_questions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive",
      });
      return;
    }

    if (!data) {
      console.log("No data returned from Supabase");
      setQuestions([]);
      setLoading(false);
      return;
    }

    console.log("Raw data from Supabase:", data);

    const typedQuestions: Question[] = (data || []).map((item) => ({
      id: item.id,
      question: item.question,
      type:
        item.type === "technical" ||
        item.type === "behavioral" ||
        item.type === "situational"
          ? item.type
          : "technical",
      created_at: item.created_at || new Date().toISOString(),
    }));

    console.log("Processed questions:", typedQuestions);

    setQuestions(typedQuestions);
    setLoading(false);
  };

  const handleCreateQuestion = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create questions",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("interview_questions")
        .insert([
          {
            question: newQuestion.question,
            type: newQuestion.type,
            user_id: user.id,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Question created successfully",
      });

      setNewQuestion({
        question: "",
        type: "technical",
      });
      setIsCreating(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
      toast({
        title: "Error",
        description: "Failed to create question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateQuestion = async (id: string) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from("interview_questions")
      .update(newQuestion)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Question updated successfully",
    });

    setNewQuestion({
      question: "",
      type: "technical",
    });
    setIsEditing(null);
    fetchQuestions();
  };

  const handleDeleteQuestion = async (id: string) => {
    const { error } = await supabase
      .from("interview_questions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete question",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Question deleted successfully",
    });

    setQuestionToDelete(null);
    fetchQuestions();
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || question.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Interview Questions
          </h1>
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add New Question
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select
            value={filterType}
            onValueChange={(value) =>
              setFilterType(value as Question["type"] | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="situational">Situational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(isCreating || isEditing) && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Question" : "Add New Question"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <Textarea
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      question: e.target.value,
                    })
                  }
                  placeholder="Enter your question"
                  rows={4}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value) =>
                    setNewQuestion({
                      ...newQuestion,
                      type: value as Question["type"],
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="situational">Situational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(null);
                    setNewQuestion({
                      question: "",
                      type: "technical",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    isEditing
                      ? handleUpdateQuestion(isEditing)
                      : handleCreateQuestion()
                  }
                  disabled={!newQuestion.question || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </div>
                  ) : isEditing ? (
                    "Update Question"
                  ) : (
                    "Add Question"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:gap-6">
          {filteredQuestions.map((question) => (
            <Card key={question.id} className="w-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl">
                      {question.question}
                    </CardTitle>
                    <p className="text-sm text-gray-500 capitalize mt-1">
                      {question.type}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsEditing(question.id);
                        setNewQuestion({
                          question: question.question,
                          type: question.type,
                        });
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuestionToDelete(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchQuery || filterType !== "all"
                ? "No questions match your search criteria"
                : "No questions added yet"}
            </p>
          </div>
        )}
      </div>

      <AlertDialog
        open={!!questionToDelete}
        onOpenChange={() => setQuestionToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                questionToDelete && handleDeleteQuestion(questionToDelete)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
