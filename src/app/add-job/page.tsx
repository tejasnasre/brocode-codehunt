"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import supabase from "@/lib/supabase";

const jobFormSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  jobType: z.enum(["remote", "onsite", "hybrid"], {
    required_error: "Please select a job type.",
  }),
  salaryMin: z.string().transform((val) => parseInt(val, 10)),
  salaryMax: z.string().transform((val) => parseInt(val, 10)),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyLogo: z.string().url({
    message: "Please enter a valid URL for the company logo.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
});

export default function AddJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      salaryMin: 0,
      salaryMax: 0,
      companyName: "",
      companyLogo: "",
      location: "",
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  async function onSubmit(values: z.infer<typeof jobFormSchema>) {
    try {
      setIsSubmitting(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User fetch error:", userError);
        toast({
          title: "Error",
          description: "Failed to fetch user information.",
          variant: "destructive",
        });
        return;
      }

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to post a job.",
          variant: "destructive",
        });
        router.push("/auth/login");
        return;
      }

      // Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        toast({
          title: "Error",
          description: "Failed to verify recruiter status.",
          variant: "destructive",
        });
        return;
      }

      if (profile?.role !== "recruiter") {
        toast({
          title: "Access Denied",
          description: "Only recruiters can post jobs.",
          variant: "destructive",
        });
        return;
      }

      const { error: insertError } = await supabase.from("jobs").insert({
        title: values.title,
        description: values.description,
        job_type: values.jobType,
        salary_min: values.salaryMin,
        salary_max: values.salaryMax,
        skills,
        company_name: values.companyName,
        company_logo: values.companyLogo,
        location: values.location,
        recruiter_id: user.id,
      });

      if (insertError) {
        console.error("Job insert error:", insertError);
        toast({
          title: "Error",
          description: "Failed to post job. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Job posted successfully!",
      });

      router.push("/findjobs");
    } catch (error) {
      console.error("Job posting error:", error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <p className="text-muted-foreground">
            Fill in the details below to post a new job opening.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the job description..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 80000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Required Skills</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company logo URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL to your company&apos;s logo image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York, NY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}