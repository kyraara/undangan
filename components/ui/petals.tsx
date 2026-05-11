"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  color: string
  rotate: number
}

const COLORS = [
  "rgba(196, 133, 122, 0.85)", // rose
  "rgba(232, 213, 163, 0.85)", // gold-light
  "rgba(138, 158, 126, 0.75)", // sage
  "rgba(250, 247, 242, 0.9)", // paper
]

export function Petals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 12 + Math.random() * 14,
      delay: -Math.random() * 18,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
    }))
    setPetals(arr)
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {petals.map((p) => (
        <svg
          key={p.id}
          className="petal"
          width={p.size}
          height={p.size}
          viewBox="0 0 20 20"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <path
            d="M10 2 C 14 6, 14 14, 10 18 C 6 14, 6 6, 10 2 Z"
            fill={p.color}
          />
        </svg>
      ))}
    </div>
  )
}
