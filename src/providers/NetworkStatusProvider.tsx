'use client';
import React from 'react';
import useConnectionChecker from '@/hooks/useConnectionChecker';

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
    useConnectionChecker();


  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default NetworkStatusProvider;
