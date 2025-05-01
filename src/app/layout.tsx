import { Poppins } from 'next/font/google';
import Providers from '@/providers/Providers';
import '@/styles/globals.css';
import SlideLoader from '@/shared/ui/loaders/SlideLoading';
import Cookie from '@/components/cookie/Cookie';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Anitalk - Talk geeks',
  description: 'Discover the latest in anime, manga, donghua, and more with Anitalk.',
  keywords:
    'anime, manga, donghua, novels, manhwa, manhua, cartoons, seiyu, actors, studios, reviews, news, events, cosplay, expos, conventions, figures, games, music',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${poppins.className}`} suppressHydrationWarning>
      <body>
        <SlideLoader />
        <Providers>{children}</Providers>
        <Cookie />
      </body>
    </html>
  );
}

export default RootLayout;
