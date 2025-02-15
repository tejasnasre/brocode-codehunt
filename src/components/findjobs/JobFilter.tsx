// JobFilter.tsx
import { useState } from "react";
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

interface FilterSection {
  id: string;
  label: string;
  options: {
    id: string;
    label: string;
    count: number;
  }[];
}

const employmentTypes: FilterSection = {
  id: "employment",
  label: "Employment Type",
  options: [
    { id: "full-time", label: "Full-time", count: 142 },
    { id: "part-time", label: "Part-time", count: 47 },
    { id: "contract", label: "Contract", count: 38 },
    { id: "internship", label: "Internship", count: 16 },
    { id: "remote", label: "Remote", count: 85 },
  ],
};

const experienceLevels: FilterSection = {
  id: "experience",
  label: "Experience Level",
  options: [
    { id: "entry", label: "Entry Level", count: 56 },
    { id: "mid", label: "Mid Level", count: 95 },
    { id: "senior", label: "Senior Level", count: 48 },
    { id: "lead", label: "Lead", count: 24 },
    { id: "executive", label: "Executive", count: 12 },
  ],
};

export function JobFilters() {
  const [salaryRange, setSalaryRange] = useState([40000, 200000]);

  const formatSalary = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

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
                  min={0}
                  max={300000}
                  step={10000}
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatSalary(salaryRange[0])}</span>
                  <span>{formatSalary(salaryRange[1])}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Employment Type Filter */}
          <AccordionItem value="employment">
            <AccordionTrigger className="text-base font-semibold">
              {employmentTypes.label}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-2">
                {employmentTypes.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Experience Level Filter */}
          <AccordionItem value="experience">
            <AccordionTrigger className="text-base font-semibold">
              {experienceLevels.label}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-2">
                {experienceLevels.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox id={option.id} />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
