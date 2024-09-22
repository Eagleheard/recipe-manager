"use client";

import { ReactNode } from 'react';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
