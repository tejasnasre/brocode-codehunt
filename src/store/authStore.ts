import { create } from "zustand";
import { AuthUser } from "@supabase/supabase-js";
import supabase from "@/lib/supabase";

interface JobSeeker {
  id: string;
  full_name: string;
  email: string;
  college?: string;
  skills?: string[];
  job_type?: "remote" | "on-site" | "hybrid";
}

interface AuthState {
  user: AuthUser | null;
  role: string | null;
  jobSeeker: JobSeeker | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null, role: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  jobSeeker: null,
  isLoading: true,

  setUser: async (user, role) => {
    let jobSeekerData: JobSeeker | null = null;

    if (user && role === "jobseeker") {
      const { data: jobSeeker, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching job seeker data:", error);
      } else {
        jobSeekerData = jobSeeker;
      }
    }

    set({ user, role, jobSeeker: jobSeekerData, isLoading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ user: null, role: null, jobSeeker: null, isLoading: false });
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
