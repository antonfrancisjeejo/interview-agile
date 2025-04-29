import { createClient } from "@supabase/supabase-js";
import {
  createClientComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase/client

export const supabase = createClient(
  "https://koygfeonfswgqhoqqbnm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveWdmZW9uZnN3Z3Fob3FxYm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Nzk1MTgsImV4cCI6MjA2MDM1NTUxOH0.0ZcGjQKR625ARlyqVcqd_4Fmy43onIjLQdnWhfRNs1k"
);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // const supabase = createRouteHandlerClient({ cookies });
    // const supabase = createClientComponentClient();

    // console.log(supabase);

    console.log("Interview ID:", params.id);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // console.log(session);

    // Fetch the interview data with all related data
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("id", params.id);

    if (!data || data.length === 0) {
      console.log("No interview found with ID:", params.id);
      return NextResponse.json({ data }, { status: 404 });
    }

    const { data: persona, error: personaError } = await supabase
      .from("ai_personas")
      .select("name, company, prompt, description")
      .eq("id", data[0].persona_id);

    console.log("Supabase response:", { t: data[0].persona_id, persona });

    if (!persona || persona.length === 0) {
      return NextResponse.json({ ...data[0] }, { status: 404 });
    }

    const result = {
      ...data[0],
      ai_persona: persona[0],
    };

    if (error) {
      console.error("Error fetching interview:", error);
      return NextResponse.json(
        { error: "Failed to fetch interview" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in interview API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
