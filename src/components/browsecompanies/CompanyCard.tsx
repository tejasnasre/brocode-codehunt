import Image from "next/image";
import { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{company.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{company.description}</p>
          <div className="flex gap-2 mt-3">
            {company.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 text-sm text-purple-600 font-medium">
            {company.jobCount} Jobs
          </div>
        </div>
      </div>
    </div>
  );
};
