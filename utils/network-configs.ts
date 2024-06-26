import { NetworkConfig, networkType } from './definitions';

/**
 * Configuration object for different network types.
 */
export const networkConfigs: Record<networkType, NetworkConfig> = {
	Mainnet: {
		name: 'Fraxtal Mainnet L2',
		rpc: 'https://rpc.frax.com',
		chainId: 252,
		chainIdHex: '0xfc',
		currency: 'frxETH',
		explorer: 'https://fraxscan.com',
	},
	Testnet: {
		name: 'Fraxtal Testnet L2',
		rpc: 'https://rpc.testnet.frax.com',
		chainId: 2522,
		chainIdHex: '0x9DA',
		currency: 'frxETH',
		explorer: 'https://holesky.fraxscan.com/',
	},
};

/**
 * Retrieves the Wallet Connect project ID from the environment variables.
 * @returns The Wallet Connect project ID if it exists, otherwise null.
 */
// export const getWalletConnectProjectId = () => {
//   "use server";
//   if (process.env.WALLET_CONNECT_PROJECT_ID !== undefined) {
//     return process.env.WALLET_CONNECT_PROJECT_ID;
//   } else {
//     return null;
//   }
// };

/**
 * Checks if the application is running on the testnet.
 * @returns {boolean} Returns true if the application is running on the testnet, false otherwise.
 */
export const isTestnet = () => {
	return process.env.NEXT_PUBLIC_VITE_TESTNET === '1';
};

/**
 * Retrieves the Pinata settings from environment variables.
 * @returns An object containing the Pinata gateway and JWT.
 */
export const getPinataSettings = () => {
	const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
	const jwt = process.env.PINATA_JWT;

	return {
		gateway,
		jwt,
	};
};

/**
 * Retrieves the explorer settings based on the current environment.
 * @returns An object containing the API key and base URL for the explorer.
 */
export const getExplorerSettings = () => {
	const apiKey = process.env.FRAXSCAN_API_KEY;
	const baseUrl = isTestnet()
		? process.env.FRAXSCAN_TESTNET_ENDPOINT
		: process.env.FRAXSCAN_MAINNET_ENDPOINT;

	return {
		apiKey,
		baseUrl,
	};
};

export const getSmartContractSettings = () => {
	const testnetSmartContractAddress =
		process.env.NEXT_PUBLIC_VITE_TESTNET_SMART_CONTRACT_ADDRESS!;
	const mainnetSmartContractAddress =
		process.env.NEXT_PUBLIC_VITE_MAINNET_SMART_CONTRACT_ADDRESS!;

	return {
		address: isTestnet()
			? testnetSmartContractAddress
			: mainnetSmartContractAddress,
		abi: [
			{
				inputs: [],
				name: 'getName',
				outputs: [
					{
						internalType: 'string',
						name: '',
						type: 'string',
					},
				],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [],
				name: 'name',
				outputs: [
					{
						internalType: 'string',
						name: '',
						type: 'string',
					},
				],
				stateMutability: 'view',
				type: 'function',
			},
			{
				inputs: [
					{
						internalType: 'string',
						name: 'newName',
						type: 'string',
					},
				],
				name: 'setName',
				outputs: [],
				stateMutability: 'nonpayable',
				type: 'function',
			},
		],
	};
};
