import '@fontsource/cormorant-garamond/500-italic.css';
import { ComingSoon } from 'components/coming-soon';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Orange Apparel',
  description:
    'Orange Apparel. Made with care, made to last, made for a better world. Our debut collection is in its final stages of preparation.',
  openGraph: {
    type: 'website',
    siteName: 'Orange Apparel',
    title: 'Orange Apparel',
    description: 'Made with care. Made to last. Made for a better world.',
    images: [{ url: '/brand/share-coming-soon.jpg', width: 1200, height: 630, alt: 'Orange Apparel' }]
  },
  twitter: { card: 'summary_large_image', images: ['/brand/share-coming-soon.jpg'] }
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
