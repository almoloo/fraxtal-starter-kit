import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getInternalTransactions } from '@/utils/data';
import { InternalTransactionResponse } from '@/utils/definitions';
import { LoaderIcon } from 'lucide-react';
import React from 'react';

const TxListInternal = () => {
	const [address, setAddress] = React.useState(
		'0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3'
	);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);
	const [response, setResponse] = React.useState<
		InternalTransactionResponse[] | null
	>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const transactions = await getInternalTransactions(address);
			if (typeof transactions === 'string')
				throw new Error('Invalid address');
			setResponse(transactions);
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
				Get a list of 'Internal' Transactions by Address
			</h2>
			<section className="flex gap-3">
				<Input
					type="text"
					placeholder="address"
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
					<p>Failed to fetch internal transactions:</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
						{error.toString()}
					</pre>
				</section>
			)}
		</form>
	);
};

export default TxListInternal;
