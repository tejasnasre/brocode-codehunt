'use client'
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const latestJobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Netflix",
    location: "Paris, France",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=100",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=100",
    tags: ["Design", "Marketing"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Spotify",
    location: "Remote",
    type: "Full Time",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvdGlmeSUyMGljb258ZW58MHx8MHx8fDA%3D&w=100",
    tags: ["Development", "React"],
  },
]

export function LatestJobs() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref} className="py-16 bg-slate-50">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 data-animate className="text-2xl font-bold">
            Latest <span className="text-primary">jobs</span> open
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
        <div className="space-y-4">
          {latestJobs.map((job, index) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              data-animate
              style={{ "--delay": index + 4 } as React.CSSProperties}
              className="block p-6 bg-white border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{job.title}</h3>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-muted">
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

