import type { LucideIcon } from "lucide-react"

interface BenefitsCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function BenefitsCard({ icon: Icon, title, description }: BenefitsCardProps) {
  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-lg border">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

