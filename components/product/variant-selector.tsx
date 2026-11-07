'use client';

import clsx from 'clsx';
import { resolveSelection, useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state: rawState, updateOption } = useProduct();
  const state = resolveSelection(rawState, options);
  const updateURL = useUpdateURL();

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  // Hide options with no values; show single-value options as a plain label.
  const visibleOptions = options.filter((option) => option.values.length > 0);
  if (!visibleOptions.length) return null;

  return (
    <div className="flex flex-col gap-7">
      {visibleOptions.map((option) => {
        const key = option.name.toLowerCase();
        const selected = state[key];
        const isSingle = option.values.length === 1;
        // Sizes like "S M L XL" sit in a tidy grid; colors wrap naturally.
        const isSize = key === 'size';

        return (
          <form key={option.id}>
            <fieldset>
              <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                {option.name}
                {selected ? <span className="font-normal normal-case tracking-normal text-muted"> — {selected}</span> : null}
              </legend>
              {isSingle ? null : (
                <div className={clsx(isSize ? 'grid grid-cols-3 gap-2 sm:grid-cols-4' : 'flex flex-wrap gap-2')}>
                  {option.values.map((value) => {
                    const optionParams = { ...state, [key]: value };
                    const filtered = Object.entries(optionParams).filter(([k, v]) =>
                      options.find((o) => o.name.toLowerCase() === k && o.values.includes(v))
                    );
                    const isAvailableForSale = combinations.find((combination) =>
                      filtered.every(([k, v]) => combination[k] === v && combination.availableForSale)
                    );
                    const isActive = selected === value;

                    return (
                      <button
                        formAction={() => {
                          const newState = updateOption(key, value);
                          updateURL(newState);
                        }}
                        key={value}
                        aria-pressed={isActive}
                        aria-disabled={!isAvailableForSale}
                        disabled={!isAvailableForSale}
                        title={`${option.name} ${value}${!isAvailableForSale ? ' (Sold out)' : ''}`}
                        className={clsx(
                          'flex min-h-[48px] min-w-[56px] items-center justify-center border px-4 text-sm transition-colors',
                          {
                            'border-forest bg-forest text-white': isActive,
                            'border-[#CFC8BB] bg-white text-ink hover:border-forest': !isActive && isAvailableForSale,
                            'cursor-not-allowed border-line bg-sand text-muted line-through': !isAvailableForSale
                          }
                        )}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              )}
            </fieldset>
          </form>
        );
      })}
    </div>
  );
}
