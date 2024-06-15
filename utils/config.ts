import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { fraxtal, fraxtalTestnet } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [fraxtal, fraxtalTestnet],
  connectors: [injected(), metaMask()],
  transports: {
    [fraxtal.id]: http(),
    [fraxtalTestnet.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
