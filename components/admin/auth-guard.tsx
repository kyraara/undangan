"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/session")
        const data = await res.json()
        if (data.authenticated) {
          setStatus("authenticated")
        } else {
          router.replace("/admin/login")
          setStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Session check error:", error)
        router.replace("/admin/login")
        setStatus("unauthenticated")
      }
    }

    checkSession()
  }, [router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memverifikasi sesi...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") return null

  return <>{children}</>
}
