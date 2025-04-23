"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import ActionButtons from "@/components/dashboard/ActionButtons";
import ResumeManager from "@/components/dashboard/ResumeManager";
import RecentInterviews from "@/components/dashboard/RecentInterviews";
import StatisticsCards from "@/components/dashboard/StatisticsCards";
import StreakSection from "@/components/dashboard/StreakSection";
import UploadDialog from "@/components/interview/UploadDialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardContent() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add a check for session on client side as a fallback
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth");
    }
  };

  // Check session on component mount
  useState(() => {
    checkSession();
  });

  const handleUploadResume = () => {
    fileInputRef.current?.click();
  };

  return (
    <DashboardLayout>
      <WelcomeHeader />
      <ActionButtons
        onStartInterview={() => setIsUploadDialogOpen(true)}
        onUploadResume={handleUploadResume}
      />
      <div className="flex justify-center my-8">
        <Button
          size="lg"
          className="w-full max-w-md bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/interview-questions")}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Practice Questions
        </Button>
      </div>
      <StreakSection />
      <StatisticsCards />
      <ResumeManager fileInputRef={fileInputRef} />
      <RecentInterviews />

      <UploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </DashboardLayout>
  );
}
