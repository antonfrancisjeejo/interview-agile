import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import axios from "axios";

// export const supabase = createClient(
//   "https://koygfeonfswgqhoqqbnm.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveWdmZW9uZnN3Z3Fob3FxYm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Nzk1MTgsImV4cCI6MjA2MDM1NTUxOH0.0ZcGjQKR625ARlyqVcqd_4Fmy43onIjLQdnWhfRNs1k"
// );

function convertToNumberedText(jsonString: string) {
  try {
    const questions = JSON.parse(jsonString);
    if (!Array.isArray(questions)) {
      throw new Error("Parsed data is not an array.");
    }

    return questions
      .map((question, index) => `${index + 1}. ${question}`)
      .join("\n");
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
}

function extractInterviewSegments(data: any) {
  return data.map((segment: any) => ({
    interviewer: segment.is_agent,
    text: segment.segment_text,
  }));
}

function extractJSONFromText(input: string) {
  const jsonStart = input.indexOf("```json");
  const jsonEnd = input.indexOf("```", jsonStart + 6); // 6 is the length of '```json'

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("JSON block not found in the input.");
  }

  const jsonString = input.substring(jsonStart + 7, jsonEnd).trim(); // 7 = length of '```json' + 1 newline
  return JSON.parse(jsonString);
}

function formatTranscriptToQA(transcript: any) {
  const qaPairs = [];
  let currentQuestion = null;
  let currentAnswer = [];

  for (const message of transcript) {
    if (message.interviewer) {
      // If there's a previous Q+A pair, save it
      if (currentQuestion && currentAnswer.length > 0) {
        qaPairs.push({
          question: currentQuestion,
          answer: currentAnswer
            .map((m) => m.text)
            .join(" ")
            .trim(),
        });
      }
      // Start a new question
      currentQuestion = message.text.trim();
      currentAnswer = [];
    } else {
      if (currentQuestion) {
        currentAnswer.push(message);
      }
    }
  }

  // Push last question-answer pair if any
  if (currentQuestion && currentAnswer.length > 0) {
    qaPairs.push({
      question: currentQuestion,
      answer: currentAnswer
        .map((m) => m.text)
        .join(" ")
        .trim(),
    });
  }

  return qaPairs.slice(0, 5);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("id", params.id);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No interview found" },
        { status: 404 }
      );
    }

    let questions = convertToNumberedText(data[0].questions);

    let transcript = extractInterviewSegments(data[0].transcriptions);

    // console.log(transcript);

    const prompt = `
You are an AI evaluator. Do not summarize, do not explain, do not add sections or headings.

I am giving you a list of interview questions and answers. For each pair, evaluate the response and output a JSON object with the following structure:
[
  {
    "question": "",
    "answer": "",
    "technical_score": 0,
    "communication_score": 0,
    "strengths": [],
    "what_can_be_done_better": [],
    "overall_feedback": ""
  }
]
Important rules:

ONLY return a valid JSON array as shown above — no commentary, no summary, no text before or after.

Each question and answer pair must be processed into one object in the array.

Keep the original question and answer exactly as provided.

technical_score and communication_score must be integers between 1 and 10.

Use short bullet points for strengths and what_can_be_done_better.

The output must be usable as JSON in a program — it must NOT include any Markdown, headings, or extra formatting.

Think step-by-step before generating but only return the final JSON.

Now here is the input list (in JSON format):
    ${JSON.stringify(formatTranscriptToQA(transcript))}

    Always return a valid JSON array and strictly follow the format in '''json'''
    `;

    console.log("prompt", prompt);

    const url = "https://52nvm81yvqinq8-80.proxy.runpod.net/api/generate";

    const res = await axios.post(url, {
      model: "deepseek-r1:8b",
      prompt: prompt,
      stream: false,
    });

    console.log("API response received");
    // Extract JSON from the response
    const responseText = res.data.response;
    // const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    // if (!jsonMatch) {
    //   throw new Error("Failed to extract JSON from response");
    // }
    console.log("responseText", responseText);

    const result = extractJSONFromText(responseText);
    const formatted = result.map((e: any) => ({
      interview_id: params.id,
      question: e.question,
      answer: e.answer,
      technical_score: e.technical_score,
      communication_score: e.communication_score,
      strengths: e.strengths,
      areas_of_improvement: e.areas_of_improvement,
      what_can_be_done_better: e.what_can_be_done_better,
      overall_feedback: e.overall_feedback,
    }));

    const { data: existingEvaluation } = await supabase
      .from("interviews")
      .update({
        status: "completed",
      })
      .eq("id", params.id);

    const { error: insertError } = await supabase
      .from("interview_evaluations")
      .insert(formatted);
    if (insertError) throw insertError;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in interview API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
