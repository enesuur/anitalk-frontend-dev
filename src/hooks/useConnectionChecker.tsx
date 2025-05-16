'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { remoteInstance } from '@/http/axios';
import ENDPOINTS from '@/http/endpoints';
import Sonner from '@/shared/ui/sonner/Sonner';
import useIsMounted from './useIsMounted';
import { ISonnerToast } from '@/types/global';

const useConnectionChecker: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(navigator.onLine);
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: '',
    message: '',
  });

  const isMounted = useIsMounted();

  useEffect(() => {
    const handleOnline = async () => {
      try {
        const response = await fetch(ENDPOINTS.getNetworkCheck, {
          method: 'GET',
          cache: 'no-store',
        });

        if (response.status === 204) {
          await remoteInstance.get(window.location.pathname, {
            headers: { 'Cache-Control': 'no-store' },
          });

          setToast({
            isOpen: true,
            title: 'Back Online',
            message: 'Your internet connection is back.',
            type: 'success',
          });

          location.reload();
        }
      } catch (error) {
        console.error('Network Error', error);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);

      setToast({
        isOpen: true,
        title: 'Connection Lost',
        message: 'Your internet connection is lost.',
        type: 'danger',
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <React.Fragment>
      {toast.isOpen && (
        <Sonner
          isOpen={toast.isOpen}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast({ ...toast, isOpen: false })}
        />
      )}
    </React.Fragment>
  );
};

export default useConnectionChecker;
