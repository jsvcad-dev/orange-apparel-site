'use client';

import { useState } from "react";

const Currencies = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY',
];

export function CurrencySelector({ currency }: { currency: string; }) {
  const selectedCurrency = currency;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newCurrency: string) => {
    // Replace currency segment in path (e.g., /USD/product/foo -> /EUR/product/foo)
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = newCurrency;
    const newPath = pathParts.join('/');
    window.location.href = newPath;

    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          aria-label={`Currency: ${selectedCurrency}`}
          aria-expanded={isOpen}
          className="inline-flex h-11 items-center justify-center px-2 text-[13px] font-medium tracking-[0.08em] text-ink hover:text-forest-hover"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCurrency}
          <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-36 border border-line bg-white shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Currencies.map((currency) => (
              <button
                key={currency}
                className="block w-full px-4 py-3 text-left text-sm text-ink hover:bg-sand"
                role="menuitem"
                onClick={() => handleSelect(currency)}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
