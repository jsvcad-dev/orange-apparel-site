/* eslint-disable @next/next/no-img-element */
import { NotifyForm } from 'components/notify-form';

const SPOTLIGHT =
  'radial-gradient(ellipse 85% 65% at 50% 32%, rgba(31,90,69,0.55) 0.0%, rgba(31,90,69,0.5488) 4.69%, rgba(31,90,69,0.5412) 9.38%, rgba(31,90,69,0.5232) 14.06%, rgba(31,90,69,0.4931) 18.75%, rgba(31,90,69,0.451) 23.44%, rgba(31,90,69,0.3986) 28.12%, rgba(31,90,69,0.3388) 32.81%, rgba(31,90,69,0.275) 37.5%, rgba(31,90,69,0.2112) 42.19%, rgba(31,90,69,0.1514) 46.88%, rgba(31,90,69,0.099) 51.56%, rgba(31,90,69,0.0569) 56.25%, rgba(31,90,69,0.0268) 60.94%, rgba(31,90,69,0.0088) 65.62%, rgba(31,90,69,0.0012) 70.31%, rgba(31,90,69,0.0) 75.0%)';

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.4 -0.2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const pillars = [
  {
    title: 'Quality, without compromise',
    body: 'Considered fabrics, honest construction, and an inspection standard applied to every piece before it reaches you.'
  },
  {
    title: 'Responsibility, by design',
    body: 'We believe a brand should leave the world better than it found it, and we build that belief into how we work and what we give back.'
  },
  {
    title: 'You, above all',
    body: 'Customer satisfaction is the measure we hold ourselves to. If something is not right, we want to hear about it and make it right.'
  }
];

export function ComingSoon() {
  const year = new Date().getFullYear();

  return (
    <main className="relative flex min-h-[100svh] flex-col bg-forest-deep text-cream">
      {/* Soft spotlight. Many eased color stops + a fine grain layer dither the
          gradient so no rings/banding show, at any screen resolution. */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: SPOTLIGHT }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: '240px 240px' }}
      />

      <header className="relative flex justify-center px-6 pt-10 md:pt-14">
        <img src="/brand/logo-cream.svg" alt="Orange Apparel" width={214} height={53} className="h-auto w-[170px] md:w-[214px]" />
      </header>

      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-24">
        <p className="label-caps tracking-eyebrow text-citrus-light">Something new is coming</p>

        <h1 className="mt-6 font-serif text-[44px] font-medium leading-[1.02] sm:text-[56px] md:text-[72px]">
          Orange Apparel is evolving
          <br />
          <span className="italic text-citrus-light">with a sharper vision.</span>
        </h1>

        <div className="mt-8 h-px w-16 bg-citrus-light/60" />

        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-cream/80 md:text-[18px]">
          Leave your email and you&rsquo;ll be the first to know when we launch.
        </p>

        <NotifyForm />
      </section>

      <section className="relative border-t border-forest-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-3 md:gap-12 md:py-16">
          {pillars.map((p) => (
            <div key={p.title} className="text-center md:text-left">
              <h2 className="font-serif text-[24px] font-medium leading-tight">{p.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative border-t border-forest-line px-6 py-8 text-center">
        <p className="label-caps text-[11px] text-cream/50">
          &copy; {year} Orange Apparel. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
