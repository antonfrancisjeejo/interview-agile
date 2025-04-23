import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        return NextResponse.json(
          { error: "Failed to sign out" },
          { status: 500 }
        );
      }

      // Clear the auth cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set("sb-koygfeonfswgqhoqqbnm-auth-token", "", {
        expires: new Date(0),
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
