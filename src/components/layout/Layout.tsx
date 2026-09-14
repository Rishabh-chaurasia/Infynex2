import { useLocation, useOutlet } from 'react-router-dom'
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
          <main id="main">{outlet}</main>
          <Footer />
        </PageTransition>
      </AnimatePresence>
    </div>
  )
}
