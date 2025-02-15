import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <span className="text-xl font-semibold">JobHuntly</span>
          </div>
          <p className="text-muted-foreground">
            Great platform for job seeker that passionate about startups. Find
            your dream job easier.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Companies</li>
            <li>Pricing</li>
            <li>Terms</li>
            <li>Advice</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Help Docs</li>
            <li>Guide</li>
            <li>Updates</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get job notifications</h3>
          <p className="text-muted-foreground mb-4">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div className="space-y-2">
            <Input placeholder="Email Address" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
