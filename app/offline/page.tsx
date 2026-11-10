export const dynamic = 'force-static';

export const metadata = {
  title: 'Offline — Orange Apparel',
  robots: { index: false, follow: false }
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-green.png" alt="Orange Apparel" width={214} height={53} className="mb-10" />
      <h1 className="font-serif text-[36px] font-medium leading-none text-forest">You&rsquo;re offline.</h1>
      <p className="mt-4 max-w-sm text-muted">
        Reconnect to keep shopping. Your bag is saved and will be right where you left it.
      </p>
      <a href="/USD" className="btn-primary mt-8 inline-block px-8">
        Try again
      </a>
    </main>
  );
}
