import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const featuredJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    logo: "/placeholder.svg",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    type: "Full Time",
    logo: "/placeholder.svg",
    tags: ["Design", "Business"],
  },
  // Add more featured jobs...
];

export function FeaturedJobs() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Link href="/jobs" className="text-primary hover:underline">
            Show all jobs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group p-6 bg-white border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={40}
                  height={40}
                  className="rounded-lg"
                  priority={job.id === 1} // ✅ First job loads first to prevent hydration issues
                  loading={job.id === 1 ? "eager" : "lazy"} // ✅ Prevents laggy rendering
                />
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary">{job.type}</Badge>
                  <h3 className="font-semibold mt-2 group-hover:text-primary">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {job.tags.map((tag) => (
                      <span
                        key={`${job.id}-${tag}`} // ✅ Ensures unique key for each tag
                        className="px-2 py-1 text-xs rounded-full bg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
