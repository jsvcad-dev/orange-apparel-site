/**
 * Orange Apparel — site-wide brand settings.
 * Edit the copy and links here; every page reads from this file.
 */
export const BRAND = {
  name: 'Orange Apparel',
  tagline: 'A Higher State of Comfort',
  intro: 'Everyday essentials, finished with a single orange. Made for slow mornings and long days.',
  instagram: 'https://instagram.com/Itsorangeapparel',
  announcement: {
    text: 'Now available —',
    linkLabel: 'The Serendipity Tee',
    productHandle: 'the-serendipity-tee-white'
  },
  // The editorial "feature" block on the homepage
  feature: {
    eyebrow: 'The Essential',
    title: 'The Serendipity Tee',
    body: 'A clean everyday tee with our orange at the chest and a quiet message on the sleeve. Wear it alone or under everything.',
    image: '/brand/serendipity-model.webp',
    imageAlt: 'Model wearing The Serendipity Tee in white',
    links: [
      { label: 'Shop White', handle: 'the-serendipity-tee-white' },
      { label: 'Shop Black', handle: 'the-serendipity-tee-black' }
    ]
  },
  // Collections shown in the main navigation, in this order. Empty collections are hidden automatically.
  navCollections: ['mens', 'womens', 'kids'],
  // Footer help pages (served from your Fourthwall shop's pages)
  helpPages: [
    { label: 'Contact', handle: 'contact' },
    { label: 'Returns & FAQ', handle: 'returns-faq' },
    { label: 'Privacy Policy', handle: 'privacy-policy' },
    { label: 'Terms of Service', handle: 'terms-of-service' }
  ]
};

const SMALL_WORDS = new Set(['a', 'an', 'and', 'of', 'the', 'in', 'on', 'for', 'to', 'with']);

/**
 * Product names in Fourthwall are a mix of ALL CAPS and Title Case.
 * This normalises them to Title Case so the storefront looks consistent.
 * ("CAMPUS STANDOUT LONG SLEEVE" -> "Campus Standout Long Sleeve")
 */
export function displayTitle(raw: string): string {
  if (!raw) return raw;
  const letters = raw.replace(/[^A-Za-z]/g, '');
  const isAllCaps = letters.length > 0 && letters === letters.toUpperCase();
  if (!isAllCaps) return raw;

  return raw
    .toLowerCase()
    .split(/(\s+|\(|\)|-)/)
    .map((word, i) => {
      if (!word.trim() || /^[\s()-]+$/.test(word)) return word;
      if (i > 0 && SMALL_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/** Price without the trailing currency code, e.g. "$95" or "$97.50". */
export function formatPrice(amount: string, currencyCode: string): string {
  const value = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value);
}
