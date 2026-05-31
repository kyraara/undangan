"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, MessageSquareHeart, Settings, LogOut, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/lib/config-context"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/rsvp", label: "RSVP", icon: Users },
  { href: "/admin/wishes", label: "Ucapan", icon: MessageSquareHeart },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
]

export function AdminSidebar() {
  const { groom, bride } = useConfig()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }
    router.push("/admin/login")
  }

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r md:border-border md:bg-card">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base text-foreground">
              {groom.nameShort} & {bride.nameShort}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </Button>
        </div>
      </div>
    </aside>
  )
}
