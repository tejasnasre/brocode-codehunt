import { Hero } from "@/components/findjobs/Hero";
import { JobFilters } from "@/components/findjobs/JobFilter";
import { JobCard } from "@/components/findjobs/JobCard";

export default function Home() {
  const jobs = [
    {
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      logo: "/placeholder.svg?height=48&width=48",
      applied: 5,
      capacity: 10,
    },
    // Add more job listings as needed
  ];

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <JobFilters />
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Jobs</h2>
              <p className="text-muted-foreground">Showing 73 results</p>
            </div>
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
