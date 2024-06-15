import { NetworkConfig, networkType } from "./definitions";

/**
 * Configuration object for different network types.
 */
export const networkConfigs: Record<networkType, NetworkConfig> = {
  Mainnet: {
    name: "Fraxtal Mainnet L2",
    rpc: "https://rpc.frax.com",
    chainId: 252,
    chainIdHex: "0xfc",
    currency: "frxETH",
    explorer: "https://fraxscan.com",
  },
  Testnet: {
    name: "Fraxtal Testnet L2",
    rpc: "https://rpc.testnet.frax.com",
    chainId: 2522,
    chainIdHex: "0x9DA",
    currency: "frxETH",
    explorer: "https://holesky.fraxscan.com/",
  },
};
