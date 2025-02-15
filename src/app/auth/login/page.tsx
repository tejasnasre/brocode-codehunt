"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      const userRole = data.user?.user_metadata?.role || "jobseeker"; // Default to jobseeker
      setUser(data.user, userRole); // Store in Zustand

      toast({ title: "Login Successful", description: "Redirecting..." });

      // Redirect to /dashboard (it will auto-route based on role)
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleEmailLogin}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <Button type="submit">Login</Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
