"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Download, Trash2, Users, Loader2, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Kehadiran, RSVPEntry } from "@/types/admin"
import { formatDateTime, kehadiranLabel } from "@/lib/admin/format"
import { toast } from "sonner"

type FilterKey = "all" | Kehadiran

interface RSVPTableProps {
  initialData: RSVPEntry[]
}

export function RSVPTable({ initialData }: RSVPTableProps) {
  const router = useRouter()
  const [data, setData] = useState<RSVPEntry[]>(initialData)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterKey>("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return data
      .filter((r) => (filter === "all" ? true : r.kehadiran === filter))
      .filter((r) => (query.trim() === "" ? true : r.nama.toLowerCase().includes(query.trim().toLowerCase())))
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }, [data, query, filter])

  const counts = useMemo(() => {
    return {
      all: data.length,
      hadir: data.filter((r) => r.kehadiran === "hadir").length,
      tidak_hadir: data.filter((r) => r.kehadiran === "tidak_hadir").length,
      belum_pasti: data.filter((r) => r.kehadiran === "belum_pasti").length,
    }
  }, [data])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/rsvp/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      setData((prev) => prev.filter((r) => r.id !== id))
      toast.success("Respon RSVP berhasil dihapus!")
      router.refresh()
    } catch {
      toast.error("Gagal menghapus data RSVP.")
    } finally {
      setDeletingId(null)
    }
  }

  function handleExport() {
    const headers = ["Nama", "Jumlah Tamu", "Kehadiran", "Pesan", "Waktu"]
    const rows = filtered.map((r) =>
      [r.nama, r.jumlah_tamu, kehadiranLabel(r.kehadiran), r.pesan ?? "", formatDateTime(r.created_at)]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `rsvp-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`${filtered.length} data RSVP berhasil diekspor!`)
  }

  return (
    <Card className="border-border/60 bg-card shadow-soft rounded-2xl overflow-hidden animate-in fade-in duration-500">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)} className="w-full lg:w-auto">
            <TabsList className="grid grid-cols-4 w-full lg:w-auto bg-muted/40 p-1 rounded-xl">
              <TabsTrigger value="all" className="text-xs sm:text-sm rounded-lg py-2">
                Semua <span className="ml-1.5 text-muted-foreground font-normal">({counts.all})</span>
              </TabsTrigger>
              <TabsTrigger value="hadir" className="text-xs sm:text-sm rounded-lg py-2">
                Hadir <span className="ml-1.5 text-emerald-600 font-normal">({counts.hadir})</span>
              </TabsTrigger>
              <TabsTrigger value="tidak_hadir" className="text-xs sm:text-sm rounded-lg py-2">
                Tidak <span className="ml-1.5 text-rose-600 font-normal">({counts.tidak_hadir})</span>
              </TabsTrigger>
              <TabsTrigger value="belum_pasti" className="text-xs sm:text-sm rounded-lg py-2">
                Mungkin <span className="ml-1.5 text-amber-600 font-normal">({counts.belum_pasti})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" aria-hidden="true" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama tamu..."
                className="pl-10 bg-white/50 border-border/50 rounded-xl focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]/20"
                aria-label="Cari RSVP"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleExport}
              className="gap-2 border-border/60 bg-white/40 hover:bg-muted/10 rounded-xl px-4 py-2 text-sm font-medium transition"
            >
              <Download className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
              <span className="hidden sm:inline">Ekspor CSV</span>
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty className="py-16">
            <EmptyHeader className="flex flex-col items-center">
              <EmptyMedia variant="icon" className="mb-4">
                <Users className="h-8 w-8 text-muted/50" aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle className="font-heading text-xl font-semibold">Tidak Ada Data RSVP</EmptyTitle>
              <EmptyDescription className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
                {query ? "Tidak ditemukan nama tamu yang cocok dengan kata kunci pencarian Anda." : "Belum ada respon RSVP konfirmasi kehadiran dari tamu."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-white/20 backdrop-blur-sm shadow-soft">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border/50">
                  <TableHead className="font-semibold text-[var(--color-bg-dark)] py-4 pl-6">Nama Tamu</TableHead>
                  <TableHead className="font-semibold text-[var(--color-bg-dark)] text-center w-24 py-4">Pax</TableHead>
                  <TableHead className="font-semibold text-[var(--color-bg-dark)] w-32 py-4">Status Kehadiran</TableHead>
                  <TableHead className="font-semibold text-[var(--color-bg-dark)] hidden md:table-cell py-4">Pesan Hangat</TableHead>
                  <TableHead className="font-semibold text-[var(--color-bg-dark)] hidden lg:table-cell w-44 py-4">Tanggal Masuk</TableHead>
                  <TableHead className="w-16 py-4 pr-6"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="border-b border-border/30 hover:bg-muted/5 transition-colors">
                    <TableCell className="font-semibold text-foreground py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs font-bold border border-[var(--color-gold)]/15">
                          {r.nama.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate max-w-[150px] sm:max-w-[200px]" title={r.nama}>{r.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center tabular-nums font-medium text-foreground py-4">{r.jumlah_tamu}</TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`rounded-full px-2.5 py-0.5 border text-xs font-semibold ${
                          r.kehadiran === "hadir"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : r.kehadiran === "tidak_hadir"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {kehadiranLabel(r.kehadiran)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs py-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed" title={r.pesan}>
                        {r.pesan || <span className="text-muted/40 font-normal">—</span>}
                      </p>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-muted-foreground/60" />
                        <span>{formatDateTime(r.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Hapus RSVP dari ${r.nama}`} className="hover:bg-rose-50 group rounded-lg h-9 w-9" disabled={deletingId === r.id}>
                            {deletingId === r.id ? (
                              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-muted-foreground/80 group-hover:text-rose-600 transition-colors" aria-hidden="true" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl border border-border/50">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-heading text-lg">Hapus Konfirmasi RSVP?</AlertDialogTitle>
                            <AlertDialogDescription className="text-sm leading-relaxed">
                              Apakah Anda yakin ingin menghapus RSVP dari <strong>{r.nama}</strong> secara permanen? Aksi ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2">
                            <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(r.id)} className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl">Hapus Permanen</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
