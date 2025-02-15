import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <div className="bg-background py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Find your{" "}
        <span className="relative">
          dream job
          <div className="absolute bottom-1 left-0 w-full h-2 bg-blue-400/30 -z-10"></div>
        </span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Find your next career at companies like HubSpot, Nike, and Dropbox
      </p>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-2 p-2 bg-white rounded-lg shadow-sm">
          <Input
            type="text"
            placeholder="Job title or keyword"
            className="border-0 focus-visible:ring-0"
          />
          <Input
            type="text"
            placeholder="Florence, Italy"
            className="border-0 focus-visible:ring-0"
          />
          <Button size="lg">Search</Button>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Popular: UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
    </div>
  );
}
