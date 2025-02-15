"use client"

import { useEffect, useRef } from "react"

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    const elements = ref.current?.querySelectorAll("[data-animate]")
    elements?.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return ref
}

