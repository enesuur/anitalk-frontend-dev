'use client';
import React from 'react';
import { useIsMobile, useIsMounted } from '@/hooks';
import MobileNavbar from '@/components/ui/navbar/MobileNavbar';
import Navbar from '@/components/ui/navbar/Navbar';

interface INavbarSwitcherProps {
  containerStyle?: React.CSSProperties;
}

const NavbarSwitcher: React.FC<INavbarSwitcherProps> = ({
  containerStyle,
}: INavbarSwitcherProps) => {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return isMobile ? (
    <MobileNavbar containerStyle={containerStyle} />
  ) : (
    <Navbar style={containerStyle} />
  );
};

export default React.memo(NavbarSwitcher);
