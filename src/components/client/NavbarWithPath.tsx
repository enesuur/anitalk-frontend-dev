'use client';
import Navbar from '@/components/ui/navbar/Navbar';
import { usePathname } from 'next/navigation';
import { CSSProperties } from 'react';

const absoluteNavbarStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 999,
  backdropFilter: '0px',
  boxShadow: 'none',
  borderBottom: 0,
  background: 'none',
};

interface INavbarWithPath {
  style?: CSSProperties;
}

const NavbarWithPath: React.FC<INavbarWithPath> = ({ style }) => {
  const pathname = usePathname();

  const mergedStyle = pathname === '/blogs' ? { ...style, ...absoluteNavbarStyle } : style;

  return <Navbar style={mergedStyle} />;
};

export default NavbarWithPath;
