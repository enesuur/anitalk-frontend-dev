import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import styles from './_styles/SettingsLayout.module.css';

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.settingsLayout}>{children}</main>
      <Footer />
    </>
  );
}

export default SettingsLayout;
