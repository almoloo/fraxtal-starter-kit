'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSmartContractSettings, isTestnet } from '@/utils/network-configs';
import { LinkIcon, LoaderIcon, Parentheses } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import FetchResult from '@/app/smart-contract/components/FetchResult';
import Link from 'next/link';

const page = () => {
	const {
		data: hash,
		writeContract,
		isPending: writeIsPending,
		error: writeError,
	} = useWriteContract();
	const smartContractSettings = getSmartContractSettings();
	const [name, setName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const { data, error, isPending, refetch, isFetching } = useReadContract({
		abi: smartContractSettings.abi,
		address: smartContractSettings.address as `0x${string}`,
		functionName: 'getName',
	});

	useEffect(() => {
		setName(data as string);
	}, [data]);

	useEffect(() => {
		setLoading(isPending);
	}, [writeIsPending]);

	useEffect(() => {
		if (hash) {
			setTimeout(() => {
				refetch();
			}, 5000);
		}
	}, [hash]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		writeContract({
			address: smartContractSettings.address as `0x${string}`,
			abi: smartContractSettings.abi,
			functionName: 'setName',
			args: [name],
		});
	};

	return (
		<div>
			<header className="mb-5 flex flex-col gap-3">
				<h1 className="flex items-center font-bold text-xl">
					<Parentheses className="text-neutral-500 mr-2 h-6 w-6" />
					<span>Call a Smart Contract Method</span>
				</h1>
				<p className="alert gray leading-relaxed">
					Here, you can submit data that will be recorded on the
					blockchain, using a smart contract method.
				</p>
			</header>

			<FetchResult
				data={data}
				error={error}
				isPending={isPending || isFetching}
			/>

			<form
				onSubmit={handleSubmit}
				className="border rounded p-5 flex flex-col gap-5 mb-5"
			>
				<h2 className="font-medium">
					Interact with the Smart Contract
				</h2>
				<section className="flex gap-3">
					<Input
						name="name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isPending || isFetching || writeIsPending}
					/>
					<Button
						type="submit"
						disabled={isPending || isFetching || writeIsPending}
					>
						{writeIsPending && (
							<LoaderIcon className="animate-spin w-4 h-4 mr-2" />
						)}
						Change Name
					</Button>
				</section>
				{hash && (
					<section className="alert green">
						<h3 className="font-bold mb-1">Transaction Hash:</h3>
						<pre className="text-sm">
							<Button
								variant="link"
								asChild
							>
								<Link
									href={
										isTestnet()
											? `https://holesky.fraxscan.com/tx/${hash}`
											: `https://fraxscan.com/tx/${hash}`
									}
									target="_blank"
									className="flex items-center"
								>
									<LinkIcon className="w-3 h-3 mr-1" />
									{hash}
								</Link>
							</Button>
						</pre>
					</section>
				)}
				{writeError && (
					<section className="alert red">
						<p>Failed to fetch data from the smart contract.</p>
						<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
							{writeError.message}
						</pre>
					</section>
				)}
			</form>
		</div>
	);
};

export default page;
