'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky header that tightens once the page is scrolled: less padding, smaller logo,
 * and a soft shadow. Children style themselves with `group-data-[scrolled=true]:` classes.
 */
export function ShrinkHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      // Hysteresis so it doesn't flicker when resting near the threshold.
      setScrolled((prev) => (prev ? window.scrollY > 24 : window.scrollY > 64));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur transition-shadow duration-500 data-[scrolled=true]:shadow-[0_6px_24px_-12px_rgba(14,52,40,0.25)]"
    >
      {children}
    </header>
  );
}
