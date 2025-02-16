"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import supabase from "../../../lib/supabase";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore"; // Import Zustand store

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // Store role in user metadata
      },
    });
  
    if (error) {
      setError(error.message);
    } else {
      const userRole = data.user?.user_metadata?.role || "jobseeker"; // Default role if not set
      setUser(data.user, userRole); // Store user and role in Zustand
      toast({ title: "Successfully signed up", description: "Account created successfully" });
  
      // Redirect based on role
      router.push(userRole === "recruiter" ? "/dashboard/recruiter/profile" : "/dashboard/jobseeker/profile");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl bg-white p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-indigo-600">Sign Up</CardTitle>
          <p className="text-gray-500 mt-2">Start your journey with us!</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div>
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="focus:ring-indigo-500" />
            </div>
            <div>
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="focus:ring-indigo-500" />
            </div>
            <div>
              <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => setRole(value)}>
                <SelectTrigger className="w-full focus:ring-indigo-500">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="jobseeker">Job Seeker</SelectItem>
                </SelectContent>
              </Select>
              {role && <p className="text-gray-500 text-sm mt-1">Selected Role: {role}</p>}
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 p-5 rounded-xl shadow-md transition">Sign Up</Button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </CardContent>
        <CardFooter className="text-center">
          <p>Already have an account? <Link href="/auth/login" className="text-indigo-600 hover:underline">Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
