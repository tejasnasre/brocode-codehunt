import { create } from "zustand";

interface AuthState {
  user: { id: string; email: string } | null;
  role: "job_seeker" | "recruiter" | null;
  setUser: (user: { id: string; email: string } | null) => void;
  setRole: (role: "job_seeker" | "recruiter" | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
}));
