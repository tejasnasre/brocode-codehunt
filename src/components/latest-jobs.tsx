import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const latestJobs = [
  {
    id: 1,
    title: 'Social Media Manager',
    company: 'Netflix',
    location: 'Paris, France',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/netflix.com',
    tags: ['Marketing', 'Social Media'],
  },
  {
    id: 2,
    title: 'Senior UI Designer',
    company: 'Airbnb',
    location: 'San Francisco, USA',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/airbnb.com',
    tags: ['Design', 'UI/UX'],
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'Spotify',
    location: 'Stockholm, Sweden',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/spotify.com',
    tags: ['Backend', 'Node.js'],
  },
]

export function LatestJobs() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Latest <span className="text-primary">jobs</span> open
          </h2>
          <Link href="/jobs" className="text-primary hover:underline font-semibold">
            Show all jobs →
          </Link>
        </div>
        <div className="space-y-4">
          {latestJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block p-6 bg-white border-2 border-black rounded-lg hover:border-primary transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
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
  )
}

export function LatestJobsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}