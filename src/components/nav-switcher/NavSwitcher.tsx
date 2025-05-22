'use client';
import React from 'react';
import { useIsMobile, useIsMounted } from '@/hooks';
import MobileNavbar from '@/components/ui/navbar/MobileNavbar';
import NavbarWithPath from '../client/NavbarWithPath';

interface INavbarSwitcherProps {
  containerStyle?: React.CSSProperties;
  mobileNavbarStyle?: React.CSSProperties;
  mobileNavbarContainerStyle?: React.CSSProperties;
}

const NavbarSwitcher: React.FC<INavbarSwitcherProps> = ({
  containerStyle,
  mobileNavbarContainerStyle,
}: INavbarSwitcherProps) => {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return isMobile ? (
    <MobileNavbar containerStyle={mobileNavbarContainerStyle} />
  ) : (
    <NavbarWithPath style={containerStyle} />
  );
};

export default React.memo(NavbarSwitcher);
