import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const latestJobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Netflix",
    location: "Paris, France",
    type: "Full Time",
    logo: "/placeholder.svg",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full Time",
    logo: "/placeholder.svg",
    tags: ["Design", "Marketing"],
  },
  // Add more latest jobs...
];

export function LatestJobs() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Latest <span className="text-primary">jobs</span> open
          </h2>
          <Link href="/jobs" className="text-primary hover:underline">
            Show all jobs →
          </Link>
        </div>

        {/* Job List */}
        <div role="list" className="space-y-4">
          {latestJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              role="listitem"
              className="block p-6 bg-white border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Job Logo with Accessible Alt Text */}
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={`${job.company} Logo`}
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

                {/* Job Tags with Wrap Support */}
                <div className="flex flex-wrap gap-2">
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
  );
}
