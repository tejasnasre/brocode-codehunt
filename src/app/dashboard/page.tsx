"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useAuthStore();

  useEffect(() => {
    if (role === "recruiter") {
      router.replace("/dashboard/recruiter");
    } else if (role === "jobseeker") {
      router.replace("/dashboard/jobseeker/profile");
    }
  }, [role, router]);

  return <p>Redirecting to the appropriate dashboard...</p>;
}
