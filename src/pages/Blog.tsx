import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedText from '../components/ui/AnimatedText'
import BlogCard from '../components/ui/BlogCard'
import CTASection from '../components/ui/CTASection'
import { posts } from '../data/blog'
import { images } from '../data/images'
import { EASE } from '../utils/motion'
import usePageTitle from '../hooks/usePageTitle'

export default function Blog() {
  usePageTitle('Insights — Infynex Technologies')
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? posts : posts.filter((p) => p.category === cat)
  const [featured, ...rest] = list

  return (
    <>
      <section className="container-x pb-16 pt-40">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-6 flex items-center gap-3 text-teal-600">
          <span className="h-px w-10 bg-teal-500" /> Insights
        </motion.p>
        <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-navy-900 md:text-7xl">
          <AnimatedText text="Notes from the work." trigger="mount" delay={0.4} />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }} className="mt-6 max-w-xl text-lg text-ink-600">
          Service insights, technology articles and company updates. Client reviews and project images can be published here as they become available.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease: EASE }} className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`relative rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${cat === c ? 'text-white' : 'text-navy-900 hover:bg-ivory-200'}`}>
              {cat === c && <motion.span layoutId="blog-cat" className="absolute inset-0 -z-10 rounded-full bg-navy-900" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              {c}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="container-x pb-24 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
            {featured && (
              <div className="border-b border-navy-800/10 pb-16">
                <BlogCard post={featured} index={0} featured />
              </div>
            )}
            <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => <BlogCard key={p.slug} post={p} index={i + 1} />)}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <CTASection title="Have a question about any of these topics?" text="We are happy to talk through how they apply to your organisation." image={images.desk} compact />
    </>
  )
}
