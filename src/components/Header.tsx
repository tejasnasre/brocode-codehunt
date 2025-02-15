import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container bg-slate-100 flex items-center justify-between h-16 px-4 rounded-xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-primary rounded-lg" /> */}
            <span className="text-xl font-semibold">gethired.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-xl text-muted-foreground hover:text-primary">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-xl text-muted-foreground hover:text-primary">
              Browse Companies
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login">
          <Button variant="ghost" size="lg">
            Login
          </Button>
          </Link>
         <Link href="/auth/signup"> 
          <Button size="lg">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

