import { Hero } from "@/components/hero";
// import { CompanyLogos } from "@/components/company-logos";
import { Categories } from "@/components/categories";
import { FeaturedJobs } from "@/components/featured-jobs";
import { LatestJobs } from "@/components/latest-jobs";
import { PostingCTA } from "@/components/posting-cta";
import { CompanyLogos } from "@/components/ui/company-logos";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CompanyLogos />
      <Categories />
      <PostingCTA />
      <FeaturedJobs />
      <LatestJobs />
    </main>
  );
}
