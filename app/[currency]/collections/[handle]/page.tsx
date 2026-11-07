import clsx from 'clsx';
import Footer from 'components/layout/footer';
import { ProductCard, ProductGrid } from 'components/product-card';
import { Wrapper } from 'components/wrapper';
import { BRAND } from 'lib/brand';
import { getCollectionProducts, getCollections, getShop, getShopOgImage } from 'lib/fourthwall';
import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ currency: string; handle: string }>;
}): Promise<Metadata> {
  const { currency, handle } = await params;
  const [products, shopOgImage, shop, collections] = await Promise.all([
    getCollectionProducts({ collection: handle, currency, limit: 1 }),
    getShopOgImage(),
    getShop(),
    getCollections()
  ]);

  const firstProduct = products[0];
  const ogImageUrl = firstProduct?.featuredImage?.url || shopOgImage;
  const collection = collections.find((c) => c.handle === handle);
  const collectionName = handle === 'all' ? 'Shop All' : collection?.title || handle;

  return {
    title: `${collectionName} | ${shop.name}`,
    openGraph: ogImageUrl ? { images: [{ url: ogImageUrl }] } : undefined,
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl ? [ogImageUrl] : undefined
    }
  };
}

export default async function CollectionPage({
  params
}: {
  params: Promise<{ currency: string; handle: string }>;
}) {
  const { currency, handle } = await params;
  const [products, shop, collections] = await Promise.all([
    getCollectionProducts({ collection: handle, currency }),
    getShop(),
    getCollections()
  ]);

  const collection = collections.find((c) => c.handle === handle);
  const title = handle === 'all' ? 'Shop All' : collection?.title || 'Collection';

  // Filter chips: "Shop All" plus nav collections that have products.
  const chipCandidates = BRAND.navCollections
    .map((h) => collections.find((c) => c.handle === h))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const chips = (
    await Promise.all(
      chipCandidates.map(async (c) =>
        (await getCollectionProducts({ collection: c.handle, currency, limit: 1 })).length ? c : null
      )
    )
  ).filter((c): c is NonNullable<typeof c> => !!c);

  const allChips = [{ handle: 'all', title: 'Shop All' }, ...chips];

  return (
    <Wrapper currency={currency} shop={shop}>
      <div className="page-container pb-24 pt-12 md:pt-16">
        <div className="mb-10 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[44px] font-medium leading-none text-forest md:text-[56px]">{title}</h1>
            <p className="text-sm text-muted">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          <nav aria-label="Collections">
            <ul className="flex flex-wrap gap-2">
              {allChips.map((c) => {
                const active = c.handle === handle;
                return (
                  <li key={c.handle}>
                    <Link
                      href={`/${currency}/collections/${c.handle}`}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'label-caps inline-flex min-h-[44px] items-center border px-5 text-[12px] transition-colors',
                        active
                          ? 'border-forest bg-forest text-cream'
                          : 'border-[#CFC8BB] text-ink hover:border-forest'
                      )}
                    >
                      {c.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {products.length === 0 ? (
          <p className="py-16 text-center text-lg text-muted">New pieces are on the way. Check back soon.</p>
        ) : (
          <ProductGrid>
            {products.map((p, i) => (
              <ProductCard key={p.handle} product={p} currency={currency} priority={i < 4} />
            ))}
          </ProductGrid>
        )}
      </div>
      <Footer currency={currency} />
    </Wrapper>
  );
}
