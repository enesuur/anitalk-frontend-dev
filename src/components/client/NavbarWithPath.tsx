'use client';
import Navbar from '@/components/ui/navbar/Navbar';
import NavbarSwitcher from '../nav-switcher/NavSwitcher';
import { usePathname } from 'next/navigation';

const absoluteNavbarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 999,
  backdropFilter: 'none',
  boxShadow: 'none',
  borderBottom: 0,
} as React.CSSProperties;

const NavbarWithPath: React.FC = () => {
  const pathname = usePathname();

  return <Navbar style={pathname === '/blogs' ? absoluteNavbarStyle : undefined} />;
};

export default NavbarWithPath;
