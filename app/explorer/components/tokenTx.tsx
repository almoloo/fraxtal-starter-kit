import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getTokenTransfers } from '@/utils/data';
import { TokenTransferResponse } from '@/utils/definitions';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

const TokenTx = () => {
	const [address, setAddress] = useState(
		'0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3'
	);
	const [contractAddress, setContractAddress] = useState(
		'0xfc00000000000000000000000000000000000005'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [response, setResponse] = useState<TokenTransferResponse[] | null>(
		null
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const tokenTransfers = await getTokenTransfers(
				address,
				contractAddress
			);
			if (typeof tokenTransfers === 'string')
				throw new Error(tokenTransfers);
			setResponse(tokenTransfers);
		} catch (error) {
			setError(error as string);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="border rounded p-5 flex flex-col gap-5 mb-5"
		>
			<h2 className="font-medium">
				Get a list of 'ERC20 - Token Transfer Events' by Address
			</h2>
			<section className="flex gap-3">
				<Input
					type="text"
					placeholder="address"
					defaultValue={address}
					onChange={(e) => setAddress(e.target.value)}
					disabled={loading}
				/>
				<Input
					type="text"
					placeholder="contract address"
					defaultValue={contractAddress}
					onChange={(e) => setContractAddress(e.target.value)}
					disabled={loading}
				/>
				<Button
					type="submit"
					disabled={
						loading ||
						address.length === 0 ||
						contractAddress.length === 0
					}
				>
					{loading && (
						<LoaderIcon className="animate-spin w-4 h-4 mr-2" />
					)}
					Submit
				</Button>
			</section>
			{response && (
				<section className="alert green">
					<h3 className="font-bold mb-1">Fetched Data:</h3>
					<pre className="text-sm whitespace-break-spaces break-words">
						{JSON.stringify(response, null, 2)}
					</pre>
				</section>
			)}
			{error && (
				<section className="alert red">
					<p>Failed to fetch token transactions:</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
						{error.toString()}
					</pre>
				</section>
			)}
		</form>
	);
};

export default TokenTx;
