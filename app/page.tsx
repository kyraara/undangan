"use client"

import { useEffect, useState } from "react"
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

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [guestName, setGuestName] = useState<string | undefined>(undefined)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to") || params.get("guest")
    if (to) setGuestName(decodeURIComponent(to))
  }, [])

  const handleOpen = () => {
    setOpened(true)
    // Smooth-scroll to top of content
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  return (
    <>
      {!opened && <LoadingScreen onOpen={handleOpen} guestName={guestName} />}

      <main>
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

      {opened && <MusicPlayer autoplay />}
    </>
  )
}
