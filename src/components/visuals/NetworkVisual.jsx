import { useMemo } from 'react';
import { motion } from 'framer-motion';
/**
 * Sophisticated SVG network: nodes connected by lines that draw in,
 * with packets travelling along the edges continuously.
 */
export default function NetworkVisual({ className = '', nodes = 14, seed = 7, color = '#6fd3ee', labels = [] }) {
    const { pts, edges } = useMemo(() => {
        let s = seed;
        const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
        const pts = Array.from({ length: nodes }, (_, i) => ({
            id: i,
            x: 8 + rnd() * 84,
            y: 10 + rnd() * 80,
            r: i % 4 === 0 ? 2.4 : 1.4,
        }));
        const edges = [];
        pts.forEach((p, i) => {
            const dists = pts.map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d);
            dists.slice(0, 2).forEach((o) => {
                if (!edges.some(([a, b]) => (a === i && b === o.j) || (a === o.j && b === i)))
                    edges.push([i, o.j]);
            });
        });
        return { pts, edges };
    }, [nodes, seed]);
    return (<svg viewBox="0 0 100 100" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {edges.map(([a, b], i) => {
            const p = pts[a], q = pts[b];
            return (<g key={i}>
            <motion.line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={color} strokeOpacity={0.25} strokeWidth={0.25} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.05 }}/>
            <motion.circle r={0.6} fill={color} filter="url(#glow)" initial={{ cx: p.x, cy: p.y, opacity: 0 }} animate={{ cx: [p.x, q.x], cy: [p.y, q.y], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.4 + (i % 5) * 0.5, repeat: Infinity, delay: (i * 0.37) % 3, ease: 'easeInOut' }}/>
          </g>);
        })}
      {pts.map((p, i) => (<g key={p.id}>
          <motion.circle cx={p.x} cy={p.y} r={p.r * 2.4} fill={color} fillOpacity={0.08} animate={{ scale: [0.85, 1.35, 0.85] }} transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}/>
          <motion.circle cx={p.x} cy={p.y} r={p.r} fill={p.r > 2 ? color : '#ffffff'} filter="url(#glow)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + i * 0.06, type: 'spring' }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}/>
          {labels[i] && (<text x={p.x + 3} y={p.y - 2} fontSize={2.2} fill="#ffffff" fillOpacity={0.6} fontFamily="Sora, sans-serif">{labels[i]}</text>)}
        </g>))}
    </svg>);
}
