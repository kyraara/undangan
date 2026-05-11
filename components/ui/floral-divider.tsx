import { cn } from "@/lib/utils"

interface FloralDividerProps {
  className?: string
  variant?: "default" | "compact"
}

export function FloralDivider({ className, variant = "default" }: FloralDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-[var(--color-gold)]",
        variant === "compact" ? "my-4" : "my-8",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-gold)]/60 sm:w-20" />
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M20 2 C 16 8, 8 8, 4 10 C 8 12, 16 12, 20 18 C 24 12, 32 12, 36 10 C 32 8, 24 8, 20 2 Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
        <circle cx="20" cy="10" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-gold)]/60 sm:w-20" />
    </div>
  )
}
