"use client";

import JobSeekerForm from "@/components/JobSeekerForm";

export default function JobSeekerProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Job Seeker Profile</h1>
      <JobSeekerForm />
    </div>
  );
}
