import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const { event, session } = await request.json();

  if (event === "SIGNED_OUT") {
    const response = NextResponse.redirect(new URL("/auth", requestUrl));
    response.cookies.set("sb-koygfeonfswgqhoqqbnm-auth-token", "", {
      expires: new Date(0),
      path: "/",
    });
    return response;
  }

  if (session) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  return NextResponse.json({ success: true });
}
