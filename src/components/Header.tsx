"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"

export function Header() {
  const { user, role, logout } = useAuthStore()

  return (
    <header className="border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-black"></div>
            <span className="text-2xl font-bold">gethired.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {role === "jobseeker" && (
              <Link href="/findjobs" className="text-primary font-semibold hover:underline">
                Find Jobs
              </Link>
            )}
            {role === "recruiter" && (
              <Link href="/add-job" className="text-muted-foreground font-semibold hover:underline">
                Add Jobs
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={
                  role === "recruiter"
                    ? "/dashboard/recruiter"
                    : "/dashboard/jobseeker"
                }
              >
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link
                href={
                  role === "jobseeker"
                    ? "/dashboard/jobseeker/profile"
                    : "/dashboard/recruiter/profile"
                }
              >
                <Button variant="ghost">Profile</Button>
              </Link>

              <Button
                onClick={async () => {
                  await logout()
                  window.location.href = "/"
                }}
                variant="destructive"
                className="font-semibold border-2 border-black hover:bg-red-600 transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="font-semibold border-2 border-black hover:bg-primary hover:text-white transition-colors">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="font-semibold border-2 border-black bg-primary text-white hover:bg-primary-dark transition-colors">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}