import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav"
import { AuthGuard } from "@/components/admin/auth-guard"

export const metadata: Metadata = {
  title: "Admin Panel — Wedding Invitation",
  description: "Kelola RSVP, ucapan, dan pengaturan undangan pernikahan",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        <AdminSidebar />
        <AdminMobileNav />
        <main className="md:pl-64">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}
