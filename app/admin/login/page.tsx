"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles, Loader2, KeyRound, Mail, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useConfig } from "@/lib/config-context"

export default function AdminLoginPage() {
  const { groom, bride } = useConfig()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(e.currentTarget)
    const email = form.get("email") as string
    const password = form.get("password") as string

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.error || "Email atau kata sandi salah.")
        setLoading(false)
        return
      }

      router.push("/admin")
    } catch (err) {
      console.error(err)
      setError("Terjadi kesalahan koneksi.")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center bg-gradient-hero overflow-hidden px-4 py-12">
      {/* Decorative botanical leaf backdrop */}
      <div className="absolute -left-12 -top-12 h-64 w-64 text-[var(--color-sage)]/20 pointer-events-none md:h-96 md:w-96">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 80 20 L 78 22 Q 60 35, 45 50 Q 30 65, 22 82 Z" />
        </svg>
      </div>
      <div className="absolute -right-16 -bottom-16 h-72 w-72 rotate-180 text-[var(--color-rose)]/15 pointer-events-none md:h-96 md:w-96">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
        </svg>
      </div>

      <div className="w-full max-w-md z-10 space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-bg-dark)]/5 border border-[var(--color-gold)]/20 shadow-soft mb-4">
            <Sparkles className="h-6 w-6 text-[var(--color-gold)]" aria-hidden="true" />
          </div>
          <h1 className="font-display text-5xl leading-none text-[var(--color-bg-dark)]">
            {groom.nameShort} & {bride.nameShort}
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)] mt-2">
            Kelola Undangan · Admin Panel
          </p>
        </div>

        <Card className="border-white/50 bg-white/40 backdrop-blur-xl shadow-card rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <h2 className="font-heading text-2xl font-semibold text-[var(--color-bg-dark)]">Dashboard Log In</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Masuk untuk mengelola data kehadiran & ucapan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                  Alamat Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]/50" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@wedding.com"
                    required
                    autoComplete="email"
                    className="pl-10 bg-white/60 border-white/60 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-semibold">
                    Kata Sandi
                  </Label>
                  <Link href="#" className="text-xs text-[var(--color-gold)] hover:underline font-medium">
                    Lupa?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]/50" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="pl-10 bg-white/60 border-white/60 focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]/20 rounded-xl"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-destructive/15 p-3 text-center text-sm font-medium text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[var(--color-bg-dark)] hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] text-white shadow-soft transition-all duration-300 py-6 rounded-xl text-sm uppercase tracking-wider font-semibold font-heading"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Menghubungkan...
                  </>
                ) : (
                  "Masuk Sekarang"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-bg-dark)] transition-colors font-medium"
          >
            <ArrowLeft className="h-3 w-3" />
            Kembali ke Undangan Utama
          </Link>
        </p>
      </div>
    </div>
  )
}
