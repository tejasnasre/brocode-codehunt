import { create } from "zustand";
import { AuthUser } from "@supabase/supabase-js"; // Import the correct type
import supabase from "@/lib/supabase";

interface AuthState {
  user: AuthUser | null;
  role: string | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null, role: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,

  setUser: (user, role) => set({ user, role, isLoading: false }),

  logout: async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ user: null, role: null, isLoading: false });
    window.location.href = "/"; // Forces full refresh to clear stale Zustand state
  },
}));

// Auto-fetch session when the app loads
supabase.auth.getSession().then(({ data }) => {
  if (data.session) {
    const userRole = data.session.user?.user_metadata?.role || "jobseeker"; // Default role
    useAuthStore.getState().setUser(data.session.user, userRole);
  } else {
    useAuthStore.setState({ isLoading: false }); // Prevent infinite loading state
  }
});
