"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "../../../lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: role },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Sucessfully signed up",
        description: "Account created successfully",
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center p-4 gap-4 min-h-screen pt-20">
      <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
      <p className="text-center text-gray-500">
        Start your journey with us by creating a new account.
      </p>
      <Card className="w-full bg-white max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </Label>
              <div>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="jobseeker">Job Seeker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role && <p className="text-gray-500">Selected Role: {role}</p>}
            </div>

            <Button type="submit" className="w-full">
              Sign Up with Email
            </Button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white0 hover:underline">
              Login
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-white0 hover:underline"
            >
              Reset it here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
