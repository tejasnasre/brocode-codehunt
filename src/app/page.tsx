import { Header } from "@/components/Header";
import { Hero } from "@/components/hero";
import { CompanyLogos } from "@/components/company-logos";
import { Categories } from "@/components/categories";
import { PostingCTA } from "@/components/posting-cta";
import { FeaturedJobs } from "@/components/featured-jobs";
import { LatestJobs } from "@/components/latest-jobs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CompanyLogos />
      <Categories />
      <PostingCTA />
      <FeaturedJobs />
      <LatestJobs />
    </main>
  );
}
