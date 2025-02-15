import Image from "next/image";
import { Button } from "@/components/ui/button";

export function PostingCTA() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="mb-6 text-primary-foreground/90">
              Start posting jobs for only <strong>$95</strong>.
            </p>
            <Button variant="secondary" size="lg" aria-label="Post a job now">
              Post a Job
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-lg mx-auto h-[300px] lg:h-[400px]">
            <Image 
              src="/placeholder.svg" 
              alt="Dashboard Preview" 
              fill 
              className="object-contain"
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
