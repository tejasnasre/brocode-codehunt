'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";

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

      const userRole = data.user?.user_metadata?.role || "jobseeker";
      setUser(data.user, userRole);


      const userRole = data.user?.user_metadata?.role || "jobseeker"; // Default to jobseeker
      setUser(data.user, userRole); // Store in Zustand
  

      toast({ title: "Login Successful", description: "Redirecting..." });
  
      // Redirect based on role
      const redirectPath =
        userRole === "recruiter" ? "/dashboard/recruiter/profile" : "/dashboard/jobseeker/profile";
  
      router.push(redirectPath);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:translate-y-[-2px]">
        <div className="backdrop-blur-sm bg-white/90 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-medium tracking-tight text-gray-900 text-center">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 text-center">
              Please enter your credentials to continue
            </p>
          </div>
          
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full pl-10 pr-4 py-2 h-12 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-2 h-12 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/10"
            >
              Sign in
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}