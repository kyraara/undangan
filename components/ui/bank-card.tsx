"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"

export interface BankCardProps {
  bank: string
  number: string
  holder: string
  qrImage?: string
}

type BankTheme = {
  gradient: string
  accent: string
  logoText: string
  logoSub?: string
  logoStyle?: string
}

function getBankTheme(bank: string): BankTheme {
  const key = bank.trim().toUpperCase().replace(/\s+/g, "")
  const themes: Record<string, BankTheme> = {
    BCA:         { gradient: "linear-gradient(135deg,#003580 0%,#0057B8 100%)", accent: "#5CB8E4", logoText: "bca",      logoStyle: "text-3xl font-black tracking-tight lowercase" },
    BRI:         { gradient: "linear-gradient(135deg,#002868 0%,#0052CC 100%)", accent: "#00AEEF", logoText: "BRI",      logoStyle: "text-2xl font-black tracking-widest" },
    BNI:         { gradient: "linear-gradient(135deg,#003087 0%,#1460B8 100%)", accent: "#F77F00", logoText: "BNI",      logoSub: "46", logoStyle: "text-2xl font-black tracking-widest" },
    MANDIRI:     { gradient: "linear-gradient(135deg,#002F6C 0%,#0050A8 100%)", accent: "#F5A623", logoText: "mandiri",  logoStyle: "text-xl font-bold tracking-wide lowercase" },
    BSI:         { gradient: "linear-gradient(135deg,#004A2A 0%,#008050 100%)", accent: "#C8A951", logoText: "BSI",      logoStyle: "text-2xl font-black tracking-widest" },
    CIMB:        { gradient: "linear-gradient(135deg,#7B0C1E 0%,#E4002B 100%)", accent: "#FFB3BB", logoText: "CIMB",     logoSub: "Niaga", logoStyle: "text-2xl font-black tracking-widest" },
    CIMBNIAGA:   { gradient: "linear-gradient(135deg,#7B0C1E 0%,#E4002B 100%)", accent: "#FFB3BB", logoText: "CIMB",     logoSub: "Niaga", logoStyle: "text-2xl font-black tracking-widest" },
    PERMATA:     { gradient: "linear-gradient(135deg,#9B0B22 0%,#C8102E 100%)", accent: "#FFB3BB", logoText: "Permata",  logoSub: "Bank", logoStyle: "text-xl font-bold tracking-wide" },
    PERMATABANK: { gradient: "linear-gradient(135deg,#9B0B22 0%,#C8102E 100%)", accent: "#FFB3BB", logoText: "Permata",  logoSub: "Bank", logoStyle: "text-xl font-bold tracking-wide" },
    DANAMON:     { gradient: "linear-gradient(135deg,#B50A00 0%,#F01500 100%)", accent: "#FFAA80", logoText: "Danamon",  logoStyle: "text-xl font-bold tracking-wide" },
    OVO:         { gradient: "linear-gradient(135deg,#4A0080 0%,#7B00D4 100%)", accent: "#DA70FF", logoText: "OVO",      logoStyle: "text-3xl font-black tracking-widest" },
    GOPAY:       { gradient: "linear-gradient(135deg,#00703C 0%,#00A659 100%)", accent: "#7FFFD4", logoText: "Go",       logoSub: "Pay",  logoStyle: "text-2xl font-black" },
    DANA:        { gradient: "linear-gradient(135deg,#005FCC 0%,#1A8AF0 100%)", accent: "#80CCFF", logoText: "DANA",     logoStyle: "text-2xl font-black tracking-widest" },
    SHOPEEPAY:   { gradient: "linear-gradient(135deg,#B84000 0%,#FF5900 100%)", accent: "#FFB380", logoText: "Shopee",   logoSub: "Pay",  logoStyle: "text-lg font-bold" },
    LINKAJA:     { gradient: "linear-gradient(135deg,#8B0000 0%,#E80000 100%)", accent: "#FF9999", logoText: "LinkAja",  logoStyle: "text-xl font-bold" },
  }
  return themes[key] ?? {
    gradient: "linear-gradient(135deg,#2c2416 0%,#5c4a36 100%)",
    accent: "#C9A84C",
    logoText: bank,
    logoStyle: "text-xl font-bold tracking-wide",
  }
}

function ChipSVG() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none" aria-hidden="true">
      <rect width="44" height="34" rx="5" fill="#D4AF37" />
      <rect x="14" y="0" width="1.5" height="34" fill="#B8962E" opacity="0.45" />
      <rect x="28.5" y="0" width="1.5" height="34" fill="#B8962E" opacity="0.45" />
      <rect x="0" y="11" width="44" height="1.5" fill="#B8962E" opacity="0.45" />
      <rect x="0" y="21.5" width="44" height="1.5" fill="#B8962E" opacity="0.45" />
      <rect x="14" y="11" width="16" height="12" rx="2" fill="#C9A84C" stroke="#B8962E" strokeWidth="0.5" />
      <line x1="18" y1="11" x2="18" y2="23" stroke="#B8962E" strokeWidth="0.5" opacity="0.55" />
      <line x1="26" y1="11" x2="26" y2="23" stroke="#B8962E" strokeWidth="0.5" opacity="0.55" />
      <line x1="14" y1="15.5" x2="30" y2="15.5" stroke="#B8962E" strokeWidth="0.5" opacity="0.55" />
      <line x1="14" y1="18.5" x2="30" y2="18.5" stroke="#B8962E" strokeWidth="0.5" opacity="0.55" />
    </svg>
  )
}

function ContactlessSVG({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M7 5.5C7 5.5 8.8 7.3 8.8 11C8.8 14.7 7 16.5 7 16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M10 3.5C10 3.5 13.2 6 13.2 11C13.2 16 10 18.5 10 18.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      <path d="M13.2 1.5C13.2 1.5 17.5 5 17.5 11C17.5 17 13.2 20.5 13.2 20.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function formatNumber(num: string) {
  return num.replace(/(.{4})/g, "$1 ").trim()
}

function maskNumber(num: string) {
  const last4 = num.slice(-4)
  const masked = "•".repeat(Math.max(0, num.length - 4))
  const full = masked + last4
  return full.replace(/(.{4})/g, "$1 ").trim()
}

export function BankCard({ bank, number, holder, qrImage }: BankCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const theme = getBankTheme(bank)

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(number)
      setCopied(true)
      toast.success("Nomor rekening tersalin")
      setTimeout(() => setCopied(false), 2200)
    } catch {
      toast.error("Gagal menyalin")
    }
  }

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: "1200px", height: "200px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={`Kartu ${bank} — ketuk untuk detail`}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden p-6 flex flex-col justify-between"
          style={{ background: theme.gradient, backfaceVisibility: "hidden" }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -right-12 -top-12 h-52 w-52 rounded-full opacity-[0.12]"
            style={{ background: theme.accent }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full opacity-[0.10]"
            style={{ background: theme.accent }}
            aria-hidden="true"
          />

          {/* Top row: logo + chip */}
          <div className="relative flex items-start justify-between">
            <div className="flex flex-col leading-none text-white">
              <span className={theme.logoStyle ?? "text-xl font-bold"}>
                {theme.logoText}
              </span>
              {theme.logoSub && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] opacity-70 mt-0.5">
                  {theme.logoSub}
                </span>
              )}
            </div>
            <ChipSVG />
          </div>

          {/* Card number masked */}
          <div className="relative">
            <p className="font-mono text-base tracking-[0.22em] text-white/90 sm:text-lg">
              {maskNumber(number)}
            </p>
          </div>

          {/* Bottom row */}
          <div className="relative flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 mb-0.5">Pemilik Rekening</p>
              <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">
                {holder}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <ContactlessSVG color={theme.accent} />
              <p className="text-[9px] italic text-white/40">ketuk untuk detail</p>
            </div>
          </div>
        </div>

        {/* ── BACK ───────────────────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden p-6 flex flex-col justify-between"
          style={{
            background: theme.gradient,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -left-12 -top-12 h-52 w-52 rounded-full opacity-[0.12]"
            style={{ background: theme.accent }}
            aria-hidden="true"
          />

          {/* Main content row */}
          <div className="relative flex items-center gap-4 flex-1">
            {/* Left: number + copy */}
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/50 mb-1.5">
                No. Rekening
              </p>
              <p className="font-mono text-xl font-semibold tracking-[0.12em] text-white sm:text-2xl">
                {formatNumber(number)}
              </p>
              <button
                type="button"
                onClick={copy}
                className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white transition-opacity hover:opacity-80"
                style={{
                  background: theme.accent + "28",
                  border: `1px solid ${theme.accent}55`,
                }}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Tersalin!" : "Salin Nomor"}
              </button>
            </div>

            {/* Right: QR code */}
            {qrImage && (
              <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <div className="rounded-xl bg-white p-1.5 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrImage}
                    alt={`QR ${bank}`}
                    className="h-[88px] w-[88px] object-contain"
                  />
                </div>
                <p className="mt-1 text-center text-[9px] text-white/40">QRIS</p>
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="relative flex items-end justify-between">
            <p className="text-xs text-white/55">
              {bank} · a.n. {holder}
            </p>
            <p className="text-[9px] italic text-white/40">ketuk untuk kembali</p>
          </div>
        </div>
      </div>
    </div>
  )
}
