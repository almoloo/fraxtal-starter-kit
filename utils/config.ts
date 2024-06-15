import { createConfig, http } from "wagmi";
import { fraxtal, fraxtalTestnet } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [fraxtal, fraxtalTestnet],
  transports: {
    [fraxtal.id]: http(),
    [fraxtalTestnet.id]: http(),
  },
});
