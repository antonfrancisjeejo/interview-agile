"use client";

import { Button } from "@/components/ui/button";
import { Calendar, FileText, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  variant?: "default" | "outline";
}

const ActionButton = ({
  icon,
  text,
  onClick,
  variant = "default",
}: ActionButtonProps) => (
  <Button className="w-full h-auto py-6" variant={variant} onClick={onClick}>
    {icon}
    {text}
  </Button>
);

interface ActionButtonsProps {
  onStartInterview: () => void;
  onUploadResume: () => void;
}

const ActionButtons = ({
  onStartInterview,
  onUploadResume,
}: ActionButtonsProps) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <ActionButton
        icon={<Calendar className="mr-2 h-5 w-5" />}
        text="Start New Interview"
        onClick={onStartInterview}
      />
      <ActionButton
        icon={<FileText className="mr-2 h-5 w-5" />}
        text="Upload Resume"
        onClick={onUploadResume}
        variant="outline"
      />
      <ActionButton
        icon={<Users className="mr-2 h-5 w-5" />}
        text="View Past Interviews"
        onClick={() => router.push("/interviews")}
        variant="outline"
      />
    </div>
  );
};

export default ActionButtons;
