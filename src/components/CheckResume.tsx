"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, AlertCircle } from "lucide-react";

interface ATSResumeCheckerProps {
  jobDescription: string;
}

export default function ATSResumeChecker({
  jobDescription: initialJobDescription,
}: ATSResumeCheckerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription] = useState<string>(initialJobDescription);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume and ensure there's a job description.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/check-ats", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setScore(data.atsScore);
      setFeedback(data.feedback);
    } catch (error) {
      setError("Failed to process your resume. Please try again.");
      console.error("Upload failed", error);
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          ATS Resume Checker
        </h2>
        <div className="space-y-6">
          <Label htmlFor="resume-upload" className="text-lg font-semibold">
            Upload Your Resume (PDF)
          </Label>
          <div className="flex items-center space-x-4">
            <Input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="flex-grow border-2 border-black file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || !jobDescription.trim() || loading}
              className="bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="border-2 border-black">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {score !== null && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">ATS Score</h3>
            <Progress value={score} className="h-4 border-2 border-black" />
            <p className="text-lg">
              Your resume matches <strong>{score}%</strong> of the job
              description.
            </p>
          </div>
        )}

        {feedback && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">AI Feedback</h3>
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-black">
              <p className="text-lg whitespace-pre-wrap">{feedback}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
