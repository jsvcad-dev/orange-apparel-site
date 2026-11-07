'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

/**
 * Gently fades and lifts its content into view the first time it scrolls on screen.
 * - Content already on screen when the page loads is left alone (no flash on load).
 * - Visitors who prefer reduced motion see everything immediately.
 * - Server-rendered HTML is fully visible, so nothing is hidden if JavaScript fails.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number; // milliseconds
  as?: 'div' | 'section' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Already visible on load: don't animate.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setState('hidden');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('shown');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={clsx(
        className,
        state === 'hidden' && 'reveal-hidden',
        state === 'shown' && 'reveal-shown'
      )}
      style={state === 'shown' && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
