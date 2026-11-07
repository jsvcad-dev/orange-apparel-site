import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { displayTitle, formatPrice } from 'lib/brand';
import { Product } from 'lib/types';
import Link from 'next/link';
import { VariantSelector } from './variant-selector';

function Disclosure({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line py-[18px]">
      <summary className="label-caps flex min-h-[24px] cursor-pointer list-none items-center justify-between text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="text-lg font-normal transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-4 text-[15px] leading-[1.7] text-[#3F3C37]">{children}</div>
    </details>
  );
}

export function ProductDescription({ product }: { product: Product }) {
  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const min = formatPrice(minVariantPrice.amount, minVariantPrice.currencyCode);
  const max = formatPrice(maxVariantPrice.amount, maxVariantPrice.currencyCode);
  const priceLabel = min === max ? min : `${min} – ${max}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-[38px] font-medium leading-[1.02] text-forest md:text-[48px]">
          {displayTitle(product.title)}
        </h1>
        <p className="text-lg">{priceLabel}</p>
        {min !== max ? <p className="text-sm text-muted">Larger sizes are priced slightly higher.</p> : null}
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      <AddToCart product={product} />

      <div className="border-t border-line">
        {product.descriptionHtml ? (
          <Disclosure title="Details & fit" open>
            <Prose html={product.descriptionHtml} className="text-[15px]" />
          </Disclosure>
        ) : null}
        <Disclosure title="Shipping & returns">
          <p>
            Shipping is calculated at checkout. See our{' '}
            <Link href="/pages/returns-faq" className="text-forest underline underline-offset-[3px]">
              Returns &amp; FAQ
            </Link>{' '}
            for details.
          </p>
        </Disclosure>
      </div>
    </div>
  );
}
