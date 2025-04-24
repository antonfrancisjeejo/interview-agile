import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { ReduxProvider } from "@/store/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview AI Ready",
  description: "AI-powered interview preparation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ReduxProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
