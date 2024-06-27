'use client';

import { getSmartContractSettings } from '@/utils/network-configs';
import { BracesIcon, LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';

const page = () => {
	const smartContractSettings = getSmartContractSettings();
	const [fetchedName, setFetchedName] = useState<string>('');

	const { data, error, isPending } = useReadContract({
		abi: smartContractSettings.abi,
		address: smartContractSettings.address as `0x${string}`,
		functionName: 'getName',
	});

	useEffect(() => {
		setFetchedName(data as string);
	}, [data]);

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
			<div
				className={`alert mb-5 ${
					!isPending && !error ? 'green' : 'gray'
				} ${error && 'red'}`}
			>
				<h2 className="font-medium mb-1">Contract Data:</h2>
				{error ? (
					<>
						<p>Failed to fetch data from the smart contract.</p>
						<pre className="mt-3 bg-rose-100/50 p-5">
							{error.message}
						</pre>
					</>
				) : (
					<div className="flex items-center gap-3">
						<span className="font-light">Name: </span>
						{isPending ? (
							<LoaderIcon className="animate-spin h-4 w-4" />
						) : (
							<strong>{fetchedName}</strong>
						)}
					</div>
				)}
			</div>
			<div>
				<h3 className="text-lg font-bold mb-3">How it Works:</h3>
				<p>
					The data displayed is retrieved in real-time from a smart
					contract deployed on the blockchain. When you access this
					page, a read-only transaction is executed to fetch the
					latest state of the data stored in the smart contract. This
					process ensures that the data you see is always up to date.
				</p>
			</div>
		</div>
	);
};

export default page;
