import { createConfig, http } from "wagmi";
import { fraxtal, fraxtalTestnet } from "wagmi/chains";
// import { injected, metaMask } from "wagmi/connectors";
import { isTestnet } from "./network-configs";
import { createPublicClient } from "viem";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: isTestnet() ? [fraxtalTestnet] : [fraxtal],
  connectors: [
    // injected(),
    // metaMask({
    //   dappMetadata: {
    //     name: "Fraxtal Starter Kit",
    //     url: "http://localhost:3000",
    //   },
    // }),
  ],
  transports: {
    [fraxtal.id]: http(),
    [fraxtalTestnet.id]: http(),
  },
  ssr: true,
});
