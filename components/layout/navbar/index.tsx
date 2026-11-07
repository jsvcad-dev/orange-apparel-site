import CartModal from 'components/cart/modal';
import { BRAND } from 'lib/brand';
import { getCollectionProducts, getCollections } from 'lib/fourthwall';
import Image from 'next/image';
import Link from 'next/link';
import { CurrencySelector } from './currency';
import { MobileMenu } from './mobile-menu';
import { ShrinkHeader } from './shrink-header';

export type NavLink = { label: string; href: string };

async function getNavLinks(currency: string): Promise<NavLink[]> {
  const collections = await getCollections();

  const candidates = BRAND.navCollections
    .map((handle) => collections.find((c) => c.handle === handle))
    .filter((c): c is NonNullable<typeof c> => !!c);

  // Hide collections that have no products yet (e.g. an empty "Kids" collection).
  const withProducts = await Promise.all(
    candidates.map(async (c) => {
      const products = await getCollectionProducts({ collection: c.handle, currency, limit: 1 });
      return products.length ? c : null;
    })
  );

  return [
    { label: 'Shop All', href: `/${currency}/collections/all` },
    ...withProducts
      .filter((c): c is NonNullable<typeof c> => !!c)
      .map((c) => ({ label: c.title, href: `/${currency}/collections/${c.handle}` }))
  ];
}

export async function Navbar({ currency }: { currency: string }) {
  const links = await getNavLinks(currency);

  return (
    <>
      <div className="bg-forest px-4 py-[11px] text-center text-[12px] uppercase tracking-label text-cream">
        {BRAND.announcement.text}{' '}
        <Link
          href={`/${currency}/product/${BRAND.announcement.productHandle}`}
          className="underline underline-offset-[3px] hover:text-white"
        >
          {BRAND.announcement.linkLabel}
        </Link>
      </div>

      <ShrinkHeader>
        <nav
          aria-label="Primary"
          className="page-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 transition-[padding] duration-500 ease-out md:py-[18px] group-data-[scrolled=true]:py-2 md:group-data-[scrolled=true]:py-2.5"
        >
          <div className="flex items-center">
            <MobileMenu links={links} />
            <ul className="hidden items-center gap-8 lg:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    className="label-caps font-medium text-ink hover:text-forest-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={`/${currency}`}
            prefetch={true}
            aria-label={`${BRAND.name} home`}
            className="block justify-self-center"
          >
            <Image
              src="/brand/logo-green.png"
              alt={BRAND.name}
              width={534}
              height={132}
              priority
              className="h-9 w-auto transition-[height] duration-500 ease-out md:h-[46px] group-data-[scrolled=true]:h-7 md:group-data-[scrolled=true]:h-9"
            />
          </Link>

          <div className="flex items-center justify-end gap-1 md:gap-3">
            <div className="hidden sm:block">
              <CurrencySelector currency={currency} />
            </div>
            <CartModal />
          </div>
        </nav>
      </ShrinkHeader>
    </>
  );
}
