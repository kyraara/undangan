import { PageHeader } from "@/components/admin/page-header"
import { WishesManager } from "@/components/admin/wishes-manager"
import { query } from "@/lib/db"
import type { WishEntry } from "@/types/admin"

export const dynamic = "force-dynamic"

export default async function AdminWishesPage() {
  const raw = await query("SELECT * FROM ucapan ORDER BY created_at DESC")

  const wishes: WishEntry[] = (raw ?? []).map((w: any) => ({
    id: w.id,
    nama: w.nama,
    pesan: w.pesan,
    created_at: w.created_at instanceof Date ? w.created_at.toISOString() : String(w.created_at),
    status: w.status ?? "approved",
  }))

  return (
    <>
      <PageHeader
        title="Moderasi Ucapan"
        description="Tinjau, setujui, atau tolak ucapan & doa dari tamu sebelum tayang di halaman undangan."
      />
      <WishesManager initialData={wishes} />
    </>
  )
}
