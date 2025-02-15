"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RecruiterDashboard() {
  const router = useRouter();
  const { role } = useAuthStore();

  useEffect(() => {
    if (role !== "recruiter") {
      router.replace("/dashboard");
    }
  }, [role]);

  return <h1>Recruiter Dashboard</h1>;
}
