'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { resolveSelection, useProduct } from 'components/product/product-context';
import { useShop } from 'components/shop/shop-context';
import { trackAddToCart } from 'lib/analytics';
import { Product, ProductVariant } from 'lib/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    'label-caps relative flex min-h-[56px] w-full items-center justify-center bg-forest px-6 text-cream transition-colors';
  const disabledClasses = 'cursor-not-allowed bg-line text-muted';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Sold out
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select a size"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Select a size
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, 'hover:bg-forest-hover')}
    >
      Add to bag
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem, refreshCart } = useCart();
  const { state: rawState } = useProduct();
  const state = resolveSelection(rawState, product.options);
  const { shop } = useShop();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        trackAddToCart({
          currency: finalVariant.price.currencyCode,
          value: parseFloat(finalVariant.price.amount),
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              item_variant: finalVariant.title,
              item_brand: shop.name,
              price: parseFloat(finalVariant.price.amount),
              quantity: 1,
              currency: finalVariant.price.currencyCode
            }
          ],
          shopId: shop.id
        });
        await actionWithVariant();
        refreshCart();
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
