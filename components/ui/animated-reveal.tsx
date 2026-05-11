"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "fadeUp" | "fadeIn" | "scaleIn"

interface AnimatedRevealProps {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number
  as?: "div" | "section" | "article" | "header" | "footer"
}

export function AnimatedReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  as: Tag = "div",
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const variantClass =
    variant === "fadeUp" ? "reveal" : variant === "fadeIn" ? "reveal reveal-fade" : "reveal reveal-scale"

  return (
    <Tag
      ref={ref as never}
      className={cn(variantClass, inView && "in-view", className)}
      style={{ animationDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
