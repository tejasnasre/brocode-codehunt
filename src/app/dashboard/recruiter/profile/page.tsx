"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabase"
import { useAuthStore } from "@/store/authStore"

export default function RecruiterForm() {
  const router = useRouter()
  const { user } = useAuthStore() as { user: { id: string; email: string } | null }

  const [formData, setFormData] = useState({
    full_name: "",
    company: "",
    location: "",
    employment_type: "",
    remote_options: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("User not authenticated!")
      return
    }

    setLoading(true)

    const { error } = await supabase.from("recruiters").insert([
      {
        id: user.id,
        full_name: formData.full_name,
        email: user.email,
        company: formData.company,
        location: formData.location,
        employment_type: formData.employment_type,
        remote_options: formData.remote_options,
      },
    ])

    setLoading(false)

    if (error) {
      console.error("Error inserting data:", error.message)
      alert("Error inserting data: " + error.message)
    } else {
      alert("Recruiter profile created successfully!")
      router.push("/recruiter/dashboard")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-indigo-200 my-10">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Recruiter Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full p-3 text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              onChange={handleChange}
              className="w-full p-3 text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              className="w-full p-3 text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
          </div>
          <div>
            <select
              name="employment_type"
              onChange={handleChange}
              className="w-full p-3 text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              <option value="">Employment Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div>
            <select
              name="remote_options"
              onChange={handleChange}
              className="w-full p-3 text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              <option value="">Remote Options</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-Site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-xl font-bold text-white bg-indigo-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}

