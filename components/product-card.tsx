import { ProductImage } from 'components/product-image';
import { displayTitle, formatPrice } from 'lib/brand';
import type { Product } from 'lib/types';
import Link from 'next/link';

/**
 * Product tile used on the homepage and collection pages:
 * stone background, soft shadow under the garment, name, price and color swatches.
 */
export function ProductCard({
  product,
  currency,
  priority = false
}: {
  product: Product;
  currency: string;
  priority?: boolean;
}) {
  const title = displayTitle(product.title);
  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const price =
    minVariantPrice.amount === maxVariantPrice.amount
      ? formatPrice(minVariantPrice.amount, minVariantPrice.currencyCode)
      : `From ${formatPrice(minVariantPrice.amount, minVariantPrice.currencyCode)}`;
  const colorCount = product.options.find((o) => o.name === 'Color')?.values.length ?? 0;

  return (
    <Link
      href={`/${currency}/product/${product.handle}`}
      prefetch={true}
      className="group flex flex-col gap-[14px] text-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        {product.featuredImage?.url ? (
          <ProductImage
            src={product.featuredImage.url}
            transformedSrc={product.featuredImage.transformedUrl}
            alt={title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority={priority}
            className="object-contain p-[9%] drop-shadow-[0_14px_22px_rgba(45,35,25,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        {!product.availableForSale ? (
          <span className="label-caps absolute left-3 top-3 bg-white px-3 py-2 text-[11px] text-ink">
            Sold out
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-[6px]">
        <h3 className="text-[15px] font-medium leading-snug">{title}</h3>
        <p className="text-sm text-muted">{price}</p>
        {colorCount > 1 ? <p className="text-xs text-muted">{colorCount} colors</p> : null}
      </div>
    </Link>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
      {children}
    </div>
  );
}
