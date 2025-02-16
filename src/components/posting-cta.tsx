import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function PostingCTA() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start posting
              <br />
              jobs today
            </h2>
            <p className="mb-8 text-primary-foreground/80 text-lg">
              Start posting jobs for only $95.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
             Post a job
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
              alt="Dashboard Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}