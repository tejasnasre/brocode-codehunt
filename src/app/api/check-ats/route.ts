import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatMistralAI } from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod"; // ✅ Input validation
import { promises as fs } from "fs";
import path from "path";
import os from "os";

// ✅ Initialize AI Model
const mistral = new ChatMistralAI({ apiKey: process.env.MISTRAL_API_KEY });

// ✅ Zod schema for validation
const formSchema = z.object({
  file: z.custom<Blob>((val) => val instanceof Blob, "No file uploaded"),

  jobDescription: z
    .string()
    .min(10, { message: "Job description is too short" }),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // ✅ Validate input using Zod
    const validatedData = formSchema.safeParse({
      file: formData.get("file"),
      jobDescription: formData.get("jobDescription"),
    });

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.format() },
        { status: 400 }
      );
    }

    const { file, jobDescription } = validatedData.data;
    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, (file as File).name);

    try {
      await fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer()));

      const loader = new PDFLoader(tempPath);
      const docs = await loader.load();
      let resumeText = docs.map((doc) => doc.pageContent).join("\n");

      // ✅ Use Text Splitter to clean large PDFs
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const splitDocs = await splitter.splitDocuments(docs);
      resumeText = splitDocs.map((doc) => doc.pageContent).join("\n");

      // ✅ Clean and process text
      resumeText = preprocessText(resumeText);

      const atsScore = calculateATSScore(resumeText, jobDescription);
      const feedback = await generateAIInsights(resumeText, jobDescription);

      return NextResponse.json({
        atsScore,
        feedback,
        extractedText: resumeText,
      });
    } finally {
      await fs.unlink(tempPath);
    }
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}

// ✅ Preprocess text
function preprocessText(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// ✅ Calculate ATS Score
function calculateATSScore(resumeText: string, jobDescription: string): number {
  const stopwords = new Set([
    "we",
    "are",
    "for",
    "with",
    "and",
    "the",
    "is",
    "on",
    "a",
    "to",
    "of",
  ]);
  const jobWords = jobDescription.toLowerCase().match(/\b\w+\b/g) || [];
  const resumeWords: string[] =
    resumeText.toLowerCase().match(/\b\w+\b/g) || [];

  const keywordCounts: Record<string, number> = {};
  jobWords.forEach((word) => {
    if (!stopwords.has(word)) {
      keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    }
  });

  let matchCount = 0,
    totalWeight = 0;
  for (const [keyword, weight] of Object.entries(keywordCounts)) {
    if (resumeWords.includes(keyword)) matchCount += weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? Math.round((matchCount / totalWeight) * 100) : 0;
}

// ✅ AI Feedback Generation
async function generateAIInsights(
  resumeText: string,
  jobDescription: string
): Promise<string> {
  try {
    const messages = [
      new SystemMessage(
        "You are an ATS resume reviewer. Provide constructive feedback on missing skills."
      ),
      new HumanMessage(
        `Resume: ${resumeText}\n\nJob Description: ${jobDescription}`
      ),
    ];

    const response = await mistral.call(messages);
    return response.content as string;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return "Could not generate AI feedback. Please try again later.";
  }
}
