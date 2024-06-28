import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getFrxEthBalance } from '@/utils/data';
import { EthBalanceResponse } from '@/utils/definitions';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

const EthBalance = () => {
	const [address, setAddress] = useState(
		'0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [response, setResponse] = useState<EthBalanceResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const balance = await getFrxEthBalance([address]);
			setResponse(balance);
		} catch (error: unknown) {
			console.error('Failed to fetch frxETH balance:', error);
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
				Get frxETH Balance for a single Address
			</h2>
			<section className="flex gap-3">
				<Input
					type="text"
					placeholder="address/addresses"
					defaultValue={address}
					onChange={(e) => setAddress(e.target.value)}
					disabled={loading}
				/>
				<Button
					type="submit"
					disabled={loading || address.length === 0}
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
					<p>Failed to fetch frxETH balance:</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
						{error.toString()}
					</pre>
				</section>
			)}
		</form>
	);
};

export default EthBalance;
