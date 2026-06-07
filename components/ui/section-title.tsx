import { cn } from "@/lib/utils"
import { FloralDivider } from "./floral-divider"

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "center" | "left"
  invert?: boolean
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  invert = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-display text-3xl leading-none sm:text-4xl",
            invert ? "text-[var(--color-gold-light)]" : "text-[var(--color-gold)]",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl",
          invert ? "text-(--color-text-light)" : "text-(--color-text-primary)",
        )}
      >
        {title}
      </h2>
      <FloralDivider variant="compact" className={align === "left" ? "self-start" : ""} />
      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
            invert ? "text-[var(--color-text-light)]/80" : "text-[var(--color-text-secondary)]",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
