import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImageReveal from './ImageReveal';
import { EASE } from '../../utils/motion';
const fmt = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export default function BlogCard({ post, index = 0, featured = false }) {
    return (<motion.article initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.12 }} className={`group ${featured ? 'md:grid md:grid-cols-2 md:items-center md:gap-12' : ''}`} data-cursor="hover">
      <Link to={`/blog/${post.slug}`} className="block">
        <ImageReveal src={post.image} alt={post.title} className={`rounded-3xl ${featured ? 'aspect-[4/3]' : 'aspect-[16/11]'}`} direction={index % 2 ? 'right' : 'left'}>
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-navy-900 backdrop-blur">
            {post.category}
          </span>
        </ImageReveal>
      </Link>
      <div className={featured ? 'mt-8 md:mt-0' : 'mt-6'}>
        <div className="flex items-center gap-3 text-xs text-ink-400">
          <time dateTime={post.date}>{fmt(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-ink-400"/>
          <span>{post.readTime}</span>
        </div>
        <h3 className={`mt-3 font-display font-semibold leading-tight text-navy-900 ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          <Link to={`/blog/${post.slug}`} className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_2px]">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-ink-600">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-teal-600">
          Read more <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"/>
        </Link>
      </div>
    </motion.article>);
}
