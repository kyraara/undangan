"use client"

import { useRef, useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type UploadType = "couple" | "gallery" | "image" | "audio" | "video"

interface FileUploadInputProps {
  value: string
  onChange: (path: string) => void
  type: UploadType
  filename?: string
  placeholder?: string
  showPreview?: boolean
}

const ACCEPT_MAP: Record<UploadType, string> = {
  couple:  "image/jpeg,image/png,image/webp",
  gallery: "image/jpeg,image/png,image/webp",
  image:   "image/jpeg,image/png,image/webp",
  audio:   "audio/mpeg,audio/wav,audio/ogg",
  video:   "video/mp4,video/webm",
}

const MAX_MB: Record<UploadType, number> = {
  couple:  5,
  gallery: 5,
  image:   5,
  audio:   20,
  video:   100,
}

export function FileUploadInput({
  value,
  onChange,
  type,
  filename,
  placeholder,
  showPreview,
}: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const isImage = type === "couple" || type === "gallery" || type === "image"

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxBytes = MAX_MB[type] * 1024 * 1024
    if (file.size > maxBytes) {
      toast.error(`Ukuran file melebihi batas (maks ${MAX_MB[type]} MB).`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)
      if (filename) formData.append("filename", filename)

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const result = await res.json()

      if (!res.ok || !result.success) throw new Error(result.error || "Upload gagal.")

      onChange(result.path)
      toast.success("File berhasil diunggah!")
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat upload.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0 rounded-xl border border-border/50 bg-white/50 px-3 py-2 text-sm truncate">
          {value
            ? <span className="text-foreground">{value}</span>
            : <span className="text-muted-foreground/50">{placeholder || "Belum ada file"}</span>
          }
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 gap-1.5 rounded-xl bg-white/40 border-border/60"
        >
          {uploading
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            : <Upload className="h-3.5 w-3.5" aria-hidden="true" />
          }
          {uploading ? "Uploading…" : "Upload"}
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              onChange("")
              if (inputRef.current) inputRef.current.value = ""
            }}
            className="shrink-0 h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-600"
            title="Hapus"
            aria-label="Hapus file"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        )}
      </div>

      {showPreview && value && isImage && (
        <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-border/40 bg-muted/20">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      )}

      {showPreview && value && type === "audio" && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio controls className="w-full h-10 rounded-lg" key={value}>
          <source src={value} />
        </audio>
      )}

      {showPreview && value && type === "video" && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls muted className="w-full max-h-40 rounded-lg" key={value}>
          <source src={value} />
        </video>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_MAP[type]}
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Pilih file untuk upload (${type})`}
      />
    </div>
  )
}
