import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  trend?: { value: string; positive?: boolean }
  accent?: "primary" | "success" | "warning" | "danger" | "neutral"
}

const accentStyles: Record<NonNullable<StatCardProps["accent"]>, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-accent/15 text-accent",
  warning: "bg-secondary/30 text-secondary-foreground",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-foreground",
}

export function StatCard({ label, value, hint, icon: Icon, trend, accent = "primary" }: StatCardProps) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
            <p className="font-serif text-3xl text-foreground tabular-nums">{value}</p>
            {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-md", accentStyles[accent])}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        {trend ? (
          <p
            className={cn(
              "mt-3 text-xs font-medium",
              trend.positive === false ? "text-destructive" : "text-accent",
            )}
          >
            {trend.value}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
