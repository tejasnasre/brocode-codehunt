"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        toast({
          title: "Password reset email sent",
          description: "Check your email for the password reset link.",
        });
        router.push("/auth/login");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Forgot Your Password?
            </h1>
            <p className="text-gray-600">
              No worries, we&rsquo;ll help you reset it.
            </p>
          </div>
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1 border-2 border-black"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          {error && (
            <p className="mt-4 text-center text-red-500 bg-red-100 p-2 rounded border border-red-500">
              {error}
            </p>
          )}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
