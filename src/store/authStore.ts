import { create } from "zustand";
import supabase from "@/lib/supabase";

interface AuthState {
  user: any | null;
  role: string | null;
  isLoading: boolean;
  setUser: (user: any, role: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,

  setUser: (user, role) => set({ user, role }),

  logout: async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ user: null, role: null, isLoading: false });
    window.location.href = "/"; // Force full refresh to clear state properly
  },
}));

// Auto-fetch session when the app loads
supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    const userRole = data.session.user?.user_metadata?.role || "jobseeker"; // Default role
    useAuthStore.getState().setUser(data.session.user, userRole);
  }
});
