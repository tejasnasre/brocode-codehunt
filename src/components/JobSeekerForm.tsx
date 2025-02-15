"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function JobSeekerForm() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    skills: "",
    job_type: "remote",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setUser } = useAuthStore(); // ✅ Fetch the Zustand store updater

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not available!");
      return;
    }

    console.log("User object:", user);
    console.log("User email:", user.email);

    if (!user.email) {
      console.error("User email is missing! Cannot update job_seeker profile.");
      return;
    }

    const { error } = await supabase.from("job_seekers").upsert({
      id: user.id,
      name: formData.name, // Ensure it matches the DB column name
      email: user.email,
      college: formData.college,
      skills: formData.skills.split(",").map((s) => s.trim()),
      job_type: formData.job_type,
    });

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully!");

      // ✅ Fetch updated job seeker data
      const { data: updatedJobSeeker, error: fetchError } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching updated job seeker profile:", fetchError);
      } else {
        console.log("Updated JobSeeker:", updatedJobSeeker);
        setUser(user, updatedJobSeeker); // ✅ Update Zustand store
        router.push("/dashboard/jobseeker");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="college"
          placeholder="College/University"
          value={formData.college}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
