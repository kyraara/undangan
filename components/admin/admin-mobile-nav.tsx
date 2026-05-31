"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LayoutDashboard, Users, MessageSquareHeart, Settings, LogOut, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/lib/config-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/rsvp", label: "RSVP", icon: Users },
  { href: "/admin/wishes", label: "Ucapan", icon: MessageSquareHeart },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
]

export function AdminMobileNav() {
  const { groom, bride } = useConfig()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    setOpen(false)
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }
    router.push("/admin/login")
  }

  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <Link href="/admin" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </div>
        <span className="font-serif text-sm text-foreground">Admin Panel</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Buka menu">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Menu Admin</SheetTitle>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-serif text-base text-foreground">
                    {groom.nameShort} & {bride.nameShort}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Admin</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Tutup menu">
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <nav className="flex-1 p-3 space-y-1" aria-label="Admin navigation">
              {navItems.map((item) => {
                const isActive = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
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
        </SheetContent>
      </Sheet>
    </header>
  )
}
