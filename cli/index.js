#!/usr/bin/env node
const { program } = require('commander');
const { exec } = require('shelljs');

program
	.name('create-frax-app')
	.arguments('<project-name>', 'Name of the project to create')
	.action((projectName) => {
		console.log(`Creating project ${projectName}...`);
		exec(
			`git clone https://github.com/almoloo/fraxtal-starter-kit.git ${projectName}`
		);
		console.log(`Project ${projectName} created!`);

		console.log(`Installing dependencies...`);
		exec(`cd ${projectName} && npm install`, { silent: true });
		console.log(`Dependencies installed!`);

		console.log('Setting up environment variables...');
		// Create a .env file in the project directory with the following content "NEXT_PUBLIC_VITE_TESTNET=1, WALLET_CONNECT_PROJ_ID=<WALLET_CONNECT_PROJECT_ID>, NEXT_PUBLIC_PINATA_GATEWAY=<PINATA_GATEWAY>, NEXT_PUBLIC_PINATA_API_KEY=<PINATA_API_KEY>, NEXT_PUBLIC_PINATA_SECRET_API_KEY=<PINITA_SECRET_API_KEY>"
		exec(`touch ${projectName}/.env.local`);
		exec(`
            echo "# GENERAL
            
            NEXT_PUBLIC_VITE_TESTNET=1

            # WALLET CONNECT
            WALLET_CONNECT_PROJ_ID=<WALLET_CONNECT_PROJECT_ID>

            # PINATA
            NEXT_PUBLIC_PINATA_GATEWAY=<PINATA_GATEWAY>
            NEXT_PUBLIC_PINATA_GATEWAY_TOKEN=<PINATA_GATEWAY_TOKEN>
            PINATA_JWT=<PINATA_JWT>
            PINATA_API_KEY=<PINATA_API_KEY>
            PINATA_API_SECRET=<PINATA_API_SECRET>

            # FRAXSCAN
            FRAXSCAN_API_KEY=<FRAXSCAN_API_KEY>
            FRAXSCAN_MAINNET_ENDPOINT=https://api.fraxscan.com/api
            FRAXSCAN_TESTNET_ENDPOINT=https://api-holesky.fraxscan.com/api

            # SMART CONTRACT
            NEXT_PUBLIC_VITE_TESTNET_SMART_CONTRACT_ADDRESS=0x4993610a2E430D6B5cbF7bbD894ec9Dc3F195035
            NEXT_PUBLIC_VITE_MAINNET_SMART_CONTRACT_ADDRESS=0x46405C02BB00f9215351277788c9F96857BC91A5
            " >> ${projectName}/.env.local
        `);

		exec(`touch ${projectName}/smart-contract/.env.local`);
		exec(`
            echo "# Replace the following with your own private key in order to deploy the smart contract
            PRIVATE_KEY=<PRIVATE_KEY>" >> ${projectName}/smart-contract/.env.local
        `);
		console.log('Environment variables set up!');

		exec(`rm -rf ${projectName}/cli`);

		console.log(`
        🎉 Project created successfully!
        ‼⚠️ Make sure to replace the placeholders in the .env files with your own values.
        🏁 To start the project, run the following commands:
        cd ${projectName}
        npm run dev
        `);
	});

program.parse();
