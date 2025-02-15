"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import type { ComponentType } from "react";

type UserRole = "job_seeker" | "recruiter";

// Higher-Order Component (HOC) for role-based route protection
export const withAuth = <P extends object>(
  Component: ComponentType<P>,
  allowedRoles: UserRole[]
) => {
  return function ProtectedComponent() {
    const { user, role } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        // Redirect to login if not authenticated
        router.push("/auth/login");
      } else if (!role) {
        // Fetch role from Zustand store
    
      } else if (!allowedRoles.includes(role)) {
        // Redirect if role is not allowed
        router.push("/unauthorized");
      }
    }, [user, role, router]);

    if (!user || !role || !allowedRoles.includes(role)) return null;

    return ;
  };
};
