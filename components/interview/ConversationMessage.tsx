"use client";

import { cn } from "@/lib/utils";

interface ConversationMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ConversationMessage = ({
  message,
  isUser,
  timestamp,
}: ConversationMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
      <span className="text-xs text-muted-foreground">
        {timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default ConversationMessage;
