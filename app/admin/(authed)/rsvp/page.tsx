import { PageHeader } from "@/components/admin/page-header"
import { RSVPTable } from "@/components/admin/rsvp-table"
import { query } from "@/lib/db"
import type { RSVPEntry } from "@/types/admin"

export const dynamic = "force-dynamic"

export default async function AdminRSVPPage() {
  const raw = await query("SELECT * FROM rsvp ORDER BY created_at DESC")

  const rsvps: RSVPEntry[] = (raw ?? []).map((r: any) => ({
    id: r.id,
    nama: r.nama,
    jumlah_tamu: r.jumlah_tamu,
    kehadiran: r.kehadiran,
    pesan: r.pesan,
    created_at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
  }))

  return (
    <>
      <PageHeader
        title="Daftar RSVP"
        description="Kelola dan pantau konfirmasi kehadiran dari tamu undangan."
      />
      <RSVPTable initialData={rsvps} />
    </>
  )
}
