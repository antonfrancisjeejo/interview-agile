"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChartBar, Mic, Briefcase, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();

      // Force a hard refresh to clear any cached data
      window.location.href = "/auth";
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-8 px-4 flex items-center space-x-3">
          <Briefcase className="w-8 h-8 text-purple-700" />
          <h2 className="text-2xl font-bold text-purple-700">InPrep</h2>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <ChartBar className="w-5 h-5 text-gray-500" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/interviews"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 bg-gray-100"
            >
              <Mic className="w-5 h-5 text-gray-500" />
              <span className="ml-3">Interviews</span>
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
