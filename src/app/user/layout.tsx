import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/UserLayout.module.css';

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.userLayout}>{children}</main>
      <Footer />
    </>
  );
}

export default UserLayout;
