/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

export function Hero() {
  function handlePopularSearch(job: string): void {
    console.log(`Searching for popular job: ${job}`);
  }

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

    <section className="pt-32 pb-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1629905679177-4c4e2623654f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvYiUyMHNlZWtlcnN8ZW58MHx8MHx8fDA%3D&q=80&w=800"
              alt="Job seekers"
              fill
              className="object-cover rounded-lg"
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
              Great platform for job seekers searching for new career heights
              and passionate about startups.
            </p>


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
                      className="hover:text-primary font-medium"
                    >
                      {job}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
