"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";


export default function ATSResumeChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };


  // Handle job description input
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(event.target.value);
  };


  // Handle Upload & API Call
  const handleUpload = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
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
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={handleDescriptionChange}
          />


          <Label htmlFor="resume-upload">Upload Your Resume (PDF)</Label>
          <Input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />


          {error && <Alert variant="destructive">{error}</Alert>}


          <Button
            onClick={handleUpload}
            disabled={!file || !jobDescription.trim() || loading}
          >
            {loading ? "Processing..." : "Upload & Analyze"}
          </Button>
        </CardContent>
      </Card>


      {score !== null && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">ATS Score</h2>
            <Progress value={score} />
            <p className="text-sm">
              Your resume matches <strong>{score}%</strong> of the job
              description.
            </p>
          </CardContent>
        </Card>
      )}


      {feedback && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">AI Feedback</h2>
            <p className="text-sm whitespace-pre-wrap">{feedback}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
