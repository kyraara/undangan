"use client"

import { useState } from "react"
import { Check, Copy, Gift } from "lucide-react"
import { toast } from "sonner"
import { weddingConfig } from "@/lib/config"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function GiftSection() {
  const { bankAccounts } = weddingConfig
  const [copied, setCopied] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const copy = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number)
      setCopied(number)
      toast.success("Nomor rekening tersalin")
      setTimeout(() => setCopied(null), 2000)
    } catch {
      toast.error("Gagal menyalin")
    }
  }

  return (
    <section
      id="gift"
      className="relative overflow-hidden bg-[var(--color-bg-card)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-3xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Wedding Gift"
            title="Hadiah & Doa"
            description="Kehadiran dan doa restu Anda adalah hadiah yang paling berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat menyampaikannya melalui:"
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={120}>
          <div className="mt-10 flex flex-col items-center">
            {!open ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-dark)] px-7 py-3 font-heading text-sm tracking-wider text-[var(--color-text-light)] shadow-card transition hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)]"
              >
                <Gift className="h-4 w-4" />
                Kirim Hadiah
              </button>
            ) : (
              <div className="w-full space-y-4">
                {bankAccounts.map((account) => (
                  <div
                    key={account.number}
                    className="overflow-hidden rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-primary)]/60"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-[var(--color-gold)]/20 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/15 font-heading text-sm font-semibold text-[var(--color-gold)]">
                          {account.bank.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                            Bank
                          </p>
                          <p className="font-heading font-semibold text-[var(--color-bg-dark)]">
                            {account.bank}
                          </p>
                        </div>
                      </div>
                      <p className="text-right text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                        a.n.
                        <span className="mt-0.5 block text-sm font-medium normal-case tracking-normal text-[var(--color-text-primary)]">
                          {account.holder}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 px-6 py-4">
                      <p className="select-all font-mono text-lg tracking-wider text-[var(--color-bg-dark)] sm:text-xl">
                        {account.number}
                      </p>
                      <button
                        type="button"
                        onClick={() => copy(account.number)}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-bg-dark)]"
                      >
                        {copied === account.number ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
