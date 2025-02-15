// app/jobs/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
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
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="text-muted-foreground">
          The job you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={
                  job.company_logo ||
                  "https://thumbs.dreamstime.com/b/business-building-illustration-green-recreation-park-zone-downtown-office-board-big-central-entrance-trees-near-urban-108106431.jpg"
                }
                alt={job.company_name}
                fill
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://thumbs.dreamstime.com/b/business-building-illustration-green-recreation-park-zone-downtown-office-board-big-central-entrance-trees-near-urban-108106431.jpg";
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{job.job_title}</h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{job.company_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.job_location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mb-2" />
                  <div className="text-sm font-medium">Job Type</div>
                  <div className="text-muted-foreground">{job.job_type}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary mb-2" />
                  <div className="text-sm font-medium">Salary Range</div>
                  <div className="text-muted-foreground">
                    ${job.job_minsalary.toLocaleString()} - $
                    {job.job_maxsalary.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Globe className="w-5 h-5 text-primary mb-2" />
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-muted-foreground">
                    {job.job_location}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary mb-2" />
                  <div className="text-sm font-medium">Department</div>
                  <div className="text-muted-foreground">Engineering</div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{job.job_description}</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">About Company</h2>
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-primary" />
                <span className="font-medium">{job.company_name}</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Leading technology company focused on innovation and growth.
              </p>
              <Button className="w-full">Visit Company Profile</Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Apply</h2>
              <p className="text-muted-foreground mb-4">
                Ready to apply for this position? Click below to start your
                application.
              </p>
              <Button className="w-full">Apply Now</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            <Skeleton className="w-24 h-24 rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6">
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-10 w-full mt-4" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
