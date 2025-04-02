import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/AuthLayout.module.css';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.authLayout}>{children}</main>
      <Footer />
    </>
  );
}

export default AuthLayout;
