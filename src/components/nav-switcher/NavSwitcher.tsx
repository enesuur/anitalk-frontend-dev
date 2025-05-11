'use client';
import React from 'react';
import { useIsMobile, useIsMounted } from '@/hooks';
import MobileNavbar from '@/components/ui/navbar/MobileNavbar';
import Navbar from '@/components/ui/navbar/Navbar';

const NavbarSwitcher: React.FC = () => {
  const isMobile = useIsMobile();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return isMobile ? <MobileNavbar /> : <Navbar />;
};

export default NavbarSwitcher;
