import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/BlogLayout.module.css';

export const metadata: Metadata = {
  title: 'Blog | Anitalks',
  description: 'Learn news from ',
  keywords: ['anime', 'manga', 'anime ten', 'news'],
  authors: [{ name: 'Your Site Name' }],
  openGraph: {
    title: 'Blog | Your Site Name',
    description: 'Explore the latest updates and thoughts from our team.',
    url: 'http://localhost:3000',
    siteName: 'Anitalks',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Your Site Name',
    description: 'Explore the latest updates and thoughts from our team.',
    creator: '@yourtwitterhandle',
    images: ['https://yourdomain.com/preview-image.jpg'],
  },
};

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const rawPath = headersList.get('x-invoke-path') || headersList.get('referer') || '';
  
  // Eğer referer tam bir URL ise, pathname kısmını çekelim
  let currentPath = rawPath;
  
  try {
    const url = new URL(rawPath);
    currentPath = url.pathname;
  } catch {
  
    currentPath = rawPath;
  }
  

  return (
    <>
      <Navbar className={currentPath ? styles.absoluteNavbar : ''} />
      <main className={styles.blogLayout}>{children}</main>
      <Footer />
    </>
  );
}
