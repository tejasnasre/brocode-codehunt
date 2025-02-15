"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Roles that can access the route
  children: ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, role, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/auth/login"); // Redirect if not logged in
      } else if (!allowedRoles.includes(role || "")) {
        router.push("/unauthorized"); // Redirect if role is not allowed
      }
    }
  }, [user, role, isLoading, router, allowedRoles]);

  if (isLoading || !user || !allowedRoles.includes(role || "")) {
    return <p>Loading...</p>; // Show loading while checking
  }

  return <>{children}</>;
}
