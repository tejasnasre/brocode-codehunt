"use client";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const handlePopularSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement prefill logic if needed
  };

  return (
    <section className="pt-32 pb-16">
      <div className="container px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover
            <br />
            more than
            <br />
            <span className="text-primary">5000+ Jobs</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Great platform for job seekers searching for new career heights and passionate about startups.
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
              {["UI Designer", "UX Researcher", "Android", "Admin"].map((job) => (
                <button
                  key={job}
                  type="button"
                  onClick={() => handlePopularSearch(job)}
                  className="hover:text-primary"
                >
                  {job},
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
