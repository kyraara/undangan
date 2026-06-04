"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Save, Link as LinkIcon, Calendar, Music, CreditCard, User,
  Sparkles, Loader2, Image as ImageIcon, Images, Plus, Trash2, BookOpen,
  Instagram, Copy, Check, Share2,
} from "lucide-react"
import { PageHeader } from "@/components/admin/page-header"
import { FileUploadInput } from "@/components/admin/file-upload-input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/lib/config-context"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const initialConfig = useConfig()
  const router  = useRouter()
  const [saving, setSaving]   = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [config, setConfig]   = useState<any>(() => JSON.parse(JSON.stringify(initialConfig)))
  const [newGalleryAlt, setNewGalleryAlt] = useState("")
  const [guestNameInput, setGuestNameInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [siteOrigin, setSiteOrigin] = useState("")

  useEffect(() => {
    setSiteOrigin(window.location.origin)
  }, [])

  const copyInvitationLink = () => {
    const url = guestNameInput
      ? `${window.location.origin}?to=${encodeURIComponent(guestNameInput)}`
      : window.location.origin
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── helpers ──────────────────────────────────────────────
  const set = (path: string[], value: any) =>
    setConfig((prev: any) => {
      const next = { ...prev }
      let cur = next
      for (let i = 0; i < path.length - 1; i++) {
        cur[path[i]] = { ...cur[path[i]] }
        cur = cur[path[i]]
      }
      cur[path[path.length - 1]] = value
      return next
    })

  const handleGroomChange = (key: string, value: string) => set(["groom", key], value)
  const handleBrideChange = (key: string, value: string) => set(["bride", key], value)
  const handleEventChange = (idx: number, key: string, value: string) =>
    setConfig((prev: any) => {
      const events = [...prev.events]
      events[idx] = { ...events[idx], [key]: value }
      return { ...prev, events }
    })
  const handleBankChange = (idx: number, key: string, value: string) =>
    setConfig((prev: any) => {
      const bankAccounts = [...prev.bankAccounts]
      bankAccounts[idx] = { ...bankAccounts[idx], [key]: value }
      return { ...prev, bankAccounts }
    })
  const handleStoryChange = (idx: number, key: string, value: string) =>
    setConfig((prev: any) => {
      const story = [...prev.story]
      story[idx] = { ...story[idx], [key]: value }
      return { ...prev, story }
    })

  const handleInstagramChange = (person: "groom" | "bride", value: string) => {
    setConfig((prev: any) => {
      const socialMedia = { ...prev.socialMedia }
      const list = [...(socialMedia[person] || [])]
      
      const idx = list.findIndex((sm: any) => sm.platform === "instagram")
      const handle = value ? (value.startsWith("@") ? value : `@${value}`) : ""
      const url = value ? `https://instagram.com/${value.replace(/^@/, "")}` : ""
      
      if (idx > -1) {
        if (value) {
          list[idx] = { ...list[idx], handle, url }
        } else {
          list.splice(idx, 1)
        }
      } else if (value) {
        list.push({ platform: "instagram", handle, url })
      }
      
      socialMedia[person] = list
      return { ...prev, socialMedia }
    })
  }

  // ── Gallery ───────────────────────────────────────────────
  const addGalleryPhoto = (src: string) => {
    if (!src) return
    setConfig((prev: any) => ({
      ...prev,
      gallery: [...prev.gallery, { src, alt: newGalleryAlt || "Foto galeri" }],
    }))
    setNewGalleryAlt("")
  }
  const removeGalleryPhoto = (idx: number) =>
    setConfig((prev: any) => ({
      ...prev,
      gallery: prev.gallery.filter((_: any, i: number) => i !== idx),
    }))
  const updateGalleryAlt = (idx: number, alt: string) =>
    setConfig((prev: any) => {
      const gallery = [...prev.gallery]
      gallery[idx] = { ...gallery[idx], alt }
      return { ...prev, gallery }
    })

  // ── Save ──────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        toast.success("Pengaturan berhasil disimpan!")
        router.refresh()
      } else {
        toast.error(result.error || "Gagal menyimpan pengaturan.")
      }
    } catch {
      toast.error("Terjadi kesalahan sistem.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Pengaturan Undangan"
        description="Sesuaikan informasi pengantin, acara, rekening, musik, tampilan, dan galeri foto."
        actions={
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-(--color-bg-dark) hover:bg-(--color-gold) hover:text-(--color-bg-dark) text-white shadow-soft rounded-full px-5"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" aria-hidden="true" />}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        }
      />

      {/* ── Link Generator ──────────────────────────────────── */}
      <Card className="border-(--color-gold)/30 bg-(--color-gold)/5 shadow-soft rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-(--color-gold)/20">
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Share2 className="h-4 w-4 text-(--color-gold)" />
            Bagikan Undangan Personal
          </CardTitle>
          <CardDescription>
            Masukkan nama tamu untuk membuat tautan undangan yang menyapa mereka langsung. Kirim via WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Nama tamu (contoh: Pak Budi, Keluarga Wijaya)"
              value={guestNameInput}
              onChange={(e) => setGuestNameInput(e.target.value)}
              className="rounded-xl bg-white/60"
            />
            <Button
              type="button"
              onClick={copyInvitationLink}
              className="shrink-0 gap-2 rounded-full bg-(--color-bg-dark) hover:bg-(--color-gold) hover:text-(--color-bg-dark) text-white shadow-soft px-5"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Tersalin!" : "Salin"}
            </Button>
          </div>
          {siteOrigin && (
            <p className="text-xs font-mono text-muted-foreground bg-white/60 rounded-lg px-3 py-2 break-all border border-border/40">
              {siteOrigin}
              {guestNameInput ? `?to=${encodeURIComponent(guestNameInput)}` : ""}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Tamu akan disambut dengan nama tersebut di layar pembuka undangan. Kosongkan untuk tautan umum.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="mempelai" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl bg-muted/40 p-1 rounded-xl">
          <TabsTrigger value="mempelai"  className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><User      className="h-3.5 w-3.5 hidden sm:block" />Mempelai</TabsTrigger>
          <TabsTrigger value="acara"     className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><Calendar  className="h-3.5 w-3.5 hidden sm:block" />Acara</TabsTrigger>
          <TabsTrigger value="rekening"  className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><CreditCard className="h-3.5 w-3.5 hidden sm:block" />Hadiah</TabsTrigger>
          <TabsTrigger value="musik"     className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><Music    className="h-3.5 w-3.5 hidden sm:block" />Musik</TabsTrigger>
          <TabsTrigger value="cerita"    className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><BookOpen  className="h-3.5 w-3.5 hidden sm:block" />Cerita</TabsTrigger>
          <TabsTrigger value="galeri"    className="text-xs sm:text-sm gap-1.5 rounded-lg py-2"><Images   className="h-3.5 w-3.5 hidden sm:block" />Galeri</TabsTrigger>
        </TabsList>

        {/* ── Tab: Mempelai ─────────────────────────────────── */}
        <TabsContent value="mempelai" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Informasi Pengantin</CardTitle>
              <CardDescription>Detail nama dan informasi orang tua. Foto dapat diunggah langsung.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 p-6 md:grid-cols-2">
              {/* Groom */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40 text-(--color-gold)">
                  <span className="font-semibold text-sm uppercase tracking-wider">Mempelai Pria (Groom)</span>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label>Nama Lengkap & Gelar</Label>
                    <Input value={config.groom.name} onChange={(e) => handleGroomChange("name", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Panggilan</Label>
                    <Input value={config.groom.nameShort} onChange={(e) => handleGroomChange("nameShort", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Display (contoh: Ahmad Fauzi, S.T.)</Label>
                    <Input value={config.groom.nameDisplay} onChange={(e) => handleGroomChange("nameDisplay", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Urutan Putra (contoh: Putra pertama)</Label>
                    <Input value={config.groom.childOrder} onChange={(e) => handleGroomChange("childOrder", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Ayah</Label>
                    <Input value={config.groom.father} onChange={(e) => handleGroomChange("father", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Ibu</Label>
                    <Input value={config.groom.mother} onChange={(e) => handleGroomChange("mother", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Bio / Quote Singkat</Label>
                    <Textarea value={config.groom.bio} onChange={(e) => handleGroomChange("bio", e.target.value)} rows={3} className="rounded-xl bg-white/50 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Instagram className="h-3.5 w-3.5 text-muted-foreground" />
                      Instagram Username
                    </Label>
                    <Input
                      value={config.socialMedia?.groom?.find((sm: any) => sm.platform === "instagram")?.handle || ""}
                      onChange={(e) => handleInstagramChange("groom", e.target.value)}
                      placeholder="@refki.saputra"
                      className="rounded-xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      Foto Pengantin Pria
                    </Label>
                    <FileUploadInput
                      value={config.groom.photo}
                      onChange={(v) => handleGroomChange("photo", v)}
                      type="couple"
                      filename="groom"
                      placeholder="/images/couple/groom.jpg"
                      showPreview
                    />
                  </div>
                </div>
              </div>

              {/* Bride */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/40 text-(--color-rose)">
                  <span className="font-semibold text-sm uppercase tracking-wider">Mempelai Wanita (Bride)</span>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label>Nama Lengkap & Gelar</Label>
                    <Input value={config.bride.name} onChange={(e) => handleBrideChange("name", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Panggilan</Label>
                    <Input value={config.bride.nameShort} onChange={(e) => handleBrideChange("nameShort", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Display (contoh: Siti Rahayu, S.Pd.)</Label>
                    <Input value={config.bride.nameDisplay} onChange={(e) => handleBrideChange("nameDisplay", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Urutan Putri (contoh: Putri kedua)</Label>
                    <Input value={config.bride.childOrder} onChange={(e) => handleBrideChange("childOrder", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Ayah</Label>
                    <Input value={config.bride.father} onChange={(e) => handleBrideChange("father", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Nama Ibu</Label>
                    <Input value={config.bride.mother} onChange={(e) => handleBrideChange("mother", e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Bio / Quote Singkat</Label>
                    <Textarea value={config.bride.bio} onChange={(e) => handleBrideChange("bio", e.target.value)} rows={3} className="rounded-xl bg-white/50 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <Instagram className="h-3.5 w-3.5 text-muted-foreground" />
                      Instagram Username
                    </Label>
                    <Input
                      value={config.socialMedia?.bride?.find((sm: any) => sm.platform === "instagram")?.handle || ""}
                      onChange={(e) => handleInstagramChange("bride", e.target.value)}
                      placeholder="@fajria.ramadanty.putri"
                      className="rounded-xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      Foto Mempelai Wanita
                    </Label>
                    <FileUploadInput
                      value={config.bride.photo}
                      onChange={(v) => handleBrideChange("photo", v)}
                      type="couple"
                      filename="bride"
                      placeholder="/images/couple/bride.jpg"
                      showPreview
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Acara ────────────────────────────────────── */}
        <TabsContent value="acara" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Jadwal & Lokasi Acara</CardTitle>
              <CardDescription>Sesuaikan detail waktu dan tautan Google Maps untuk setiap acara.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {config.events.map((event: any, idx: number) => (
                <div key={event.id ?? idx} className="space-y-4">
                  {idx > 0 && <Separator className="mb-6 border-dashed" />}
                  <p className="font-semibold text-sm uppercase tracking-wider text-(--color-gold)">{event.title}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Hari Acara</Label>
                      <Input value={event.day} onChange={(e) => handleEventChange(idx, "day", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tanggal (YYYY-MM-DD)</Label>
                      <Input type="date" value={event.date} onChange={(e) => handleEventChange(idx, "date", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Tanggal Tampilan</Label>
                      <Input value={event.dateDisplay} onChange={(e) => handleEventChange(idx, "dateDisplay", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <Label>Jam Mulai</Label>
                        <Input type="time" value={event.time} onChange={(e) => handleEventChange(idx, "time", e.target.value)} className="rounded-xl bg-white/50" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Jam Selesai</Label>
                        <Input type="time" value={event.timeEnd} onChange={(e) => handleEventChange(idx, "timeEnd", e.target.value)} className="rounded-xl bg-white/50" />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Teks Waktu Tampilan (contoh: 11:00 – 15:00 WIB)</Label>
                      <Input value={event.timeDisplay} onChange={(e) => handleEventChange(idx, "timeDisplay", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Nama Tempat / Gedung</Label>
                      <Input value={event.venue} onChange={(e) => handleEventChange(idx, "venue", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Alamat Lengkap</Label>
                      <Textarea value={event.address} onChange={(e) => handleEventChange(idx, "address", e.target.value)} rows={2} className="rounded-xl bg-white/50 resize-none" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label className="flex items-center gap-1.5"><LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />Tautan Google Maps</Label>
                      <Input value={event.mapsUrl} onChange={(e) => handleEventChange(idx, "mapsUrl", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Google Maps Embed URL (iframe src)</Label>
                      <Input value={event.mapsEmbed} onChange={(e) => handleEventChange(idx, "mapsEmbed", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Rekening / Hadiah ────────────────────────── */}
        <TabsContent value="rekening" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Rekening Amplop Digital</CardTitle>
              <CardDescription>Rekening bank/dompet digital bagi tamu yang ingin mengirimkan hadiah.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {config.bankAccounts.map((acc: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  {idx > 0 && <Separator className="mb-4 border-dashed" />}
                  <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Rekening #{idx + 1}</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Nama Bank / E-Wallet</Label>
                      <Input value={acc.bank} onChange={(e) => handleBankChange(idx, "bank", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Nomor Rekening</Label>
                      <Input value={acc.number} onChange={(e) => handleBankChange(idx, "number", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Atas Nama</Label>
                      <Input value={acc.holder} onChange={(e) => handleBankChange(idx, "holder", e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Musik & Tampilan ─────────────────────────── */}
        <TabsContent value="musik" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Musik & Visual Utama</CardTitle>
              <CardDescription>Upload langsung file audio dan foto/video latar halaman undangan.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Musik */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1.5 border-b border-border/40 text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span className="font-semibold text-xs uppercase tracking-wider">Audio Pengiring</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Judul Lagu / Deskripsi</Label>
                    <Input value={config.music.title} onChange={(e) => set(["music", "title"], e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>File Audio (MP3/WAV — maks 20MB)</Label>
                    <FileUploadInput
                      value={config.music.src}
                      onChange={(v) => set(["music", "src"], v)}
                      type="audio"
                      filename="background-music"
                      placeholder="/audio/1.mp3"
                      showPreview
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4 md:col-span-2 bg-white/30 backdrop-blur-sm">
                    <div className="space-y-0.5">
                      <Label htmlFor="music-autoplay" className="text-sm font-semibold">Putar Otomatis</Label>
                      <p className="text-xs text-muted-foreground">Musik langsung berputar setelah tamu klik "Buka Undangan".</p>
                    </div>
                    <Switch
                      id="music-autoplay"
                      checked={config.music.autoplay}
                      onCheckedChange={(v) => set(["music", "autoplay"], v)}
                    />
                  </div>
                </div>
              </div>

              {/* Visual Hero */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-1.5 border-b border-border/40 text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold text-xs uppercase tracking-wider">Hashtag & Visual Hero</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Wedding Hashtag</Label>
                    <Input value={config.hashtag} onChange={(e) => set(["hashtag"], e.target.value)} className="rounded-xl bg-white/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <Label>Deadline RSVP</Label>
                      <Input type="date" value={config.rsvpDeadline} onChange={(e) => set(["rsvpDeadline"], e.target.value)} className="rounded-xl bg-white/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>H- Hari</Label>
                      <Input type="number" value={config.rsvpDeadlineDays} onChange={(e) => set(["rsvpDeadlineDays"], Number(e.target.value))} className="rounded-xl bg-white/50" />
                    </div>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      Foto Pembuka & Hero (Layar Splash + Desktop Background — maks 5MB)
                    </Label>
                    <FileUploadInput
                      value={config.hero.image}
                      onChange={(v) => set(["hero", "image"], v)}
                      type="image"
                      filename="hero"
                      placeholder="/images/gallery/hero.jpg"
                      showPreview
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="flex items-center gap-1.5">
                      <LinkIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      Video Latar Mobile (MP4 — maks 100MB)
                    </Label>
                    <FileUploadInput
                      value={config.hero.videoMobile || ""}
                      onChange={(v) => set(["hero", "videoMobile"], v)}
                      type="video"
                      filename="hero-mobile"
                      placeholder="/Vidio/1.mp4"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label>Tagline / Kutipan Undangan</Label>
                    <Textarea value={config.hero.tagline} onChange={(e) => set(["hero", "tagline"], e.target.value)} rows={3} className="rounded-xl bg-white/50 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Konsep Desain Aktif</Label>
                    <select
                      value={config.concept}
                      onChange={(e) => set(["concept"], e.target.value)}
                      className="w-full rounded-xl border border-input bg-white/50 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="A">Concept A — Romantic Botanical Luxury</option>
                      <option value="B">Concept B — Art Deco Glamour</option>
                      <option value="C">Concept C — Minimalist Japanese</option>
                      <option value="D">Concept D — Tropical Bali</option>
                      <option value="E">Concept E — Celestial Night</option>
                      <option value="F">Concept F — Modern Serif Editorial</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Cerita / Timeline ───────────────────────── */}
        <TabsContent value="cerita" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Timeline Cerita Cinta</CardTitle>
              <CardDescription>Edit momen-momen penting dalam perjalanan cinta kalian.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {config.story.map((item: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  {idx > 0 && <Separator className="mb-4 border-dashed" />}
                  <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-(--color-gold)" />
                    Momen #{idx + 1}
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Tahun</Label>
                      <Input
                        value={item.year}
                        onChange={(e) => handleStoryChange(idx, "year", e.target.value)}
                        placeholder="contoh: 2020"
                        className="rounded-xl bg-white/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Judul Momen</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => handleStoryChange(idx, "title", e.target.value)}
                        placeholder="contoh: Pertemuan Pertama"
                        className="rounded-xl bg-white/50"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label>Cerita Singkat</Label>
                      <Textarea
                        value={item.text}
                        onChange={(e) => handleStoryChange(idx, "text", e.target.value)}
                        rows={3}
                        placeholder="Ceritakan momen ini dalam beberapa kalimat…"
                        className="rounded-xl bg-white/50 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab: Galeri ──────────────────────────────────── */}
        <TabsContent value="galeri" className="space-y-6 outline-none">
          <Card className="border-border/60 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="font-heading text-lg">Kelola Galeri Foto</CardTitle>
              <CardDescription>Upload dan atur foto-foto prewedding yang akan tampil di halaman undangan.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Upload foto baru */}
              <div className="rounded-2xl border border-dashed border-(--color-gold)/40 bg-(--color-gold)/5 p-5 space-y-3">
                <p className="text-sm font-semibold text-(--color-bg-dark) flex items-center gap-2">
                  <Plus className="h-4 w-4 text-(--color-gold)" />
                  Tambah Foto Baru
                </p>
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Caption / Alt Text</Label>
                    <Input
                      value={newGalleryAlt}
                      onChange={(e) => setNewGalleryAlt(e.target.value)}
                      placeholder="Contoh: Prewedding di taman bunga"
                      className="rounded-xl bg-white/60"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Upload Foto (JPG/PNG/WebP — maks 5MB)</Label>
                  <FileUploadInput
                    value=""
                    onChange={addGalleryPhoto}
                    type="gallery"
                    placeholder="Pilih foto untuk ditambahkan ke galeri…"
                  />
                </div>
              </div>

              {/* Daftar foto galeri */}
              {config.gallery.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Images className="h-10 w-10 text-muted/40 mb-3" />
                  <p className="text-sm text-muted-foreground">Belum ada foto di galeri. Upload foto di atas untuk mulai.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {config.gallery.map((item: { src: string; alt: string }, idx: number) => (
                    <div key={idx} className="group relative rounded-2xl border border-border/60 overflow-hidden bg-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-40 object-cover"
                        onError={(e) => { e.currentTarget.style.background = "#f0ece4" }}
                      />
                      <div className="p-3 space-y-2">
                        <Input
                          value={item.alt}
                          onChange={(e) => updateGalleryAlt(idx, e.target.value)}
                          placeholder="Caption foto…"
                          className="rounded-lg bg-white/60 text-xs h-8"
                        />
                        <p className="text-[10px] text-muted-foreground truncate">{item.src}</p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeGalleryPhoto(idx)}
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg shadow-md"
                        aria-label="Hapus foto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground text-center">
                {config.gallery.length} foto · Klik <strong>Simpan Perubahan</strong> setelah selesai mengatur galeri.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
