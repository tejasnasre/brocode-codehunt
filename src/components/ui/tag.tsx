import type React from "react"
import { cn } from "@/lib/utils"

interface TagProps {
  children: React.ReactNode
  variant?: "marketing" | "design" | "default"
  className?: string
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-blue-50 text-blue-700": variant === "marketing",
          "bg-purple-50 text-purple-700": variant === "design",
          "bg-gray-100 text-gray-800": variant === "default",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}

