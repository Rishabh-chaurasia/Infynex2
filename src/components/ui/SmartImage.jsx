import { useState } from 'react';
/**
 * Builds an abstract, brand-coloured SVG used when an external image cannot load.
 * Deterministic per source so the same image always gets the same fallback.
 */
function fallbackFor(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++)
        h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const rnd = () => {
        h = (h * 1664525 + 1013904223) >>> 0;
        return h / 4294967296;
    };
    const hue = 195 + rnd() * 25;
    const shapes = Array.from({ length: 7 }, () => {
        const x = rnd() * 100;
        const y = rnd() * 100;
        const r = 12 + rnd() * 30;
        const o = 0.08 + rnd() * 0.18;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="hsl(${hue + rnd() * 30} 70% ${55 + rnd() * 20}%)" opacity="${o}"/>`;
    }).join('');
    const lines = Array.from({ length: 6 }, () => {
        const y = rnd() * 100;
        return `<line x1="0" y1="${y}" x2="100" y2="${y + (rnd() - 0.5) * 40}" stroke="hsl(${hue} 60% 75%)" stroke-width="0.25" opacity="0.5"/>`;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1533"/><stop offset="1" stop-color="#1a2b5c"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/>${shapes}${lines}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
/**
 * Lazy image with graceful abstract fallback.
 * Fades in when loaded so reveals feel intentional.
 */
export default function SmartImage({ src, alt = '', className = '', style, ...rest }) {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    return (<img src={failed ? fallbackFor(src) : src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} onLoad={() => setLoaded(true)} className={`${className} transition-opacity duration-700`} style={{ opacity: loaded || failed ? 1 : 0, ...style }} {...rest}/>);
}
