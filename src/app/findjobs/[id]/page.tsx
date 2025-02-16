"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Share2,
  BookmarkPlus,
  Clock,
  Globe,
  Building,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import ATSResumeChecker from "@/components/CheckResume";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

interface JobDetails {
  id: string;
  job_title: string;
  job_description: string;
  company_name: string;
  company_logo: string;
  job_location: string;
  job_type: string;
  job_minsalary: number;
  job_maxsalary: number;
  created_at: string;
}

export default function JobDetailsPage() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const params = useParams();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const { data, error } = await supabase
          .from("all_jobs")
          .select("*")
          .eq("new_id", params.id)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchJobDetails();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Job Not Found</h1>
        <p className="text-xl text-gray-600">
          The job you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  async function jobapply() {
    if (!user) {
      console.error("User is not logged in");
      return;
    }

    if (!job) {
      console.error("Job details are not available");
      return;
    }

    // Check if the user has already applied for this job
    const { data: existingApplication, error: fetchError } = await supabase
      .from("application")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("job_id", job.id)
      .single(); // Use .single() to fetch a single row, since each user should only apply once for a job

    if (fetchError) {
      console.error("Error checking existing application:", fetchError);
      return;
    }

    if (existingApplication) {
      toast({
        title: "Application already exists",
        description: "You have already applied for this job.",
      });

      return;
    }

    // Proceed to insert the new application if no existing application is found
    const { data, error } = await supabase
      .from("application")
      .insert([{ user_id: user.id, job_id: job.id, status: "applied" }])
      .select();

    if (error) {
      console.error("Error applying for job:", error);
    } else {
      console.log("Job application successful:", data);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white border-b-4 border-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl font-bold text-black border-4 border-white">
              {job.company_name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-white">
                    {job.job_title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-lg text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-white" />
                      <span>{job.company_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-white" />
                      <span>{job.job_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-white" />
                      <span>
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-black"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-black"
                  >
                    <BookmarkPlus className="w-5 h-5 mr-2" />
                    Save
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-black border-2 border-white hover:bg-gray-200 transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    onClick={jobapply}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold mb-6 text-black">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gray-100 rounded-lg border-2 border-black">
                  <Clock className="w-6 h-6 text-black mb-2" />
                  <div className="text-lg font-medium">Job Type</div>
                  <div className="text-gray-600">{job.job_type}</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg border-2 border-black">
                  <DollarSign className="w-6 h-6 text-black mb-2" />
                  <div className="text-lg font-medium">Salary Range</div>
                  <div className="text-gray-600">
                    ${job.job_minsalary.toLocaleString()} - $
                    {job.job_maxsalary.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg border-2 border-black">
                  <Globe className="w-6 h-6 text-black mb-2" />
                  <div className="text-lg font-medium">Location</div>
                  <div className="text-gray-600">{job.job_location}</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg border-2 border-black">
                  <Users className="w-6 h-6 text-black mb-2" />
                  <div className="text-lg font-medium">Department</div>
                  <div className="text-gray-600">Engineering</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-black">
                Job Description
              </h2>
              <div className="prose max-w-none text-lg">
                <p className="whitespace-pre-line">{job.job_description}</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-bold mb-4 text-black">
                About Company
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-black" />
                <span className="font-medium text-lg">{job.company_name}</span>
              </div>
              <p className="text-gray-600 mb-4 text-lg">
                Leading technology company focused on innovation and growth.
              </p>
              <Button className="w-full text-lg bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Visit Company Profile
              </Button>
            </Card>

            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-bold mb-4 text-black">Quick Apply</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Ready to apply for this position? Click below to start your
                application.
              </p>
              <Button
                onClick={jobapply}
                className="w-full text-lg bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Apply Now
              </Button>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <ATSResumeChecker jobDescription={job.job_description} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black border-b-4 border-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            <Skeleton className="w-32 h-32 rounded-lg border-4 border-white bg-gray-300" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-10 w-2/3 bg-gray-300" />
              <div className="flex gap-4">
                <Skeleton className="h-6 w-40 bg-gray-300" />
                <Skeleton className="h-6 w-40 bg-gray-300" />
                <Skeleton className="h-6 w-40 bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Skeleton className="h-10 w-48 mb-6 bg-gray-300" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full bg-gray-300" />
                <Skeleton className="h-6 w-full bg-gray-300" />
                <Skeleton className="h-6 w-3/4 bg-gray-300" />
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Skeleton className="h-8 w-40 mb-4 bg-gray-300" />
              <Skeleton className="h-6 w-full bg-gray-300" />
              <Skeleton className="h-6 w-full mt-2 bg-gray-300" />
              <Skeleton className="h-12 w-full mt-4 bg-gray-300" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
