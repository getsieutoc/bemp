'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';
import { SWRConfig } from 'swr';

import { ChakraProvider } from '@/components/chakra';
import { theme, toastOptions } from '@/configs/chakra';
import { configs } from '@/configs/swr';
import dynamic from 'next/dynamic';

const ColorModeScript = dynamic(
  () => import('@chakra-ui/react').then((mod) => mod.ColorModeScript),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={configs}>
      <SessionProvider>
        <JotaiProvider>
          <CacheProvider>
            <ColorModeScript initialColorMode="system" />
            <ChakraProvider
              theme={theme}
              toastOptions={{ defaultOptions: toastOptions }}
            >
              {children}
            </ChakraProvider>
          </CacheProvider>
        </JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
