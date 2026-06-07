"use client"

import { useEffect, useState, useRef } from "react"
import { LoadingScreen } from "@/components/layout/loading-screen"
import { MusicPlayer } from "@/components/layout/music-player"
import { HeroSection } from "@/components/sections/hero-section"
import { OpeningSection } from "@/components/sections/opening-section"
import { CoupleSection } from "@/components/sections/couple-section"
import { StorySection } from "@/components/sections/story-section"
import { EventSection } from "@/components/sections/event-section"
import { VenueSection } from "@/components/sections/venue-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { GiftSection } from "@/components/sections/gift-section"
import { RSVPSection } from "@/components/sections/rsvp-section"
import { WishesSection } from "@/components/sections/wishes-section"
import { FooterSection } from "@/components/sections/footer-section"
import { useConfig } from "@/lib/config-context"

export default function Page() {
  const { hero, music } = useConfig()
  const [opened, setOpened] = useState(false)
  const [guestName, setGuestName] = useState<string | undefined>(undefined)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to") || params.get("guest")
    if (to) setGuestName(decodeURIComponent(to))
  }, [])

  // Force play the video when component mounts to ensure immediate autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay was prevented, playing on user interaction instead:", err)
      })
    }
  }, [])

  const handleOpen = () => {
    setOpened(true)
    // Smooth-scroll to top of content
    window.scrollTo({ top: 0, behavior: "instant" })

    // Also try to play video again in case browser blocked it until user interaction
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  return (
    <>
      {/* Global Background Video for Mobile Devices (starts playing from the very beginning) */}
      {hero.videoMobile && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden fixed inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
          src={hero.videoMobile}
        />
      )}

      {/* Mobile dark overlay — lapisan gelap seragam atas video agar tidak ada batas antar section.
          z-2: di atas video(z-0), di bawah konten(z-10). */}
      <div
        className="md:hidden fixed inset-0 z-2 bg-black/42 pointer-events-none"
        aria-hidden="true"
      />

      {!opened && <LoadingScreen onOpen={handleOpen} guestName={guestName} />}

      <main className="relative z-10">
        <HeroSection />
        <OpeningSection />
        <CoupleSection />
        <StorySection />
        <EventSection />
        <VenueSection />
        <GallerySection />
        <GiftSection />
        <RSVPSection />
        <WishesSection />
        <FooterSection />
      </main>

      {opened && <MusicPlayer src={music.src} autoplay />}
    </>
  )
}
