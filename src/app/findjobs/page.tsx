"use client";

import { useEffect, useState, useCallback } from "react";
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

interface Filters {
  jobTitle: string;
  jobLocation: string;
  salaryRange: [number, number];
  jobTypes: string[];
}

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    jobTitle: "",
    jobLocation: "",
    salaryRange: [10000, 100000],
    jobTypes: [],
  });

  // useCallback ensures that the fetchJobs function is not recreated on every render
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from("all_jobs").select("*");

      if (filters.jobTitle) {
        query = query.ilike("job_title", `%${filters.jobTitle}%`);
      }

      if (filters.jobLocation) {
        query = query.ilike("job_location", `%${filters.jobLocation}%`);
      }

      if (filters.salaryRange) {
        query = query
          .gte("job_minsalary", filters.salaryRange[0])
          .lte("job_maxsalary", filters.salaryRange[1]);
      }

      if (filters.jobTypes.length > 0) {
        query = query.in("job_type", filters.jobTypes);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
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
  }, [filters, toast]);

  useEffect(() => {
    fetchJobs(); // Call fetchJobs whenever filters change
  }, [filters, fetchJobs]); // Ensures fetchJobs only runs when filters change

  // Handling filter change in the Hero and JobFilters components
  const handleFilterChange = (filterData: Partial<Filters>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...filterData };
      if (JSON.stringify(prev) !== JSON.stringify(newFilters)) {
        return newFilters;
      }
      return prev; // Prevent unnecessary updates
    });
  };

  return (
    <div>
      <Hero onSearch={handleFilterChange} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <JobFilters onFilterChange={handleFilterChange} />
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
                No jobs found. Try adjusting your search filters.
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
