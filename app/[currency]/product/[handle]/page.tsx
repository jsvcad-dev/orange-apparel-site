import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import { ProductViewTracker } from 'components/product/product-view-tracker';
import { Wrapper } from 'components/wrapper';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { ProductCard, ProductGrid } from 'components/product-card';
import { displayTitle } from 'lib/brand';
import { getCollectionProducts, getProduct, getShop, getShopOgImage } from 'lib/fourthwall';
import Link from 'next/link';
import { Suspense } from 'react';

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
  const [product, shopOgImage, shop] = await Promise.all([
    getProduct({ handle, currency }),
    getShopOgImage(),
    getShop()
  ]);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  // Priority: product featured image, then shop OG image
  const ogImageUrl = url || shopOgImage;

  return {
    title: `${displayTitle(product.title)} | ${shop.name}`,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: ogImageUrl
      ? {
          images: [
            {
              url: ogImageUrl,
              ...(url ? { width, height, alt } : {})
            }
          ]
        }
      : undefined,
    twitter: {
      card: 'summary_large_image',
      images: ogImageUrl ? [ogImageUrl] : undefined
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ currency: string; handle: string }> }) {
  const { currency, handle } = await params;

  const [product, shop, allProducts] = await Promise.all([
    getProduct({ handle, currency }),
    getShop(),
    getCollectionProducts({ collection: 'all', currency })
  ]);

  if (!product) return notFound();

  const related = allProducts.filter((p) => p.handle !== product.handle).slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: displayTitle(product.title),
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <Wrapper currency={currency} shop={shop}>
      <Suspense fallback={null}>
        <ProductProvider>
        <ProductViewTracker product={product} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd)
          }}
        />
        <nav aria-label="Breadcrumb" className="page-container pt-5 text-xs tracking-[0.08em] text-muted">
          <Link href={`/${currency}`} className="hover:text-forest">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/${currency}/collections/all`} className="hover:text-forest">Shop All</Link>
          <span aria-hidden="true"> / </span>
          <span className="text-ink">{displayTitle(product.title)}</span>
        </nav>
        <div className="page-container flex flex-col gap-10 pb-20 pt-6 lg:flex-row lg:items-start lg:gap-14">
          <div className="min-w-0 lg:basis-[58%]">
            <Suspense fallback={<div className="aspect-[4/5] w-full bg-stone" />}>
              <Gallery product={product} />
            </Suspense>
          </div>
          <div className="lg:sticky lg:top-28 lg:max-w-[480px] lg:basis-[42%]">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        {related.length ? (
          <section aria-label="Pairs well with" className="page-container pb-24">
            <h2 className="section-title mb-8">Pairs Well With</h2>
            <ProductGrid>
              {related.map((p, i) => (
                <ProductCard key={p.handle} product={p} currency={currency} index={i} />
              ))}
            </ProductGrid>
          </section>
        ) : null}
        <Footer currency={currency} />
        </ProductProvider>
      </Suspense>
    </Wrapper>
  );
}
