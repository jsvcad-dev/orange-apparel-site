import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import { GTM_ID } from 'lib/analytics';
import { getAnalyticsConfig } from 'lib/fourthwall';
import { ensureStartsWith } from 'lib/utils';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const siteHost = (process.env.NEXT_PUBLIC_VERCEL_URL || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
const baseUrl = siteHost ? `https://${siteHost}` : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Orange Apparel',
    template: '%s'
  },
  description: 'Orange Apparel — everyday essentials, finished with a single orange.',
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const analytics = await getAnalyticsConfig();

  return (
    <html lang="en">
      <head>
        <Script id="analytics-config" strategy="beforeInteractive">
          {`
            window.creatorGa4Id = '${analytics.ga4Id}';
            window.creatorFbPixelId = '${analytics.fbPixelId}';
            window.creatorTiktokAnalyticsId = '${analytics.tiktokId}';
            window.creatorKlaviyoAnalyticsId = '${analytics.klaviyoId}';
            window.useServerAnalytics = ${analytics.useServerAnalytics};
            window.cookie_policy = 'ShowInEu';
          `}
        </Script>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '/_c/mtg.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="bg-white text-ink selection:bg-citrus-light/60">
        {children}
      </body>
    </html>
  );
}
