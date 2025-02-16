import { Suspense } from 'react'
import { Hero } from "@/components/hero";
import { CompanyLogos } from "@/components/company-logos";
import { Categories } from "@/components/categories";
import { PostingCTA } from "@/components/posting-cta";
import { FeaturedJobs,FeaturedJobsSkeleton } from "@/components/featured-jobs";
import { LatestJobs ,LatestJobsSkeleton} from "@/components/latest-jobs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CompanyLogos />
      <Categories />
      <PostingCTA />
      <Suspense fallback={<FeaturedJobsSkeleton />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<LatestJobsSkeleton />}>
        <LatestJobs />
      </Suspense>
      
    </main>
  );
}
