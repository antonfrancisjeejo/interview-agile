"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
  children: React.ReactNode;
}

const SidebarLink = ({
  href,
  icon: Icon,
  isActive = false,
  children,
}: SidebarLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className={`
          flex items-center p-2 text-white/80 rounded-lg 
          hover:bg-white/10 transition-colors duration-200
          ${isActive ? "bg-white/10 text-white" : ""}
        `}
      >
        <Icon className="w-5 h-5 text-white/70" />
        <span className="ml-3">{children}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
