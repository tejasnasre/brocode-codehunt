"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import supabase from "@/lib/supabase";
import { FaUser, FaEnvelope, FaUniversity, FaBriefcase, FaSearch, FaInbox } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <div className="max-w-8xl mx-auto mt-10 p-6 flex gap-6 overflow-x-auto">
      {loading ? (
        <Card className="shadow-lg rounded-2xl p-6 bg-white border w-100 mx-auto">
          <CardHeader>
            {/* <Skeleton className="h-8 w-1/2" /> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-1/3" /> */}
            </div>
          </CardContent>
        </Card>
      ) : jobSeeker ? (
        <>
          <Card className="shadow-lg rounded-2xl p-6 bg-white border w-80 hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-2xl font-semibold text-gray-800">
      Job Seeker Profile
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4 text-gray-700">
      <p className="flex items-center gap-2 text-lg break-words">
        <FaUser className="text-indigo-500 flex-shrink-0" />
        <strong>Name:</strong> <span className="truncate">{jobSeeker.name}</span>
      </p>
      <p className="flex items-center gap-2 text-lg break-words">
        <FaEnvelope className="text-indigo-500 flex-shrink-0" />
        <strong>Email:</strong> <span className="truncate">{jobSeeker.email}</span>
      </p>
      <p className="flex items-center gap-2 text-lg break-words">
        <FaUniversity className="text-indigo-500 flex-shrink-0" />
        <strong>College:</strong> <span className="truncate">{jobSeeker.college}</span>
      </p>
      <p className="flex items-center gap-2 text-lg break-words">
        <FaBriefcase className="text-indigo-500 flex-shrink-0" />
        <strong>Job Type:</strong> <span className="truncate">{jobSeeker.job_type}</span>
      </p>
    </div>
  </CardContent>
</Card>

<Card className="shadow-lg rounded-2xl p-6 bg-white border w-80 hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-gray-800">Skills</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-wrap gap-2 items-center">
      {jobSeeker.skills.map((skill, index) => (
        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium truncate">
          {skill}
        </span>
      ))}
    </div>
  </CardContent>
</Card>

<Card className="shadow-lg rounded-2xl p-6 bg-white border w-80 hover:shadow-xl transition-shadow duration-300 flex items-center gap-4">
  <FaSearch className="text-indigo-500 text-3xl flex-shrink-0" />
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold truncate">Find Jobs</h3>
    <p className="text-gray-600 text-sm truncate">Search for jobs that match your skills.</p>
  </div>
</Card>

<Card className="shadow-lg rounded-2xl p-6 bg-white border w-80 hover:shadow-xl transition-shadow duration-300 flex items-center gap-4">
  <FaInbox className="text-indigo-500 text-3xl flex-shrink-0" />
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold truncate">Receive Mails</h3>
    <p className="text-gray-600 text-sm truncate">Get notified when recruiters contact you.</p>
  </div>
</Card>
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-8">
          No profile data found. 
          <a href="/dashboard/jobseeker/profile" className="text-blue-600">complete the profile</a>
        </div>
      )}
    </div>
  );
}
