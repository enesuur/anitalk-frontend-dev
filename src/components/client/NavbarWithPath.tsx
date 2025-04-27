'use client';
import Navbar from '@/components/ui/navbar/Navbar';
import { usePathname } from 'next/navigation';

const absoluteNavbarStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 999,
  backdropFilter: 'none',
  boxShadow: 'none',
} as React.CSSProperties;

const NavbarWithPath = () => {
  const pathname = usePathname();

  return <Navbar style={pathname === '/blogs' ? absoluteNavbarStyle : undefined} />;
};

export default NavbarWithPath;
