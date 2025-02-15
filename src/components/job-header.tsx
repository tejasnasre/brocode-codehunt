import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface JobHeaderProps {
  title: string
  company: string
  location: string
  type: string
}

export function JobHeader({ title, company, location, type }: JobHeaderProps) {
  return (
    <div className="flex items-start justify-between p-6 border-b">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-xl font-bold text-primary">S</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{company}</span>
            <span>•</span>
            <span>{location}</span>
            <span>•</span>
            <span>{type}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button>Apply</Button>
      </div>
    </div>
  )
}

