import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  logo: string;
  applied: number;
  capacity: number;
}

export function JobCard({
  title,
  company,
  location,
  type,
  tags,
  logo,
  applied,
  capacity,
}: JobCardProps) {
  return (
    <div className="border rounded-lg p-6 flex items-start justify-between gap-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0">
          <Image
            width={48}
            height={48}
            src={logo || "/placeholder.svg"}
            alt={company}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground">
            {company} • {location}
          </p>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{type}</Badge>
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button>Apply</Button>
        <p className="text-sm text-muted-foreground mt-2">
          {applied} applied of {capacity} capacity
        </p>
      </div>
    </div>
  );
}
