export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];
export const spring = { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 };
export const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
    }),
};
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: EASE } },
};
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
};
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
});
/** Clip-path wipe from the given direction. */
export const clipReveal = (dir = 'left') => {
    const from = {
        left: 'inset(0 100% 0 0)',
        right: 'inset(0 0 0 100%)',
        up: 'inset(100% 0 0 0)',
        down: 'inset(0 0 100% 0)',
    }[dir];
    return {
        hidden: { clipPath: from },
        visible: { clipPath: 'inset(0 0 0 0)', transition: { duration: 1.3, ease: EASE } },
    };
};
export const lineGrow = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
};
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' };
