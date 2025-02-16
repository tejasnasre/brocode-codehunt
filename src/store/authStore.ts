import { create } from "zustand";
import { AuthUser } from "@supabase/supabase-js";
import supabase from "@/lib/supabase";

// Job Seeker Interface
interface JobSeeker {
  id: string;
  full_name: string;
  email: string;
  college?: string;
  skills?: string[];
  job_type?: "remote" | "on-site" | "hybrid";
}

// Recruiter Interface
interface Recruiter {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  location?: string;
  industry?: string;
}

// Auth State
interface AuthState {
  user: AuthUser | null;
  role: string | null;
  jobSeeker: JobSeeker | null;
  recruiter: Recruiter | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null, role: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  jobSeeker: null,
  recruiter: null,
  isLoading: true,

  setUser: async (user, role) => {
    let jobSeekerData: JobSeeker | null = null;
    let recruiterData: Recruiter | null = null;

    if (user) {
      if (role === "jobseeker") {
        const { data, error } = await supabase
          .from("job_seekers")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (error) console.error("Error fetching job seeker data:", error);
        jobSeekerData = data;
      } else if (role === "recruiter") {
        const { data, error } = await supabase
          .from("recruiters")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (error) console.error("Error fetching recruiter data:", error);
        recruiterData = data;
      }
    }

    set({ user, role, jobSeeker: jobSeekerData, recruiter: recruiterData, isLoading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ user: null, role: null, jobSeeker: null, recruiter: null, isLoading: false });
    window.location.href = "/"; // Force refresh
  },
}));

// ✅ Auto-fetch session when the app loads
supabase.auth.getSession().then(async ({ data }) => {
  if (data.session) {
    const user = data.session.user;
    const userRole = user?.user_metadata?.role || "jobseeker";

    await useAuthStore.getState().setUser(user, userRole);
  } else {
    useAuthStore.setState({ isLoading: false });
  }
});
