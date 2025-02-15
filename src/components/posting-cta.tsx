'use client'
import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function PostingCTA() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref} className="py-16 bg-primary text-primary-foreground overflow-hidden">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 data-animate className="text-3xl md:text-4xl font-bold mb-4">
              Start posting
              <br />
              jobs today
            </h2>
            <p data-animate style={{ "--delay": 2 } as React.CSSProperties} className="mb-6 text-primary-foreground/80">
              Start posting jobs for only $95.
            </p>
            <Button data-animate style={{ "--delay": 4 } as React.CSSProperties} variant="secondary" size="lg">
              Sign Up For Free
            </Button>
          </div>
          <div data-animate style={{ "--delay": 6 } as React.CSSProperties} className="relative h-[300px] lg:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
              alt="Dashboard Preview"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

