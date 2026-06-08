"use client"

import { useState } from "react"
import { Gift } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"
import { BankCard } from "@/components/ui/bank-card"

export function GiftSection() {
  const { bankAccounts } = useConfig()
  const [open, setOpen] = useState(false)

  return (
    <section
      id="gift"
      className="relative overflow-hidden bg-(--color-bg-card) px-6 py-24 sm:py-28"
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
                className="inline-flex items-center gap-2 rounded-full bg-(--color-bg-dark) px-7 py-3 font-heading text-sm tracking-wider text-(--color-text-light) shadow-card transition hover:bg-(--color-gold) hover:text-(--color-bg-dark)"
              >
                <Gift className="h-4 w-4" />
                Kirim Hadiah
              </button>
            ) : (
              <div className="w-full space-y-5">
                {bankAccounts.map((account, idx) => (
                  <BankCard
                    key={idx}
                    bank={account.bank}
                    number={account.number}
                    holder={account.holder}
                    qrImage={(account as any).qrImage || undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
