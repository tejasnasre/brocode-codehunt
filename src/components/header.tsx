import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 supports-[backdrop-blur]:backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg" />
            <span className="text-xl font-semibold">JobHuntly</span>
          </Link>
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            <Link
              href="/jobs"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Browse Companies
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
