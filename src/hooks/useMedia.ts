import { useEffect, useState } from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** True on pointer devices ≥1024px — the full desktop experience. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px) and (hover: hover)')
/** True below 768px. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
/** OS-level reduced motion preference. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * Motion intensity: 1 on desktop, 0.5 on tablet, 0.3 on mobile, 0 when reduced-motion.
 * Used to scale parallax and 3D effects rather than remove them entirely.
 */
export function useMotionLevel() {
  const reduced = usePrefersReducedMotion()
  const desktop = useIsDesktop()
  const mobile = useIsMobile()
  if (reduced) return 0
  if (desktop) return 1
  if (mobile) return 0.3
  return 0.55
}
