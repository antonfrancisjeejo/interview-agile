"use client";

import {
  ChartBar,
  FileText,
  UserCircle2,
  MessageSquare,
  Briefcase,
  LogOut,
} from "lucide-react";
import SidebarLink from "./SidebarLink";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error("Logout failed", { description: error.message });
        return;
      }

      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed", { description: String(error) });
    }
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-[#2C2B35] to-[#1A1F2C] border-r border-gray-800/10 fixed left-0 shadow-xl">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-8 px-4 flex items-center space-x-3">
          <Briefcase className="w-8 h-8 text-white" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            InPrep
          </h2>
        </div>
        <ul className="space-y-2 font-medium">
          <SidebarLink
            href="/dashboard"
            icon={ChartBar}
            isActive={pathname === "/dashboard"}
          >
            Dashboard
          </SidebarLink>
          <SidebarLink
            href="/interviews"
            icon={UserCircle2}
            isActive={pathname === "/interviews"}
          >
            Interviews
          </SidebarLink>
          <SidebarLink
            href="/interview-questions"
            icon={MessageSquare}
            isActive={pathname === "/interview-questions"}
          >
            Interview Questions
          </SidebarLink>
          <SidebarLink
            href="/prompts"
            icon={FileText}
            isActive={pathname === "/prompts"}
          >
            AI Prompts
          </SidebarLink>
        </ul>

        {/* Add logout button at the bottom of the sidebar */}
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 text-white hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
