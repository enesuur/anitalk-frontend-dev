import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/Layout.module.css';

function NotificationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.notificationLayout}>{children}</main>
      <Footer />
    </>
  );
}

export default NotificationLayout;
