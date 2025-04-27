'use client';

import { usePathname } from 'next/navigation';

const useClientPathname = () => {
  const pathname = usePathname();
  return pathname;
};

export default useClientPathname;
