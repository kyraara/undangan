"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"
import { useConfig } from "@/lib/config-context"
import { cn } from "@/lib/utils"

const schema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100),
  jumlah: z.coerce.number().min(1).max(5),
  kehadiran: z.enum(["hadir", "tidak_hadir", "belum_pasti"], {
    required_error: "Mohon pilih kehadiran",
  }),
  pesan: z.string().max(500).optional(),
})

type FormValues = z.infer<typeof schema>

export function RSVPSection() {
  const { rsvpDeadlineDays } = useConfig()
  const [submitted, setSubmitted] = useState<FormValues | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { jumlah: 1, kehadiran: "hadir" },
  })

  const kehadiran = watch("kehadiran")

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: values.nama,
          jumlah_tamu: values.jumlah,
          kehadiran: values.kehadiran,
          pesan: values.pesan,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        toast.error(result.error || "Gagal mengirim RSVP")
        return
      }

      setSubmitted(values)
      toast.success("Berhasil mengirim konfirmasi kehadiran!")
    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan sistem")
    }
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-dark px-6 py-24 text-[var(--color-text-light)] sm:py-28"
    >
      <div className="relative mx-auto max-w-2xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="RSVP"
            title="Konfirmasi Kehadiran"
            description={`Mohon konfirmasi kehadiran Anda paling lambat ${rsvpDeadlineDays} hari sebelum acara.`}
            invert
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={120}>
          {submitted ? (
            <div className="mt-12 rounded-3xl border border-[var(--color-gold)]/40 bg-white/[0.04] p-10 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold)]/20">
                <CheckCircle2 className="h-7 w-7 text-[var(--color-gold-light)]" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold sm:text-3xl">
                Terima kasih, {submitted.nama}!
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-[var(--color-text-light)]/80">
                {submitted.kehadiran === "hadir"
                  ? "Kami tidak sabar menunggu kehadiran Anda. Sampai jumpa di hari istimewa kami!"
                  : submitted.kehadiran === "tidak_hadir"
                    ? "Kami memahami dan tetap berterima kasih atas doa dan dukungan Anda."
                    : "Terima kasih telah mengkonfirmasi. Kami menantikan kabar baik dari Anda."}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(null)}
                className="mt-6 text-sm uppercase tracking-[0.25em] text-[var(--color-gold-light)] hover:text-[var(--color-text-light)]"
              >
                Kirim Ulang
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-12 space-y-5 rounded-3xl border border-[var(--color-gold)]/30 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  {...register("nama")}
                  placeholder="Masukkan nama Anda"
                  className="w-full rounded-xl border border-[var(--color-gold)]/30 bg-transparent px-4 py-3 text-[var(--color-text-light)] outline-none placeholder:text-[var(--color-text-light)]/40 focus:border-[var(--color-gold)]"
                />
                {errors.nama && (
                  <p className="mt-1 text-xs text-[var(--color-rose)]">
                    {errors.nama.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
                    Jumlah Tamu
                  </label>
                  <select
                    {...register("jumlah")}
                    className="w-full rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-dark)] px-4 py-3 text-[var(--color-text-light)] outline-none focus:border-[var(--color-gold)]"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
                    Kehadiran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: "hadir", label: "Hadir" },
                        { value: "tidak_hadir", label: "Tidak" },
                        { value: "belum_pasti", label: "Mungkin" },
                      ] as const
                    ).map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setValue("kehadiran", opt.value)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-xs font-medium uppercase tracking-wider transition",
                          kehadiran === opt.value
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-bg-dark)]"
                            : "border-[var(--color-gold)]/30 text-[var(--color-text-light)]/70 hover:border-[var(--color-gold)]/60",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
                  Pesan untuk Pasangan (opsional)
                </label>
                <textarea
                  {...register("pesan")}
                  rows={4}
                  placeholder="Tulis pesan singkat untuk pasangan..."
                  className="w-full resize-none rounded-xl border border-[var(--color-gold)]/30 bg-transparent px-4 py-3 text-[var(--color-text-light)] outline-none placeholder:text-[var(--color-text-light)]/40 focus:border-[var(--color-gold)]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3.5 font-heading text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-bg-dark)] transition hover:bg-[var(--color-gold-light)] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengirim
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Konfirmasi
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatedReveal>
      </div>
    </section>
  )
}
