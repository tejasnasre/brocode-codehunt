"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import supabase from "@/lib/supabase";

export default function JobSeekerDashboard() {

  type JobSeekerProfile = {
    name: string;
    email: string;
    college: string;
    skills: string[];
    job_type: string;
  } | null;
  
  const [jobSeeker, setJobSeeker] = useState<JobSeekerProfile>(null);
  
  const { user } = useAuthStore();
  // const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("job_seekers")
        .select("name, email, college, skills, job_type")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching job seeker profile:", error);
      } else {
        setJobSeeker(data);
      }
      setLoading(false);
    };

    fetchJobSeekerProfile();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!jobSeeker) {
    return <div className="text-center mt-8">No profile data found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Job Seeker Profile</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {jobSeeker.name}</p>
        <p><strong>Email:</strong> {jobSeeker.email}</p>
        <p><strong>College:</strong> {jobSeeker.college}</p>
        <p><strong>Skills:</strong> {jobSeeker.skills.join(", ")}</p>
        <p><strong>Job Type:</strong> {jobSeeker.job_type}</p>
      </div>
    </div>
  );
}
