"use client"

import { useEffect, useRef, useState } from "react"
import { Music, Pause } from "lucide-react"

interface MusicPlayerProps {
  src?: string
  autoplay?: boolean
}

export function MusicPlayer({ src, autoplay = true }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [hasAudio, setHasAudio] = useState(false)

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.5
    audio.preload = "auto"
    audio.addEventListener("canplay", () => setHasAudio(true))
    audio.addEventListener("error", () => setHasAudio(false))
    audioRef.current = audio

    if (autoplay) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [src, autoplay])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  // Always show a decorative toggle even without an audio file
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
      className="fixed bottom-5 right-5 z-[400] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-dark)] text-[var(--color-gold-light)] shadow-card transition hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)] sm:bottom-7 sm:right-7"
    >
      {playing && (
        <span
          aria-hidden="true"
          className="pulse-ring absolute inset-0 rounded-full border-2 border-[var(--color-gold)]"
        />
      )}
      {playing ? (
        <Pause className="h-5 w-5" />
      ) : (
        <Music className={`h-5 w-5 ${hasAudio ? "spin-slow" : ""}`} />
      )}
    </button>
  )
}
