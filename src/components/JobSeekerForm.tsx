"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import supabase from "@/lib/supabase";
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Edit3,
  AlertCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";

// Define types
type JobSeekerProfile = {
  name: string;
  email: string;
  college: string;
  skills: string[];
  job_type: string;
} | null;

type JobSeekerFormProps = {
  existingData: JobSeekerProfile;
  onSuccess?: () => void;
  onCancel?: () => void;
};

// Job Seeker Form Component
function JobSeekerForm({ existingData, onSuccess, onCancel }: JobSeekerFormProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: existingData?.name || "",
    college: existingData?.college || "",
    skills: existingData?.skills ? existingData.skills.join(", ") : "",
    job_type: existingData?.job_type || "remote",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { setUser } = useAuthStore();
  
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
      name: formData.name,
      email: user.email,
      college: formData.college,
      skills: formData.skills.split(",").map((s) => s.trim()),
      job_type: formData.job_type,
    });
    
    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated successfully!");
      // Fetch updated job seeker data
      const { data: updatedJobSeeker, error: fetchError } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("id", user.id)
        .single();
        
      if (fetchError) {
        console.error("Error fetching updated job seeker profile:", fetchError);
      } else {
        console.log("Updated JobSeeker:", updatedJobSeeker);
        setUser(user, updatedJobSeeker);
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard/jobseeker");
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">
        {existingData ? "Update Your Profile" : "Complete Your Profile"}
      </h2>
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
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {existingData ? "Update Profile" : "Save Profile"}
          </button>
          
          {existingData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 p-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Main Job Seeker Dashboard
export default function JobSeekerDashboard() {
  const [jobSeeker, setJobSeeker] = useState<JobSeekerProfile>(null);
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("job_seekers")
          .select("name, email, college, skills, job_type")
          .eq("id", user.id)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') {
            // No profile found - this is okay, we'll show the form
            setJobSeeker(null);
          } else {
            throw error;
          }
        } else {
          setJobSeeker(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching job seeker profile:", err);
          setError(err.message || "Failed to load profile data");
        } else {
          console.error("Unexpected error:", err);
          setError("Failed to load profile data");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobSeekerProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-8 p-6 border border-red-200 rounded-lg bg-red-50 ">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">Error Loading Profile</h2>
        </div>
        <p className="text-red-700">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!jobSeeker || isEditing) {
    return (
      <div className="container mx-auto p-6">
        {/* <h1 className="text-2xl font-bold mb-4">Job Seeker Profile</h1> */}
        <JobSeekerForm 
          existingData={jobSeeker}
          onSuccess={() => {
            setIsEditing(false);
            window.location.reload();
          }}
          onCancel={() => jobSeeker && setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{jobSeeker.name}</h1>
          <button 
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white border-x border-b rounded-b-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 text-gray-700">Personal Information</h2>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{jobSeeker.email}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <GraduationCap className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p>{jobSeeker.college}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Briefcase className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p>{jobSeeker.job_type}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-2 text-gray-700">Skills</h2>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {jobSeeker.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <button 
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="w-4 h-4 mr-2" /> Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}