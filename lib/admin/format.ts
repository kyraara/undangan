import type { Kehadiran, WishStatus } from "@/types/admin"

export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function relativeTime(iso: string): string {
  const d = new Date(iso).getTime()
  const now = Date.now()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60) return "baru saja"
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`
  return formatDate(iso)
}

export function kehadiranLabel(k: Kehadiran): string {
  switch (k) {
    case "hadir":
      return "Hadir"
    case "tidak_hadir":
      return "Tidak Hadir"
    case "belum_pasti":
      return "Belum Pasti"
  }
}

export function wishStatusLabel(s: WishStatus): string {
  switch (s) {
    case "approved":
      return "Tayang"
    case "pending":
      return "Menunggu"
    case "rejected":
      return "Ditolak"
  }
}
