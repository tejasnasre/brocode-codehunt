"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const { user, role, logout } = useAuthStore();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <span className="text-xl font-semibold">JobHuntly</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {role === "jobseeker" && (
              <Link href="/findjobs" className="text-primary">
                Find Jobs
              </Link>
            )}

            {role === "recruiter" && (
              <Link href="/add-job" className="text-muted-foreground">
                Add Jobs
              </Link>
            )}
            {role === "jobseeker" && (
              <Link href="/companies" className="text-muted-foreground">
                Browse Companies
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
              <Button
                onClick={async () => {
                  await logout();
                  window.location.href = "/"; // Ensure full refresh on logout
                }}
                variant="destructive"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
