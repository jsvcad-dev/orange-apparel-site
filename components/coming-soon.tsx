/* eslint-disable @next/next/no-img-element */

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
      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(31,90,69,0.55) 0%, rgba(11,42,32,0) 70%)'
        }}
      />

      <header className="relative flex justify-center px-6 pt-10 md:pt-14">
        <img src="/brand/logo-cream.png" alt="Orange Apparel" width={214} height={53} className="h-auto w-[170px] md:w-[214px]" />
      </header>

      <section className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-24">
        <p className="label-caps tracking-eyebrow text-citrus-light">A note from Orange Apparel</p>

        <h1 className="mt-6 font-serif text-[44px] font-medium leading-[1.02] sm:text-[56px] md:text-[72px]">
          Made with care.
          <br />
          Made to last.
          <br />
          <span className="italic text-citrus-light">Made for a better world.</span>
        </h1>

        <div className="mt-8 h-px w-16 bg-citrus-light/60" />

        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-cream/80 md:text-[18px]">
          Orange Apparel is built on a simple standard: every piece should earn its place in your life. We
          design thoughtfully, inspect every detail, and stand behind everything we make, because quality is
          not only how a garment feels. It is how it is made, and what it leaves behind.
        </p>

        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cream/80 md:text-[18px]">
          Our debut collection is in its final stages of preparation. We look forward to welcoming you.
        </p>
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
