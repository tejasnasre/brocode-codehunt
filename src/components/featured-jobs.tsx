import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const featuredJobs = [
  {
    id: 1,
    title: 'Email Marketing Specialist',
    company: 'Revolut',
    location: 'Madrid, Spain',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/revolut.com',
    tags: ['Marketing', 'Email'],
  },
  {
    id: 2,
    title: 'Senior Brand Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/dropbox.com',
    tags: ['Design', 'Branding'],
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Slack',
    location: 'London, UK',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/slack.com',
    tags: ['Product', 'Management'],
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'Spotify',
    location: 'Stockholm, Sweden',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/spotify.com',
    tags: ['Frontend', 'React'],
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Gatos, US',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/netflix.com',
    tags: ['Data Science', 'Machine Learning'],
  },
  {
    id: 6,
    title: 'UX Researcher',
    company: 'Google',
    location: 'Mountain View, US',
    type: 'Full Time',
    logo: 'https://logo.clearbit.com/google.com',
    tags: ['UX', 'Research'],
  },
]

export function FeaturedJobs() {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Link href="/jobs" className="text-primary hover:underline font-semibold">
            Show all jobs →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group p-6 bg-white border-2 border-black rounded-lg hover:border-primary transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="mb-2">{job.type}</Badge>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
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

export function FeaturedJobsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-6 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-3" />
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