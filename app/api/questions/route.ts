import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

async function extractResumeContent(resumeUrl: string) {
  console.log(resumeUrl);

  try {
    // Fetch the file
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);
    const fileExtension = resumeUrl.split(".").pop()?.toLowerCase();

    // if (fileExtension === "pdf") {
    //   const data = await pdfParse(buffer);
    //   return data.text;
    // }
    if (fileExtension === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      throw new Error(
        "Unsupported file format. Only PDF and DOCX are supported."
      );
    }
  } catch (error) {
    console.error("Error extracting resume content:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ message: "API is working" });
  } catch (error) {
    console.error("Error in GET /api/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { jobDescription, resumeUrl } = body;
    console.log("Received request with resumeUrl:", resumeUrl);

    if (!jobDescription || !resumeUrl) {
      return NextResponse.json(
        { error: "Job description and resume URL are required" },
        { status: 400 }
      );
    }

    // Extract resume content
    console.log("Extracting resume content...");
    const resumeContent = await extractResumeContent(resumeUrl);
    console.log("Resume content extracted successfully");

    const prompt = `You are a senior hiring manager and domain expert tasked with evaluating job candidates. Given a job description and a candidate's resume, generate insightful interview questions that assess:

The candidate's technical proficiency (based on tools, frameworks, or methodologies in the resume vs. job requirements).

The candidate's core competencies (project experience, decision-making, problem-solving).

Behavioral and soft skill aspects (teamwork, leadership, adaptability, etc.).

Gaps, ambiguities, or impressive highlights worth exploring from the resume.

📄 Input Job Description: ${jobDescription}

📄 Input Resume Content: ${resumeContent}

🎯 Output Format (JSON): Return a single array of questions (with a minimum of 5 and a maximum of 8 questions), structured as follows:

{
  "questions": [
    "Question 1 about a specific technology or technical decision...",
    "Question 2...",
    "Question 3...",
    "Question 4...",
    "Question 5..."
  ]
}
⚠️ Important:

Do not invent any data.

Only base the questions on the actual content of the resume and the job description.

Include questions to explore gaps, ambiguities, or impressive highlights in the resume if needed.`;

    console.log("Making API call to generate questions...");
    const url = "https://52nvm81yvqinq8-80.proxy.runpod.net/api/generate";

    const res = await axios.post(url, {
      model: "deepseek-r1:8b",
      prompt: prompt,
      stream: false,
    });

    console.log("API response received");
    // Extract JSON from the response
    const responseText = res.data.response;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from response");
    }

    const questions = JSON.parse(jsonMatch[0]);
    return NextResponse.json(questions.questions);
  } catch (error) {
    console.error("Error in POST /api/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
