export type Kehadiran = "hadir" | "tidak_hadir" | "belum_pasti"

export interface RSVPEntry {
  id: string
  nama: string
  jumlah_tamu: number
  kehadiran: Kehadiran
  pesan?: string
  created_at: string
}

export type WishStatus = "approved" | "pending" | "rejected"

export interface WishEntry {
  id: string
  nama: string
  pesan: string
  created_at: string
  status: WishStatus
}
