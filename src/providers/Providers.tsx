'use client';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
