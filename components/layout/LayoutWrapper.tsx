"use client";

import { ReactNode, useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import { usePathname } from "next/navigation";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Don't show sidebar on auth pages
  if (pathname?.startsWith("/auth")) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
};

export default LayoutWrapper;
