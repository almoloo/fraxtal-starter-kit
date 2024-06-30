# Fraxtal Starter Kit 🚀

Welcome to **Fraxtal Starter Kit**, the ultimate boilerplate starter-kit for blockchain developers looking to jumpstart their projects on the Fraxtal network! With a focus on security, efficiency, and ease of use, this CLI tool initializes a feature-rich development environment on your device, letting you focus on what you do best: building amazing decentralized applications.

## Features ✨

-   **Vast Explorer API**: Access a comprehensive explorer API on the backend without exposing any API keys.
-   **IPFS Integration**: Easily upload to and fetch data from IPFS using the [Pinata](https://www.pinata.cloud) service, with ready-to-use API and components.
-   **Smart Contract Boilerplate**: Jumpstart your smart contract development with a boilerplate project, including a sample contract already deployed to Fraxtal mainnet and testnet.
-   **Wallet Connection**: Seamlessly connect wallets using MetaMask, WalletConnect, and integrated wallets, all set up and ready to use.
-   **Next.js & TypeScript**: Build your frontend with the power of Next.js and TypeScript, ensuring type safety and server-side rendering capabilities.
-   **Tailwind CSS**: Enjoy a pre-configured Tailwind CSS setup for rapid UI development.
-   **Shadcn UI Components**: Utilize pre-installed Shadcn UI components for beautiful and responsive designs.
-   **Hardhat Setup**: Get straight to development with Hardhat installed and configured for smart contract compilation, testing, and deployment.

## Getting Started 🚀

To create a new project, simply run:

```bash
npx create-frax-app my-frax-project
cd my-frax-project
```

This will set up a new project directory with all the features listed above, ready for development.

```
npm install
npm run dev
```

Before you can use this kit to its potential, you need to setup your environment variables. There are two `.env.local` files in this project, one is located in the root of your project and one in the `smart-contract` directory.

`NEXT_PUBLIC_VITE_TESTNET` 0 for mainnet and 1 for testnet

`WALLET_CONNECT_PROJ_ID` [Retreive from WalletConnect](https://cloud.walletconnect.com)

`NEXT_PUBLIC_PINATA_GATEWAY`, `NEXT_PUBLIC_PINATA_GATEWAY_TOKEN`, `PINATA_JWT`, `PINATA_API_KEY`, `PINATA_API_SECRET` [Retreive from Pinata](https://www.pinata.cloud)

`FRAXSCAN_API_KEY` [ Retreive from FraxScan ](https://fraxscan.com)

And now your project is ready and running on port 3000 (if not taken already).

## Sample Contract Deployment 📄

After adding your private key to a .env file inside `smart-contract` directory, deploy the sample contract to the Fraxtal network with a single command:

```bash
cd smart-contract

# Deploy to testnet
npm run deploytestnet

# Deploy to mainnet
npm run deploymainnet
```

## Connect Your Wallet 🔗

Injected wallets like metamask are supported out-of-the-box, and you can add support for more wallets by following [Wagmi's documentations](https://wagmi.sh/react/guides/connect-wallet)

## Contributing 🤝

I welcome contributions! If you have suggestions for improvements or want to contribute code, please contact me at:

✉️ [amousavig@icloud.com](mailto:amousavig@icloud.com)

## License 📄

Create-Frax-App is open source and available under the MIT license. See the [LICENSE file](./LICENSE) for more info.

---

Happy building! 🚀🛠
