'use client'
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const featuredJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=100",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=100",
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=400",
    tags: ["Design", "Business"],
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Slack",
    location: "London, UK",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=100",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=400",
    tags: ["Product", "Technology"],
  },
]

export function FeaturedJobs() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref} className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 data-animate className="text-2xl font-bold">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Link
            data-animate
            style={{ "--delay": 2 } as React.CSSProperties}
            href="/jobs"
            className="text-primary hover:underline"
          >
            Show all jobs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              data-animate
              style={{ "--delay": index + 4 } as React.CSSProperties}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image
                  src={job.image || "/placeholder.svg"}
                  alt={job.company}
                  fill
                  className="object-cover brightness-[0.2] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative p-6 text-white h-full min-h-[320px] flex flex-col">
                <div className="flex items-start gap-4 mb-auto">
                  <Image
                    src={job.logo || "/placeholder.svg"}
                    alt={job.company}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary">{job.type}</Badge>
                    <h3 className="font-semibold mt-2 text-xl group-hover:text-primary-foreground transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {job.company} • {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {job.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/10 text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

