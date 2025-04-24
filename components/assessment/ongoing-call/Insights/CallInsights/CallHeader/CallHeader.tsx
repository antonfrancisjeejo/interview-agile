
'use client'
import React from "react";
import { Calendar, Clock, X } from "lucide-react";
import { DialogTitle, DialogClose } from "@/components/ui/dialog";

interface CallHeaderProps {
  title?: string;
  date?: string;
  duration?: string;
  onClose?: () => void;
  isFullPage?: boolean;
}

export function CallHeader({ 
  title = "Call Analysis", 
  date = "Today", 
  duration = "0:00", 
  onClose, 
  isFullPage = false 
}: CallHeaderProps) {
  if (isFullPage) {
    return (
      <div className="px-2 py-1 border-b flex flex-row items-center justify-between bg-gradient-to-r from-blue-50/90 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20 shadow-sm">
        <div className="flex flex-col">
          <h2 className="text-xs font-bold text-blue-800 dark:text-blue-200">{title}</h2>
          <div className="flex items-center gap-1.5 text-[9px] text-blue-600 dark:text-blue-300">
            <span className="flex items-center gap-0.5">
              <Calendar className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" /> {date}
            </span>
            <span className="flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" /> {duration}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 py-1 border-b flex flex-row items-center justify-between bg-gradient-to-r from-blue-50/90 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20">
      <div className="flex flex-col">
        <DialogTitle className="text-[10px] md:text-xs font-bold text-blue-800 dark:text-blue-200">{title}</DialogTitle>
        <div className="flex items-center gap-1.5 text-[9px] text-blue-600 dark:text-blue-300">
          <span className="flex items-center gap-0.5">
            <Calendar className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" /> {date}
          </span>
          <span className="flex items-center gap-0.5">
            <Clock className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" /> {duration}
          </span>
        </div>
      </div>
      <DialogClose className="h-4 w-4 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/50 flex items-center justify-center" onClick={onClose}>
        <X className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" />
      </DialogClose>
    </div>
  );
}
