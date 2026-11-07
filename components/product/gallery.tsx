'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ProductImage } from 'components/product-image';
import { resolveSelection, useProduct, useUpdateURL } from 'components/product/product-context';
import { displayTitle } from 'lib/brand';
import { Product } from 'lib/types';

export function Gallery({ product }: { product: Product }) {
  const { state: rawState, updateImage } = useProduct();
  const state = resolveSelection(rawState, product.options);
  const updateURL = useUpdateURL();
  const title = displayTitle(product.title);

  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.find((option) => option.name === 'Color' && option.value === state['color'])
  );

  const variantImages = selectedVariant?.images?.length ? selectedVariant.images : null;
  const images = (variantImages || product.images).slice(0, 8);

  const requested = state.image ? parseInt(state.image) : 0;
  const imageIndex = requested >= 0 && requested < images.length ? requested : 0;
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const go = (index: number) => {
    const newState = updateImage(index.toString());
    updateURL(newState);
  };

  const current = images[imageIndex];

  return (
    <form className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
        {current ? (
          <ProductImage
            className="object-contain p-[7%] drop-shadow-[0_18px_28px_rgba(45,35,25,0.18)]"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            alt={`${title} — image ${imageIndex + 1} of ${images.length}`}
            src={current.url}
            transformedSrc={current.transformedUrl}
            priority={true}
          />
        ) : null}

        {images.length > 1 ? (
          <div className="absolute bottom-5 right-5 flex bg-white/90 text-ink backdrop-blur">
            <button
              formAction={() => go(previousImageIndex)}
              aria-label="Previous image"
              className="flex h-11 w-11 items-center justify-center hover:text-forest-hover"
            >
              <ArrowLeftIcon className="h-5" />
            </button>
            <button
              formAction={() => go(nextImageIndex)}
              aria-label="Next image"
              className="flex h-11 w-11 items-center justify-center border-l border-line hover:text-forest-hover"
            >
              <ArrowRightIcon className="h-5" />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.url}>
                <button
                  formAction={() => go(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={isActive}
                  className={clsx(
                    'relative block aspect-[4/5] w-full overflow-hidden bg-stone outline outline-1 -outline-offset-1 transition',
                    isActive ? 'outline-forest' : 'outline-transparent hover:outline-[#CFC8BB]'
                  )}
                >
                  <ProductImage
                    className="object-contain p-[8%]"
                    fill
                    sizes="96px"
                    alt=""
                    src={image.url}
                    transformedSrc={image.transformedUrl}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
