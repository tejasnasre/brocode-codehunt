/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

export function Hero() {
  const handlePopularSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement prefill logic if needed
  };

  return (
    <section
      className="pt-24 pb-16 flex justify-center items-center min-h-screen"
      style={{ marginTop: "-80px" }}
    >
      <div className="container px-4 flex flex-col md:flex-row items-center">
        <div className="max-w-3xl md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover
            <br />
            more than
            <br />
            <span className="text-primary">5000+ Jobs</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Great platform for job seekers searching for new career heights and
            passionate about startups.
          </p>

          {/* Search Form */}
          <form className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Job title or keyword" className="pl-10" />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Florence, Italy" className="pl-10" />
            </div>
            <Button type="submit" className="shrink-0">
              Search my job
            </Button>
          </form>

          {/* Popular Searches */}
          <div className="mt-4 flex gap-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            <div className="space-x-2">
              {["UI Designer", "UX Researcher", "Android", "Admin"].map(
                (job) => (
                  <button
                    key={job}
                    type="button"
                    onClick={() => handlePopularSearch(job)}
                    className="hover:text-primary"
                  >
                    {job},
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="/assets/asset 2.png"
            alt="Job search illustration"
            className="w-3/4 h-auto"
          />
        </div>
      </div>
    </section>
  );
}
