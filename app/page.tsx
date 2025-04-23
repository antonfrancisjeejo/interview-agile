import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import HomeContent from "@/components/home/HomeContent";

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
}
