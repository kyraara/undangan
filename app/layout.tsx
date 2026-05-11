import type { Metadata, Viewport } from "next"
import { Great_Vibes, Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ahmad & Siti — 12 Juli 2026",
  description:
    "Dengan penuh kebahagiaan kami mengundang kehadiran Anda di pernikahan Ahmad & Siti pada 12 Juli 2026.",
  generator: "v0.app",
  openGraph: {
    title: "Undangan Pernikahan Ahmad & Siti",
    description: "12 Juli 2026 · Bersama kami merayakan hari istimewa ini.",
    images: ["/images/gallery/hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Ahmad & Siti",
    images: ["/images/gallery/hero.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#F5ECD7",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${greatVibes.variable} ${playfair.variable} ${lora.variable} bg-background`}
    >
      <body className="font-body antialiased">
        {children}
        <Toaster position="top-center" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
