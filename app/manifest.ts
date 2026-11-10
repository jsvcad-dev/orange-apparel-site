import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Orange Apparel',
    short_name: 'Orange',
    description: 'Orange Apparel — everyday essentials, finished with a single orange.',
    start_url: '/USD?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F7F3EC',
    theme_color: '#0E3428',
    categories: ['shopping', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ],
    shortcuts: [
      {
        name: 'Shop all',
        url: '/USD/collections/all?source=pwa-shortcut',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
      }
    ]
  };
}
