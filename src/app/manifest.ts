import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Anitalk',
    short_name: 'Anitalk',
    description: 'Discover the latest in anime, manga, donghua, and more with Anitalk',
    start_url: '/',
    display: 'standalone',
    background_color: '#171717;',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
