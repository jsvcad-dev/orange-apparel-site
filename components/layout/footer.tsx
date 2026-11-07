import { BRAND } from 'lib/brand';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer({ currency = 'USD' }: { currency?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-[#CFC8BB]">
      <div className="page-container flex flex-col gap-12 pb-10 pt-16">
        <div className="flex flex-wrap justify-between gap-12">
          <Image
            src="/brand/logo-cream.png"
            alt={BRAND.name}
            width={534}
            height={132}
            className="h-10 w-auto self-start"
          />
          <div className="flex flex-wrap gap-16 text-sm">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Shop</span>
              <Link href={`/${currency}/collections/all`} className="hover:text-cream">
                Shop All
              </Link>
              <Link href={`/${currency}/collections/mens`} className="hover:text-cream">
                Men&rsquo;s
              </Link>
              <Link href={`/${currency}/collections/womens`} className="hover:text-cream">
                Women&rsquo;s
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Help</span>
              {BRAND.helpPages.map((page) => (
                <Link key={page.handle} href={`/pages/${page.handle}`} className="hover:text-cream">
                  {page.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Follow</span>
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-forest-line pt-6 text-xs tracking-[0.08em] text-[#A9A294]">
          &copy; {year} {BRAND.name}
        </div>
      </div>
    </footer>
  );
}
