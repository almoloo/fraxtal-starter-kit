'use client';

import { getSmartContractSettings } from '@/utils/network-configs';
import { BracesIcon, LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import FetchResult from '@/app/smart-contract/components/FetchResult';

const page = () => {
	const smartContractSettings = getSmartContractSettings();

	const { data, error, isPending } = useReadContract({
		abi: smartContractSettings.abi,
		address: smartContractSettings.address as `0x${string}`,
		functionName: 'getName',
	});

	return (
		<div>
			<header className="mb-5 flex flex-col gap-3">
				<h1 className="flex items-center font-bold text-xl">
					<BracesIcon className="text-neutral-500 mr-2 h-6 w-6" />
					<span>Get Data from Smart Contract</span>
				</h1>
				<p className="alert gray leading-relaxed">
					This interface allows you to interact with our smart
					contract to retrieve specific data securely and efficiently.
					Below is the current data fetched from our smart contract:
				</p>
			</header>

			<FetchResult
				data={data}
				error={error}
				isPending={isPending}
			/>

			<div>
				<h3 className="text-lg font-bold mb-3">How it Works:</h3>
				<p>
					The data you see is a direct reflection of the state of our
					smart contract on the blockchain. It's updated in real-time,
					providing a transparent and immutable record of transactions
					and interactions. This level of transparency is crucial for
					trust and verification in decentralized systems.
				</p>
			</div>
		</div>
	);
};

export default page;
