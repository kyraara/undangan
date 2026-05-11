"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string // ISO format
  invert?: boolean
}

function calc(target: number) {
  const now = Date.now()
  const diff = Math.max(0, target - now)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

export function CountdownTimer({ targetDate, invert = false }: CountdownTimerProps) {
  const target = new Date(targetDate).getTime()
  const [time, setTime] = useState(() => calc(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(calc(target))
    const id = setInterval(() => setTime(calc(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl bg-[var(--color-bg-card)]/40 sm:h-24"
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  if (time.done) {
    return (
      <p
        className={`font-display text-3xl sm:text-4xl ${
          invert ? "text-[var(--color-gold-light)]" : "text-[var(--color-gold)]"
        }`}
      >
        Hari Istimewa Telah Tiba
      </p>
    )
  }

  const items = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex flex-col items-center justify-center rounded-2xl border px-2 py-4 backdrop-blur-sm sm:py-6 ${
            invert
              ? "border-[var(--color-gold)]/30 bg-white/5 text-[var(--color-text-light)]"
              : "border-[var(--color-gold)]/30 bg-[var(--color-bg-card)]/80 text-[var(--color-bg-dark)]"
          }`}
        >
          <span className="font-heading text-2xl font-semibold tabular-nums sm:text-4xl md:text-5xl">
            {String(item.value).padStart(2, "0")}
          </span>
          <span
            className={`mt-1 text-[10px] uppercase tracking-[0.2em] sm:text-xs ${
              invert ? "text-[var(--color-gold-light)]" : "text-[var(--color-text-secondary)]"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
