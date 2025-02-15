import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Timer } from "lucide-react";
import Image from "next/image";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  logo: string;
  salaryMin: number;
  salaryMax: number;
  createdAt: Date;
}

export function JobCard({
  title,
  company,
  location,
  type,
  tags,
  logo,
  salaryMin,
  salaryMax,
  createdAt,
}: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <Image
          width={48}
          height={48}
          src={logo || "https://via.placeholder.com/48"}
          alt={company}
          className="w-12 h-12 rounded-lg object-contain"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/48";
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex items-center gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location}
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  {formatDistanceToNow(createdAt, { addSuffix: true })}
                </div>
              </div>
            </div>
            <Badge variant="secondary">{type}</Badge>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium">
                ${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()}
              </span>
              <span>per year</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
