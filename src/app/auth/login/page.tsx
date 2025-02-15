"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "../../../lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Successfully logged in",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-blue-50 flex flex-col items-center justify-center p-4 gap-4 min-h-screen pt-20">
      <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
      <p className="text-center text-gray-500">
        Log in to your account to continue.
      </p>
      <Card className="w-full bg-blue-50 max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Reset it here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
