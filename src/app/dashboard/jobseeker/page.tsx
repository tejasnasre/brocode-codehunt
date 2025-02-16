"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { 
  FaUser, FaEnvelope, FaUniversity, FaBriefcase, FaSearch, 
  FaInbox, FaStar, FaFileAlt, FaUserEdit, FaBullseye 
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

type JobSeekerProfile = {
  name: string;
  email: string;
  college: string;
  skills: string[];
  job_type: string;
} | null;

export default function JobSeekerDashboard() {
  const [jobSeeker, setJobSeeker] = useState<JobSeekerProfile>(null);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    return (
      <div className="max-w-7xl mx-auto mt-10 p-6">
        <div className="mb-6">
        Error
                </div>
              
        
      </div>
    );
  }

  if (!jobSeeker) {
    return (
      <div className="max-w-7xl mx-auto mt-10 p-6">
        <Card className="shadow-lg rounded-lg border-2 border-indigo-200">
          <CardHeader className="bg-indigo-50 border-b border-indigo-200">
            <CardTitle className="text-2xl font-bold text-indigo-800">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-indigo-600">
              We need some information to get you started
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-6 py-8">
              <FaUserEdit className="text-indigo-400 text-7xl mx-auto" />
              <h2 className="text-xl font-semibold text-gray-700">No profile data found</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Complete your profile to help recruiters find you and match you with relevant job opportunities.
              </p>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-md"
                onClick={() => router.push("/dashboard/jobseeker/profile")}
              >
                Complete My Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const quickActions = [
    {
      icon: <FaSearch className="text-indigo-500 text-2xl" />,
      title: "Find Jobs",
      description: "Search for jobs that match your skills and preferences",
      link: "/jobs/search"
    },
    {
      icon: <FaStar className="text-indigo-500 text-2xl" />,
      title: "Saved Jobs",
      description: "View and manage your saved job listings",
      link: "/jobs/saved"
    },
    {
      icon: <FaFileAlt className="text-indigo-500 text-2xl" />,
      title: "Applications",
      description: "Track your submitted job applications",
      link: "/applications"
    },
    {
      icon: <FaInbox className="text-indigo-500 text-2xl" />,
      title: "Messages",
      description: "View messages from recruiters and companies",
      link: "/messages"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto mt-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {jobSeeker.name}!</h1>
        <p className="text-gray-600">Manage your profile, explore job opportunities, and track your applications.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Profile information */}
        <div className="space-y-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUser className="text-indigo-500" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your personal and academic details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <FaUser className="text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500">Name</p>
                    <p className="text-lg">{jobSeeker.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500">Email</p>
                    <p className="text-lg break-all">{jobSeeker.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaUniversity className="text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500">College</p>
                    <p className="text-lg">{jobSeeker.college}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaBriefcase className="text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500">Job Type</p>
                    <p className="text-lg">{jobSeeker.job_type}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline"
                  className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                  onClick={() => router.push("/dashboard/jobseeker/profile/edit")}
                >
                  <FaUserEdit className="mr-2" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaBullseye className="text-indigo-500" />
                Skills
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your professional competencies
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {jobSeeker.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline"
                  className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                  onClick={() => router.push("/dashboard/jobseeker/skills/edit")}
                >
                  <FaUserEdit className="mr-2" /> Update Skills
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Quick actions and stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600">
                Frequently used features to help you navigate
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link href={action.link} key={index}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-indigo-100 cursor-pointer h-full">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-3 rounded-full bg-indigo-50">
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Job Search Activity
              </CardTitle>
              <CardDescription className="text-gray-600">
                Overview of your job search progress
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border-2 border-indigo-100 bg-indigo-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-600 text-sm mb-1">Applications</p>
                    <p className="text-3xl font-bold text-indigo-700">0</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-indigo-100 bg-indigo-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-600 text-sm mb-1">Saved Jobs</p>
                    <p className="text-3xl font-bold text-indigo-700">0</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-indigo-100 bg-indigo-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-gray-600 text-sm mb-1">Messages</p>
                    <p className="text-3xl font-bold text-indigo-700">0</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => router.push("/jobs/search")}
                >
                  <FaSearch className="mr-2" /> Start Exploring Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}