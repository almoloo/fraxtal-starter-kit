/**
 * Represents the type of network.
 * It can be either 'Mainnet' or 'Testnet'.
 */
export type networkType = "Mainnet" | "Testnet";

/**
 * Represents the configuration for a network.
 */
export interface NetworkConfig {
  name: string;
  rpc: string;
  chainId: number;
  chainIdHex: string;
  currency: string;
  explorer: string;
}
