"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function JobseekerDashboard() {
  const router = useRouter();
  const { role } = useAuthStore();

  useEffect(() => {
    if (role !== "jobseeker") {
      router.replace("/dashboard");
    }
  }, [role]);

  return <h1>Jobseeker Dashboard</h1>;
}
