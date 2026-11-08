import clsx from 'clsx';
import Footer from 'components/layout/footer';
import { ProductCard, ProductGrid } from 'components/product-card';
import { ProductImage } from 'components/product-image';
import { Reveal } from 'components/reveal';
import { Wrapper } from 'components/wrapper';
import { BRAND } from 'lib/brand';
import { getCollectionProducts, getCollections, getShop } from 'lib/fourthwall';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ currency: 'USD' }, { currency: 'EUR' }, { currency: 'GBP' }, { currency: 'CAD' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShop();
  // Branded share image (logo + products on forest green) instead of Fourthwall's default.
  const shareImage = { url: '/brand/share.jpg', width: 1200, height: 630, alt: `${BRAND.name} — ${BRAND.tagline}` };

  return {
    title: `${shop.name} — ${BRAND.tagline}`,
    description: BRAND.intro,
    openGraph: {
      type: 'website',
      siteName: BRAND.name,
      title: `${shop.name} — ${BRAND.tagline}`,
      description: BRAND.intro,
      images: [shareImage]
    },
    twitter: {
      card: 'summary_large_image',
      images: [shareImage.url]
    }
  };
}

function SectionHeader({ title, href, linkLabel = 'Shop all' }: { title: string; href: string; linkLabel?: string }) {
  return (
    <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <h2 className="section-title">{title}</h2>
      <Link href={href} className="label-caps border-b border-forest pb-1 text-forest hover:text-forest-hover">
        {linkLabel}
      </Link>
    </Reveal>
  );
}

export default async function HomePage({ params }: { params: Promise<{ currency: string }> }) {
  const currency = (await params).currency;
  const homeCollection = process.env.NEXT_PUBLIC_FW_COLLECTION || 'all';

  const [shop, products, collections] = await Promise.all([
    getShop(),
    getCollectionProducts({ collection: homeCollection, currency }),
    getCollections()
  ]);

  const newArrivals = products.slice(0, 4);
  const more = products.slice(4, 8);

  // Category tiles: nav collections that actually have products, each shown with its first product.
  const categoryTiles = (
    await Promise.all(
      BRAND.navCollections.map(async (handle) => {
        const collection = collections.find((c) => c.handle === handle);
        if (!collection) return null;
        const [first] = await getCollectionProducts({ collection: handle, currency, limit: 1 });
        return first ? { collection, product: first } : null;
      })
    )
  ).filter((t): t is NonNullable<typeof t> => !!t);

  const shopAllHref = `/${currency}/collections/all`;

  return (
    <Wrapper currency={currency} shop={shop}>
      {/* Hero — products sit on the right of the image, copy on the left. Below 1200px they stack. */}
      <section aria-label="Featured" className="relative overflow-hidden bg-[#0E2E23]">
        {/* Served as-is (no re-compression) so the dark gradient stays smooth; the grain in the file prevents banding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-1600.jpg"
          srcSet="/brand/hero-1000.jpg 1000w, /brand/hero-1600.jpg 1600w, /brand/hero-2400.jpg 2400w"
          sizes="100vw"
          width={2400}
          height={1000}
          alt="The Good Day Hoodie, Campus Standout Long Sleeve, Sheer Focus Sweater and Legacy Sketch Cap"
          fetchPriority="high"
          decoding="async"
          className="block aspect-[4/3] w-full object-cover object-[72%_center] sm:aspect-[16/10] xl:aspect-[12/5] xl:max-h-[780px] xl:object-right"
        />
        <div className="flex flex-col justify-center gap-5 px-6 pb-14 pt-9 sm:px-[6vw] xl:absolute xl:inset-y-0 xl:left-0 xl:w-[46%] xl:py-10 xl:pr-0">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-citrus-light">The Fall Edit</p>
          <h1 className="font-serif text-[44px] font-medium leading-[0.98] text-cream sm:text-[56px] xl:text-[clamp(48px,4.6vw,76px)]">
            {BRAND.tagline}
          </h1>
          <p className="max-w-[440px] text-[17px] leading-relaxed text-[#D9D3C7]">{BRAND.intro}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={shopAllHref}
              className="label-caps inline-flex min-h-[52px] items-center justify-center bg-cream px-8 text-forest transition-colors hover:bg-white"
            >
              Shop the Collection
            </Link>
            {categoryTiles[0] ? (
              <Link
                href={`/${currency}/collections/${categoryTiles[0].collection.handle}`}
                className="label-caps inline-flex min-h-[52px] items-center justify-center border border-cream px-8 text-cream transition-colors hover:bg-cream hover:text-forest"
              >
                Shop {categoryTiles[0].collection.title}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {newArrivals.length ? (
        <section className="page-container pb-10 pt-20 md:pt-24">
          <SectionHeader title="New Arrivals" href={shopAllHref} />
          <ProductGrid>
            {newArrivals.map((p, i) => (
              <ProductCard key={p.handle} product={p} currency={currency} priority={i < 2} index={i} />
            ))}
          </ProductGrid>
        </section>
      ) : null}

      {/* Editorial feature */}
      <section aria-label="Featured story" className="page-container py-14 md:py-[72px]">
        <Reveal className="flex flex-col bg-sand md:flex-row">
          <div className="relative md:w-1/2">
            <Image
              src={BRAND.feature.image}
              alt={BRAND.feature.imageAlt}
              width={1200}
              height={1600}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full max-h-[760px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 px-6 py-12 md:w-1/2 md:px-[7%] md:py-16">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-citrus">{BRAND.feature.eyebrow}</p>
            <h2 className="font-serif text-[44px] font-medium leading-[1.02] text-forest md:text-[54px]">
              {BRAND.feature.title}
            </h2>
            <p className="max-w-[440px] text-[17px] leading-[1.7] text-[#3F3C37]">{BRAND.feature.body}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {BRAND.feature.links.map((link, i) => (
                <Link
                  key={link.handle}
                  href={`/${currency}/product/${link.handle}`}
                  className={i === 0 ? 'btn-primary' : 'btn-outline'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {more.length ? (
        <section className="page-container pb-20 pt-10 md:pb-24">
          <SectionHeader title="More to Explore" href={shopAllHref} />
          <ProductGrid>
            {more.map((p, i) => (
              <ProductCard key={p.handle} product={p} currency={currency} index={i} />
            ))}
          </ProductGrid>
        </section>
      ) : null}

      {categoryTiles.length ? (
        <section aria-label="Shop by category" className="page-container pb-20 md:pb-24">
          <div
            className={clsx(
              'grid grid-cols-1 gap-4 md:gap-6',
              categoryTiles.length === 1 ? '' : categoryTiles.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {categoryTiles.map(({ collection, product }, i) => (
              <Reveal key={collection.handle} delay={i * 120}>
              <Link
                href={`/${currency}/collections/${collection.handle}`}
                className={clsx(
                  'group relative block overflow-hidden bg-stone',
                  categoryTiles.length < 3 ? 'aspect-[4/5] sm:aspect-[5/4]' : 'aspect-[4/5]'
                )}
              >
                <ProductImage
                  src={product.featuredImage.url}
                  transformedSrc={product.featuredImage.transformedUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-[12%] drop-shadow-[0_14px_22px_rgba(45,35,25,0.18)] transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="label-caps absolute bottom-6 left-6 bg-white px-[22px] py-[14px] text-forest">
                  Shop {collection.title}
                </span>
              </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Instagram band */}
      <section aria-label="Follow us" className="bg-forest text-cream">
        <Reveal className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-8 px-6 py-20 md:px-12">
          <div className="flex max-w-[520px] flex-col gap-3">
            <h2 className="font-serif text-[40px] font-medium leading-[1.05] md:text-[44px]">First to know.</h2>
            <p className="text-base leading-relaxed text-[#D9D3C7]">
              New drops, restocks and behind-the-scenes — follow along on Instagram.
            </p>
          </div>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps inline-flex min-h-[52px] items-center justify-center border border-cream px-8 text-cream transition-colors hover:bg-cream hover:text-forest"
          >
            @itsorangeapparel
          </a>
        </Reveal>
      </section>

      <Footer currency={currency} />
    </Wrapper>
  );
}
