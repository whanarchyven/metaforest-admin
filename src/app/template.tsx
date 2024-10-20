'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

const Template = ({ children }: any) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{children}</ChakraProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Template;
