'use client';
import { useState, useEffect } from 'react';

const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default useIsMounted;
