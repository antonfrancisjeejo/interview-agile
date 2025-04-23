import ProtectedRoute from "@/components/auth/ProtectedRoute";
import InterviewQuestionsContent from "@/components/interview-questions/InterviewQuestionsContent";

export default async function InterviewQuestionsPage() {
  return (
    <ProtectedRoute>
      <InterviewQuestionsContent />
    </ProtectedRoute>
  );
}
