import { useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';
import SmartImage from '../components/ui/SmartImage';
import BlogCard from '../components/ui/BlogCard';
import CTASection from '../components/ui/CTASection';
import { getPost, posts } from '../data/blog';
import { services } from '../data/services';
import { EASE, fadeUp, viewportOnce } from '../utils/motion';
import usePageTitle from '../hooks/usePageTitle';
import { useMotionLevel } from '../hooks/useMedia';
const fmt = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
export default function BlogPost() {
    const { slug = '' } = useParams();
    const post = getPost(slug);
    usePageTitle(post ? `${post.title} — Infynex Technologies` : 'Article — Infynex Technologies');
    const heroRef = useRef(null);
    const level = useMotionLevel();
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200 * level]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const { scrollYProgress: pageProgress } = useScroll();
    const bar = useSpring(pageProgress, { stiffness: 100, damping: 30 });
    if (!post)
        return <Navigate to="/blog" replace/>;
    const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
    const relatedService = services.find((s) => post.category.toLowerCase().includes(s.navTitle.toLowerCase().split(' ')[0]));
    return (<>
      <motion.div style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-teal-500" aria-hidden/>

      <article>
        <header className="container-x pb-12 pt-40">
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8 flex items-center gap-2 text-xs text-ink-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-navy-900">Home</Link><ChevronRight className="h-3 w-3"/>
            <Link to="/blog" className="hover:text-navy-900">Insights</Link><ChevronRight className="h-3 w-3"/>
            <span className="text-navy-900">{post.category}</span>
          </motion.nav>
          <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="inline-block rounded-full bg-navy-900 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">{post.category}</motion.span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-navy-900 md:text-6xl">
            <AnimatedText text={post.title} trigger="mount" delay={0.4} stagger={0.03}/>
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-6 flex items-center gap-3 text-sm text-ink-400">
            <time dateTime={post.date}>{fmt(post.date)}</time><span className="h-1 w-1 rounded-full bg-ink-400"/><span>{post.readTime}</span>
          </motion.div>
        </header>

        <div ref={heroRef} className="container-x">
          <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} transition={{ duration: 1.3, ease: EASE, delay: 0.5 }} className="relative aspect-[21/9] overflow-hidden rounded-[2rem]">
            <motion.div style={{ y, scale }} className="absolute inset-[-10%]"><SmartImage src={post.image} alt="" className="h-full w-full object-cover"/></motion.div>
          </motion.div>
        </div>

        <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_2fr_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <Link to="/blog" className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-navy-900"><ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1"/> All articles</Link>
              {relatedService && (<div className="mt-10 rounded-2xl border border-navy-800/10 bg-white p-5">
                  <p className="eyebrow text-[0.6rem] text-teal-600">Related service</p>
                  <Link to={relatedService.path} className="mt-2 block font-display font-semibold text-navy-900 hover:text-teal-600">{relatedService.title}</Link>
                </div>)}
            </div>
          </aside>
          <div className="prose-infynex">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-xl leading-relaxed text-navy-900">{post.excerpt}</motion.p>
            {post.body.map((para, i) => (<motion.p key={i} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-6 text-lg leading-relaxed text-ink-600">{para}</motion.p>))}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-10 rounded-2xl border-l-4 border-teal-500 bg-ivory-100 p-5 text-sm text-ink-600">
              This article is general guidance from Infynex Technologies and does not describe a specific client engagement.
            </motion.div>
          </div>
        </div>
      </article>

      <section className="container-x pb-24">
        <h2 className="font-display text-3xl font-semibold text-navy-900">More insights</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {related.map((p, i) => <BlogCard key={p.slug} post={p} index={i}/>)}
        </div>
      </section>

      <CTASection compact/>
    </>);
}
