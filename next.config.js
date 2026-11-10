const COMING_SOON = process.env.NEXT_PUBLIC_COMING_SOON !== 'false';

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.fourthwall.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '*.fourthwall.dev',
        port: '',
        search: '',
      }
    ]
  },
  async rewrites() {
    // Pre-launch: every page URL shows the coming-soon page (static files and analytics still pass through).
    const beforeFiles = COMING_SOON
      ? [
          {
            source:
              '/:path((?!_next|_c|api|brand|icons|coming-soon|favicon\\.ico|apple-icon|sw\\.js|manifest\\.webmanifest|robots\\.txt|opengraph-image).*)',
            destination: '/coming-soon'
          }
        ]
      : [];
    return { beforeFiles, afterFiles: [
      {
        source: '/_c/mtg.js',
        destination: 'https://www.googletagmanager.com/gtm.js'
      },
      {
        source: '/_c/g/:path*',
        destination: 'https://www.google-analytics.com/g/:path*'
      },
      {
        source: '/_c/_/:path*',
        destination: 'https://www.googletagmanager.com/_/:path*'
      }
    ] };
  }
};
