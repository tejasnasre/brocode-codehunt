"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import supabase from "@/lib/supabase";
import {
  Building,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  Edit,
  Plus,
  Search,
  FileText,
} from "lucide-react";

type Recruiter = {
  id: string;
  full_name: string;
  email: string;
  company: string;
  location?: string;
  employment_type?: string;
  remote_options?: string;
};

export default function RecruiterDashboard() {
  const router = useRouter();
  const { role, user } = useAuthStore() as {
    role: string;
    user: { id: string } | null;
  };
  const [recruiterData, setRecruiterData] = useState<Recruiter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (role !== "recruiter") {
      router.replace("/dashboard");
      return;
    }

    const fetchRecruiterData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recruiters")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching recruiter data:", error.message);
      } else {
        setRecruiterData(data);
      }
      setLoading(false);
    };

    if (user?.id) {
      fetchRecruiterData();
    }
  }, [role, router, user?.id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-indigo-200">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Recruiter Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 h-32 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!recruiterData) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-indigo-200 text-center">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Recruiter Dashboard
        </h1>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <h2 className="text-2xl font-bold mb-4 text-black">
            No Profile Data Found
          </h2>
          <p className="text-gray-700 mb-6">
            We couldn&apos;t find your recruiter profile information.
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-3 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
            onClick={() => router.push("dashboard/recruiter/profile")}
          >
            Complete Your Profile
          </button>
        </div>
      </div>
    );
  }

  const profileItems = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Company",
      value: recruiterData.company,
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: recruiterData.email,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: recruiterData.location || "Not provided",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Employment Type",
      value: recruiterData.employment_type || "Not specified",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Remote Options",
      value: recruiterData.remote_options || "Not specified",
    },
  ];

  const quickActions = [
    {
      icon: <Plus className="h-8 w-8" />,
      title: "Post New Job",
      description: "Create a new job listing to find candidates",
      path: "/add-job",
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Browse Candidates",
      description: "Search through potential candidates",
      path: "#",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "View Applications",
      description: "Review applications to your job listings",
      path: "#",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-indigo-200 my-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Recruiter Dashboard</h1>
        <button
          className="bg-gray-200 text-black px-6 py-3 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
          onClick={() => router.push("/dashboard/recruiter/profile")}
        >
          <Edit className="inline-block mr-2 h-5 w-5" />
          Edit Profile
        </button>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-black">
          {recruiterData.full_name}
        </h2>
        <p className="text-xl text-gray-700">
          Welcome to your recruiter dashboard. Here you can manage your profile
          and view your recruitment activities.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-black">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {profileItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4"
          >
            <div className="flex items-center mb-2">
              {item.icon}
              <h3 className="text-lg font-bold ml-2">{item.title}</h3>
            </div>
            <p className="text-xl font-semibold break-words">{item.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-black">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.path}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all block"
          >
            <div className="flex items-center mb-3">
              {action.icon}
              <h3 className="text-xl font-bold ml-2">{action.title}</h3>
            </div>
            <p className="text-gray-700">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
