"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Check, X, Trash2, MessageSquareHeart, Loader2, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import type { WishEntry, WishStatus } from "@/types/admin"
import { formatDateTime, relativeTime, wishStatusLabel } from "@/lib/admin/format"
import { toast } from "sonner"

type FilterKey = "all" | WishStatus

interface WishesManagerProps {
  initialData: WishEntry[]
}

export function WishesManager({ initialData }: WishesManagerProps) {
  const router = useRouter()
  const [data, setData] = useState<WishEntry[]>(initialData)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterKey>("all")
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return data
      .filter((w) => (filter === "all" ? true : w.status === filter))
      .filter((w) =>
        query.trim() === ""
          ? true
          : w.nama.toLowerCase().includes(query.trim().toLowerCase()) ||
            w.pesan.toLowerCase().includes(query.trim().toLowerCase()),
      )
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  }, [data, query, filter])

  const counts = useMemo(
    () => ({
      all: data.length,
      approved: data.filter((w) => w.status === "approved").length,
      pending: data.filter((w) => w.status === "pending").length,
      rejected: data.filter((w) => w.status === "rejected").length,
    }),
    [data],
  )

  async function updateStatus(id: string, status: WishStatus) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/wishes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed")
      setData((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)))
      toast.success(
        status === "approved" ? "Ucapan berhasil disetujui & tayang!" : "Ucapan ditolak & diarsipkan.",
      )
      router.refresh()
    } catch {
      toast.error("Gagal memperbarui status ucapan.")
    } finally {
      setLoadingId(null)
    }
  }

  async function handleDelete(id: string) {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/wishes/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed")
      setData((prev) => prev.filter((w) => w.id !== id))
      toast.success("Ucapan berhasil dihapus permanen!")
      router.refresh()
    } catch {
      toast.error("Gagal menghapus ucapan.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Card className="border-border/60 bg-card shadow-soft rounded-2xl overflow-hidden animate-in fade-in duration-500">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)} className="w-full lg:w-auto">
            <TabsList className="grid grid-cols-4 w-full lg:w-auto bg-muted/40 p-1 rounded-xl">
              <TabsTrigger value="all" className="text-xs sm:text-sm rounded-lg py-2">
                Semua <span className="ml-1 text-muted-foreground font-normal">({counts.all})</span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-xs sm:text-sm rounded-lg py-2">
                Tayang <span className="ml-1 text-emerald-600 font-normal">({counts.approved})</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm rounded-lg py-2">
                Pending <span className="ml-1 text-amber-600 font-normal">({counts.pending})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-xs sm:text-sm rounded-lg py-2">
                Ditolak <span className="ml-1 text-rose-600 font-normal">({counts.rejected})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kata kunci ucapan..."
              className="pl-10 bg-white/50 border-border/50 rounded-xl focus:border-[var(--color-gold)] focus:ring-[var(--color-gold)]/20"
              aria-label="Cari ucapan"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty className="py-16">
            <EmptyHeader className="flex flex-col items-center">
              <EmptyMedia variant="icon" className="mb-4">
                <MessageSquareHeart className="h-8 w-8 text-muted/50" aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle className="font-heading text-xl font-semibold">Tidak Ada Ucapan</EmptyTitle>
              <EmptyDescription className="text-sm text-muted-foreground mt-1 max-w-sm text-center">
                {query ? "Tidak ditemukan ucapan yang cocok dengan kata kunci pencarian Anda." : "Belum ada ucapan & doa restu di tab penyaringan ini."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((w) => (
              <article
                key={w.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-border/60 bg-white/20 backdrop-blur-sm p-5 transition-all hover:border-[var(--color-gold)]/40 hover:shadow-soft"
              >
                <div className="space-y-3">
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-bold border border-[var(--color-gold)]/15">
                        {w.nama.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-bg-dark)] truncate">{w.nama}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5" title={formatDateTime(w.created_at)}>
                          <Calendar className="h-2.5 w-2.5 text-muted-foreground/60" />
                          {relativeTime(w.created_at)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 border text-xs font-semibold ${
                        w.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : w.status === "rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {wishStatusLabel(w.status)}
                    </Badge>
                  </header>

                  <p className="text-sm text-[var(--color-text-primary)] leading-relaxed italic pr-2">
                    " {w.pesan} "
                  </p>
                </div>

                <footer className="flex items-center justify-between gap-2 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-2 flex-1">
                    {w.status !== "approved" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(w.id, "approved")}
                        className="gap-1.5 flex-1 bg-white/40 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 rounded-xl"
                        disabled={loadingId === w.id}
                      >
                        {loadingId === w.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        Setujui
                      </Button>
                    ) : null}
                    {w.status !== "rejected" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(w.id, "rejected")}
                        className="gap-1.5 flex-1 bg-white/40 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 rounded-xl"
                        disabled={loadingId === w.id}
                      >
                        {loadingId === w.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        Tolak
                      </Button>
                    ) : null}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Hapus ucapan dari ${w.nama}`} className="hover:bg-rose-50 group rounded-xl h-9 w-9" disabled={loadingId === w.id}>
                        <Trash2 className="h-4 w-4 text-muted-foreground/80 group-hover:text-rose-600 transition-colors" aria-hidden="true" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl border border-border/50">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-heading text-lg">Hapus Ucapan & Doa?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm leading-relaxed">
                          Apakah Anda yakin ingin menghapus ucapan dari <strong>{w.nama}</strong> secara permanen? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(w.id)} className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl">Ya, Hapus</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </footer>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
