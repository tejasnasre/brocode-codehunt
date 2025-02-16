/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";


export function Hero() {
  return (

    <section className="pt-32 pb-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1629905679177-4c4e2623654f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvYiUyMHNlZWtlcnN8ZW58MHx8MHx8fDA%3D&q=80&w=800"
            alt="Job seekers"
            fill
            className="object-cover"
          />
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

    <section className="pt-24 pb-16 flex justify-center items-center min-h-screen">
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


            {/* Uncomment below if needed */}
            {/* Search Form */}
            {/* <form className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Job title or keyword" className="pl-10 border-2 border-black" />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Florence, Italy" className="pl-10 border-2 border-black" />
              </div>
              <Button type="submit" className="shrink-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Search my job
              </Button>
            </form> */}

            {/* Popular Searches */}
            {/* <div className="flex gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <div className="space-x-2">
                {["UI Designer", "UX Researcher", "Android", "Admin"].map((job) => (

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
                    {job},
                  </button>
                ))}
              </div>
            </div> */}

                    className="hover:text-primary"
                  >
                    {job},
                  </button>
                )
              )}
            </div>

          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
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
