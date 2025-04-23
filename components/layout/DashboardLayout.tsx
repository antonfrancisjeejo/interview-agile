"use client";

import Sidebar from "@/components/dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
