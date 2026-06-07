"use client"

import { useState, useEffect } from "react"
import { Send, Heart } from "lucide-react"
import { toast } from "sonner"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

interface Wish {
  id: string
  nama: string
  pesan: string
  created_at: string
}

function timeAgo(tsString: string) {
  const diff = Date.now() - new Date(tsString).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "Baru saja"
  if (m < 60) return `${m} menit lalu`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} jam lalu`
  const d = Math.floor(h / 24)
  return `${d} hari lalu`
}

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [nama, setNama] = useState("")
  const [pesan, setPesan] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("/api/wishes")
        const result = await res.json()
        if (result.success && result.data) {
          setWishes(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch wishes:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchWishes()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nama.trim() || !pesan.trim()) {
      toast.error("Mohon isi nama dan pesan")
      return
    }
    setSubmitting(true)
    
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama: nama.trim(), pesan: pesan.trim() }),
      })
      
      const result = await res.json()
      
      if (!res.ok || !result.success) {
        toast.error(result.error || "Gagal mengirim ucapan")
        return
      }
      
      // Add new wish to the top of the list locally
      if (result.data && result.data.length > 0) {
        setWishes((prev) => [result.data[0], ...prev])
      }
      
      setNama("")
      setPesan("")
      toast.success("Terima kasih atas doa & ucapannya!")
    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan sistem")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="wishes"
      className="relative overflow-hidden bg-[var(--color-bg-primary)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-3xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Wishes"
            title="Doa & Harapan"
            description="Tulis doa dan harapanmu untuk perjalanan kami. Setiap kata adalah berkat yang kami jaga."
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={120}>
          <form
            onSubmit={submit}
            className="mt-12 space-y-4 rounded-3xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-card)] p-6 shadow-soft sm:p-8"
          >
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Anda"
              maxLength={100}
              className="w-full rounded-xl border border-[var(--color-gold)]/30 bg-transparent px-4 py-3 text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]/70 focus:border-[var(--color-gold)]"
            />
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Sampaikan doa dan harapan terbaikmu untuk kami..."
              maxLength={500}
              rows={4}
              className="w-full resize-none rounded-xl border border-[var(--color-gold)]/30 bg-transparent px-4 py-3 text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)]/70 focus:border-[var(--color-gold)]"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--color-text-secondary)]">
                {pesan.length}/500
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-dark)] px-6 py-2.5 text-sm font-medium tracking-wide text-[var(--color-text-light)] transition hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Mengirim..." : "Kirim Ucapan"}
              </button>
            </div>
          </form>
        </AnimatedReveal>

        <div className="mt-10 space-y-4">
          {wishes.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-[var(--color-gold)]/40 p-10 text-center text-[var(--color-text-secondary)]">
              Jadilah yang pertama memberikan doa.
            </p>
          ) : (
            wishes.map((wish, idx) => (
              <AnimatedReveal key={wish.id} variant="fadeUp" delay={idx * 60}>
                <article className="rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-bg-card)] p-5 shadow-soft">
                  <header className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-gold)]/15 font-heading text-sm font-semibold text-[var(--color-gold)]">
                        {wish.nama.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-(--color-text-primary)">
                          {wish.nama}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {timeAgo(wish.created_at)}
                        </p>
                      </div>
                    </div>
                    <Heart className="h-4 w-4 text-[var(--color-rose)]" />
                  </header>
                  <p className="mt-3 text-pretty leading-relaxed text-[var(--color-text-primary)]">
                    {wish.pesan}
                  </p>
                </article>
              </AnimatedReveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
