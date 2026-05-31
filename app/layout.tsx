export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from "next"
import { Great_Vibes, Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { getConfig } from "@/lib/get-config"
import { ConfigProvider } from "@/lib/config-context"
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Ahmad & Siti — 03 Juli 2026",
  description:
    "Dengan penuh kebahagiaan kami mengundang kehadiran Anda di pernikahan Ahmad Fauzi & Siti Rahayu pada 03 Juli 2026.",
  openGraph: {
    title: "Undangan Pernikahan Ahmad Fauzi & Siti Rahayu",
    description: "03-04 Juli 2026 · Bersama kami merayakan hari istimewa ini.",
    images: ["/images/gallery/hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan Ahmad Fauzi & Siti Rahayu",
    images: ["/images/gallery/hero.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#F5ECD7",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const config = await getConfig()
  const themeClass = `theme-${config.concept}`
  return (
    <html
      lang="id"
      className={`${themeClass} ${greatVibes.variable} ${playfair.variable} ${lora.variable} bg-background`}
    >
      <body className="font-body antialiased">
        <ConfigProvider config={config}>
          {children}
          <Toaster position="top-center" />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ConfigProvider>
      </body>
    </html>
  )
}
