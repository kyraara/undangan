import Link from "next/link"
import { Users, UserCheck, UserX, HelpCircle, MessageSquareHeart, ClipboardList, ArrowRight, Calendar } from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { StatCard } from "@/components/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { query } from "@/lib/db"
import { formatDateTime, kehadiranLabel, relativeTime } from "@/lib/admin/format"
import { getConfig } from "@/lib/get-config"
import type { RSVPEntry, WishEntry } from "@/types/admin"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const weddingConfig = await getConfig()
  const daysUntilEvent = Math.max(0, Math.ceil(
    (new Date(`${weddingConfig.events[0].date}T${weddingConfig.events[0].time}:00`).getTime() - Date.now()) /
    (1000 * 60 * 60 * 24)
  ))
  const rsvpRaw = await query("SELECT * FROM rsvp ORDER BY created_at DESC")
  const wishesRaw = await query("SELECT * FROM ucapan ORDER BY created_at DESC")

  const rsvps: RSVPEntry[] = (rsvpRaw ?? []).map((r: any) => ({
    id: r.id,
    nama: r.nama,
    jumlah_tamu: r.jumlah_tamu,
    kehadiran: r.kehadiran,
    pesan: r.pesan,
    created_at: r.created_at,
  }))

  const wishes: WishEntry[] = (wishesRaw ?? []).map((w: any) => ({
    id: w.id,
    nama: w.nama,
    pesan: w.pesan,
    created_at: w.created_at,
    status: w.status ?? "approved",
  }))

  const total = rsvps.length
  const hadir = rsvps.filter((r) => r.kehadiran === "hadir")
  const tidakHadir = rsvps.filter((r) => r.kehadiran === "tidak_hadir").length
  const belumPasti = rsvps.filter((r) => r.kehadiran === "belum_pasti").length
  const totalTamu = hadir.reduce((sum, r) => sum + r.jumlah_tamu, 0)
  const totalUcapan = wishes.length
  const pendingUcapan = wishes.filter((w) => w.status === "pending").length

  const recentRSVP = rsvps.slice(0, 5)
  const recentWishes = wishes
    .filter((w) => w.status === "approved" || w.status === "pending")
    .slice(0, 4)

  // Attendance rate calculations
  const attendanceRate = total > 0 ? Math.round((hadir.length / total) * 100) : 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Dashboard"
        description={`Ringkasan & statistik undangan pernikahan ${weddingConfig.groom.nameShort} & ${weddingConfig.bride.nameShort}`}
        actions={
          <Badge variant="outline" className="gap-1.5 px-4 py-2 border-[var(--color-gold)]/30 bg-[var(--color-bg-card)]/50 backdrop-blur text-[var(--color-text-primary)] rounded-full">
            <Calendar className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide">{daysUntilEvent} hari menuju hari H</span>
          </Badge>
        }
      />

      {/* Grid Kartu Statistik */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total RSVP Respon"
          value={total}
          hint={`${totalTamu} total kuota tamu terhitung`}
          icon={ClipboardList}
          accent="primary"
        />
        <StatCard
          label="Konfirmasi Hadir"
          value={hadir.length}
          hint={`${attendanceRate}% dari total respon`}
          icon={UserCheck}
          accent="success"
        />
        <StatCard
          label="Tidak Hadir"
          value={tidakHadir}
          hint="Tamu berhalangan hadir"
          icon={UserX}
          accent="danger"
        />
        <StatCard
          label="Belum Pasti"
          value={belumPasti}
          hint="Tamu ragu-ragu"
          icon={HelpCircle}
          accent="warning"
        />
      </div>

      {/* Visual Analitik & Detail */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Rate Circle Card */}
        <Card className="border-border/60 bg-card shadow-soft rounded-2xl overflow-hidden flex flex-col justify-between">
          <CardHeader className="pb-4">
            <CardTitle className="font-heading text-lg">Rasio Kehadiran</CardTitle>
            <CardDescription>Persentase tamu yang mengonfirmasi hadir.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 flex-1">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="text-muted/40"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  className="text-[var(--color-sage)]"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 60}
                  strokeDashoffset={2 * Math.PI * 60 * (1 - (attendanceRate || 1) / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <p className="font-heading text-4xl font-bold text-[var(--color-bg-dark)]">{attendanceRate}%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Tingkat Hadir</p>
              </div>
            </div>
            <div className="mt-6 flex justify-around w-full text-center text-xs">
              <div>
                <p className="font-semibold text-lg text-[var(--color-bg-dark)]">{totalTamu}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Kuota Tamu</p>
              </div>
              <div className="border-l border-border px-4">
                <p className="font-semibold text-lg text-[var(--color-bg-dark)]">{totalUcapan}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Total Ucapan</p>
              </div>
              <div className="border-l border-border px-4">
                <p className="font-semibold text-lg text-[var(--color-gold)]">{pendingUcapan}</p>
                <p className="text-[10px] uppercase text-muted-foreground">Pending Mod</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSVP Terbaru */}
        <Card className="lg:col-span-2 border-border/60 bg-card shadow-soft rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/40 pb-4">
            <div>
              <CardTitle className="font-heading text-lg">Aktivitas RSVP Terbaru</CardTitle>
              <CardDescription>5 konfirmasi kehadiran terakhir.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-semibold gap-1 hover:text-[var(--color-gold)] hover:bg-transparent">
              <Link href="/admin/rsvp">
                Semua RSVP <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {recentRSVP.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <Users className="h-8 w-8 text-muted/60 mb-2" />
                <p className="text-sm text-muted-foreground">Belum ada respon RSVP masuk.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border/50">
                {recentRSVP.map((r) => (
                  <li key={r.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-semibold border border-[var(--color-gold)]/15">
                      {r.nama.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-bg-dark)] truncate">{r.nama}</p>
                      <p className="text-xs text-muted-foreground">
                        Membawa <span className="font-medium text-foreground">{r.jumlah_tamu} orang</span> · {formatDateTime(r.created_at)}
                      </p>
                    </div>
                    <Badge
                      className={`shrink-0 rounded-full px-2.5 py-0.5 border text-xs font-medium ${
                        r.kehadiran === "hadir"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : r.kehadiran === "tidak_hadir"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {kehadiranLabel(r.kehadiran)}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ucapan Terbaru */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3 border-border/60 bg-card shadow-soft rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/40 pb-4">
            <div>
              <CardTitle className="font-heading text-lg">Doa & Ucapan Terbaru</CardTitle>
              <CardDescription>Tinjauan pesan-pesan hangat dari para tamu.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-semibold gap-1 hover:text-[var(--color-gold)] hover:bg-transparent">
              <Link href="/admin/wishes">
                Kelola Moderasi <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {recentWishes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquareHeart className="h-8 w-8 text-muted/60 mb-2" />
                <p className="text-sm text-muted-foreground">Belum ada ucapan terkirim.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentWishes.map((w) => (
                  <div key={w.id} className="relative flex flex-col justify-between p-5 rounded-2xl border border-border/60 bg-[var(--color-bg-card)]/50 hover:border-[var(--color-gold)]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[var(--color-bg-dark)] truncate">{w.nama}</p>
                        {w.status === "pending" && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] scale-90 px-1.5 py-0">Pending</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-3">"{w.pesan}"</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4 pt-2 border-t border-border/40 text-right">{relativeTime(w.created_at)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
