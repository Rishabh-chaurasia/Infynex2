import { lazy, Suspense, type ComponentType } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

const CHUNK_RELOAD_KEY = 'infynex-chunk-reload'

function lazyWithRetry<T extends ComponentType<object>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const module = await factory()
      sessionStorage.removeItem(CHUNK_RELOAD_KEY)
      return module
    } catch (error) {
      if (!sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
        window.location.reload()
        return new Promise<never>(() => undefined)
      }
      sessionStorage.removeItem(CHUNK_RELOAD_KEY)
      throw error
    }
  })
}

const Services = lazyWithRetry(() => import('./pages/Services'))
const About = lazyWithRetry(() => import('./pages/About'))
const Industries = lazyWithRetry(() => import('./pages/Industries'))
const Blog = lazyWithRetry(() => import('./pages/Blog'))
const BlogPost = lazyWithRetry(() => import('./pages/BlogPost'))
const Contact = lazyWithRetry(() => import('./pages/Contact'))
const NotFound = lazyWithRetry(() => import('./pages/NotFound'))

const ServiceDetail = lazyWithRetry(() => import('./pages/ServiceDetail'))

function Fallback() {
  return <div className="route-fallback min-h-screen bg-navy-900" aria-hidden />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="about" element={<About />} />
            <Route path="industries" element={<Industries />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
