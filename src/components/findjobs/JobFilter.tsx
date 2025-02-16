"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import supabase from "@/lib/supabase";

export function JobFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    salaryRange: [number, number];
    jobTypes: string[];
  }) => void;
}) {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    10000, 100000,
  ]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  // ✅ Corrected: Fetch unique job types
  useEffect(() => {
    async function fetchJobTypes() {
      const { data, error } = await supabase
        .from("all_jobs")
        .select("job_type");

      if (!error && data) {
        setJobTypes([...new Set(data.map((job) => job.job_type))]);
      }
    }
    fetchJobTypes();
  }, []);

  // ✅ Corrected: Send filter updates on first render too
  useEffect(() => {
    onFilterChange({
      salaryRange,
      jobTypes: selectedJobTypes,
    });
  }, [salaryRange, selectedJobTypes, onFilterChange]);

  const handleJobTypeChange = (jobType: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType)
        ? prev.filter((type) => type !== jobType)
        : [...prev, jobType]
    );
  };

  const formatSalary = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="w-72 space-y-6">
      <Card className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {/* Salary Range Filter */}
          <AccordionItem value="salary">
            <AccordionTrigger className="text-base font-semibold">
              Salary Range
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <div className="space-y-4">
                <Slider
                  min={10000}
                  max={300000}
                  step={5000}
                  value={salaryRange}
                  onValueChange={(value) =>
                    setSalaryRange([value[0], value[1]])
                  }
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatSalary(salaryRange[0])}</span>
                  <span>{formatSalary(salaryRange[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Job Type Filter */}
          <AccordionItem value="job-type">
            <AccordionTrigger className="text-base font-semibold">
              Job Type
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-2">
                {jobTypes.length > 0 ? (
                  jobTypes.map((jobType) => (
                    <div key={jobType} className="flex items-center space-x-2">
                      <Checkbox
                        id={jobType}
                        checked={selectedJobTypes.includes(jobType)}
                        onCheckedChange={() => handleJobTypeChange(jobType)}
                      />
                      <Label
                        htmlFor={jobType}
                        className="flex-1 text-sm cursor-pointer"
                      >
                        {jobType}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No job types available
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
