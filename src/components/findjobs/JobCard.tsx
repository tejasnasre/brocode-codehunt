// JobCard.tsx
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Briefcase, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  logo: string;
  salaryMin: number;
  salaryMax: number;
  createdAt: Date;
}

export function JobCard({
  id,
  title,
  description,
  company,
  location,
  type,
  logo,
  salaryMin,
  salaryMax,
  createdAt,
}: JobCardProps) {
  const [imageError, setImageError] = useState(false);

  const CompanyLogo = () => {
    if (imageError) {
      return (
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-500">
            {company.charAt(0)}
          </span>
        </div>
      );
    }

    return (
      <Image
        width={64}
        height={64}
        src={logo || "/api/placeholder/64/64"}
        alt={`${company} logo`}
        className="w-16 h-16 rounded-lg object-contain bg-gray-50"
        onError={() => setImageError(true)}
        priority={false}
      />
    );
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <CompanyLogo />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div>
              <Link
                href={`/jobs/${id}`}
                className="inline-block hover:text-primary transition-colors"
              >
                <h3 className="text-lg font-semibold truncate">{title}</h3>
              </Link>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{type}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Badge variant="secondary" className="whitespace-nowrap">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </Badge>
            </div>
          </div>

          <p className="mt-3 text-muted-foreground line-clamp-2 text-sm">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}
              </span>
              <span className="text-muted-foreground">per year</span>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href={`/findjobs/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
