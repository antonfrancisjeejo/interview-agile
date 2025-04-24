/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@deepgram/sdk";
export async function handleAnalysis(conversationText: string) {
  try {
    const deepgramApiKey = "22aa63eeac07017aad0194bf86976c9ebb30d832"; // Store your Deepgram API key in .env.local
    const deepgram = createClient(deepgramApiKey);

    // Call the Deepgram API's analyzeText method to analyze the provided text
    const { result, error } = await deepgram.read.analyzeText(
      { text: conversationText },
      {
        language: "en",
        summarize: "v2" as unknown as boolean,
        topics: true,
        intents: true,
        sentiment: true,
      }
    );

    if (error) {
      console.error("Deepgram API Error:", error);
      //   return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return result;
  } catch (error: any) {
    console.error("Server Error:", error);
    // return NextResponse.json(
    //   { error: "Internal server error" },
    //   { status: 500 }
    // );
  }
}
