// page.tsx
"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/findjobs/Hero";
import { JobFilters } from "@/components/findjobs/JobFilter";
import { JobCard } from "@/components/findjobs/JobCard";
import supabase from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: bigint;
  new_id: string;
  job_title: string;
  job_description: string;
  company_name: string;
  company_logo: string;
  job_location: string;
  job_type: string;
  job_minsalary: number;
  job_maxsalary: number;
  created_at: string;
  recruiter_id?: string;
}

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase
          .from("all_jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setJobs(data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast({
          title: "Error",
          description: "Failed to fetch jobs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [toast]);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <JobFilters />
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Jobs</h2>
              <p className="text-muted-foreground">
                Showing {jobs.length} results
              </p>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No jobs found. Be the first to post a job!
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.new_id}
                  id={job.new_id}
                  title={job.job_title}
                  description={job.job_description}
                  company={job.company_name}
                  location={job.job_location}
                  type={job.job_type}
                  logo={job.company_logo}
                  salaryMin={job.job_minsalary}
                  salaryMax={job.job_maxsalary}
                  createdAt={new Date(job.created_at)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
