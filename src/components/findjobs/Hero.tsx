"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFilters {
  jobTitle: string;
  jobLocation: string;
}

export function Hero({ onSearch }: { onSearch: (filters: SearchFilters) => void }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handleSearch = () => {
    onSearch({ jobTitle, jobLocation });
  };

  return (
    <section className="pt-32 pb-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1629905679177-4c4e2623654f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvYiUyMHNlZWtlcnN8ZW58MHx8MHx8fDA%3D&q=80&w=800"
              alt="Job seekers"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover
              <br />
              more than
              <br />
              <span className="text-primary">5000+ Jobs</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Great platform for job seekers searching for new career heights and passionate about startups.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-background py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find your{" "}
          <span className="relative">
            dream job
            <div className="absolute bottom-1 left-0 w-full h-2 bg-blue-400/30 -z-10"></div>
          </span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-2 p-2 bg-white rounded-lg shadow-sm">
            <Input
              type="text"
              placeholder="Job title or keyword"
              className="border-0 focus-visible:ring-0"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Location"
              className="border-0 focus-visible:ring-0"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
            <Button size="lg" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Popular: <span className="font-medium">UI Designer, UX Researcher, Android, Admin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
