"use client";

import Image from "next/image";

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
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
        </div>
      </div>
    </section>
  );
}
