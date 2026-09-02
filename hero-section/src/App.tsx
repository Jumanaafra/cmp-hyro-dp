import { useEffect, useRef } from 'react'
import { Globe, ArrowRight, Instagram, Twitter } from 'lucide-react'
import './index.css'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const FADE_DURATION_MS = 500
const FADE_OUT_TRIGGER_SEC = 0.55

/* ── Custom requestAnimationFrame fade system ── */
function createFader(videoEl: HTMLVideoElement) {
  let rafId: number | null = null

  function cancelCurrent() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function fadeIn() {
    cancelCurrent()
    const start = performance.now()
    const startOpacity = videoEl.style.opacity === '' ? 0 : parseFloat(videoEl.style.opacity)

    function step(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / FADE_DURATION_MS, 1)
      videoEl.style.opacity = String(startOpacity + (1 - startOpacity) * t)
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        rafId = null
      }
    }
    rafId = requestAnimationFrame(step)
  }

  function fadeOut(onComplete?: () => void) {
    cancelCurrent()
    const start = performance.now()
    const startOpacity = videoEl.style.opacity === '' ? 1 : parseFloat(videoEl.style.opacity)

    function step(now: number) {
      const elapsed = now - start
      const t = Math.min(elapsed / FADE_DURATION_MS, 1)
      videoEl.style.opacity = String(startOpacity * (1 - t))
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        videoEl.style.opacity = '0'
        rafId = null
        onComplete?.()
      }
    }
    rafId = requestAnimationFrame(step)
  }

  return { fadeIn, fadeOut, cancelCurrent }
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const faderRef = useRef<ReturnType<typeof createFader> | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'
    const fader = createFader(video)
    faderRef.current = fader

    /* ── On play / loop start → fade in ── */
    const handlePlay = () => {
      fadingOutRef.current = false
      fader.fadeIn()
    }

    /* ── timeUpdate: trigger fade-out when close to end ── */
    const handleTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime
      if (remaining <= FADE_OUT_TRIGGER_SEC && !fadingOutRef.current) {
        fadingOutRef.current = true
        fader.fadeOut()
      }
    }

    /* ── On ended: snap to 0, wait 100ms, reset + play + fade in ── */
    const handleEnded = () => {
      video.style.opacity = '0'
      fader.cancelCurrent()
      fadingOutRef.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 100)
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      fader.cancelCurrent()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col">
      {/* ── Full-screen Background Video ── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        style={{ opacity: 0, zIndex: 0 }}
      />

      {/* Dark overlay for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Navigation ── */}
      <nav className="relative z-20 pl-6 pr-6 py-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          {/* Left: Logo + links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg">Asme</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['Features', 'Pricing', 'About'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              Sign Up
            </button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        {/* Email + CTA block */}
        <div className="max-w-xl w-full space-y-4">
          {/* Email input bar */}
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none min-w-0"
            />
            <button
              className="bg-white rounded-full p-3 text-black flex-shrink-0 hover:bg-white/90 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-white text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our
            newsletter today and never miss out on exciting updates.
          </p>

          {/* Manifesto CTA */}
          <div className="flex justify-center">
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
              Read our manifesto
            </button>
          </div>
        </div>
      </div>

      {/* ── Social Icons Footer ── */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Instagram size={20} />
        </button>
        <button
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Twitter size={20} />
        </button>
        <button
          aria-label="Website"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe size={20} />
        </button>
      </div>
    </div>
  )
}

export default App
