import { useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'

export default function MinimalHero() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      linkRef.current?.click()
    }, 1500)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  return (
    <section className="flex flex-col justify-center px-6 pt-32 pb-12">
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="font-mono text-4xl md:text-6xl font-normal tracking-tight">
              Samarth Verma
            </h1>
            <div className="w-24 h-px bg-foreground" />
          </div>
          <div className="max-w-2xl">
            <p className="font-mono text-lg md:text-xl leading-relaxed text-muted-foreground">
              CSE (AI/ML) student & Full Stack Developer
              <br />
              researching Multimodal AI, NLP, and
              <br />
              Human-Computer Interaction.
              <br />
              Building systems that communicate meaningfully with non-expert users.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-8">
            <a
              ref={linkRef}
              href="/resume.pdf"
              download
              aria-label="Download Resume"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative inline-flex h-11 items-center overflow-hidden border border-green-500/40 px-8 font-mono text-sm transition-colors duration-[1500ms] hover:border-green-500"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-green-500 transition-transform duration-[1500ms] ease-in-out group-hover:scale-y-100" />
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-green-400/30 blur-sm transition-transform duration-[1800ms] ease-in-out group-hover:scale-y-100" />
              <span className="relative z-10 text-green-500 transition-colors duration-[1500ms] group-hover:text-background">
                download resume &darr;
              </span>
            </a>
            <a href="#work">
              <Button variant="outline" size="lg" className="font-mono">
                projects
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" size="lg" className="font-mono">
                contact
              </Button>
            </a>
          </div>
          <div>
            <div className="w-2 h-16 bg-border animate-pulse mb-5" />
          </div>
        </div>
      </div>
    </section>
  )
}