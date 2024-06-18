"use client";

import { config } from "@/utils/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
