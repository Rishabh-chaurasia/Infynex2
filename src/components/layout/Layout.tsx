import { useLocation, useOutlet } from 'react-router-dom'
import { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Cursor from './Cursor'
import PageTransition from './PageTransition'

export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <div className="site-light cursor-none-desktop">
      <Cursor />
      <Navbar />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
      >
        <PageTransition key={location.pathname}>
          <Suspense fallback={<div className="route-fallback min-h-screen bg-ivory-50" aria-hidden />}>
            <main id="main">{outlet}</main>
          </Suspense>
          <Footer />
        </PageTransition>
      </AnimatePresence>
    </div>
  )
}
