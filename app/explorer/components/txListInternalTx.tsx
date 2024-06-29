import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getInternalTransactionsByHash } from '@/utils/data';
import { InternalTransactionByHashResponse } from '@/utils/definitions';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

const TxListInternalTx = () => {
	const [txHash, setTxHash] = useState(
		'0x96f3f60fd07e63b72ed5fbb5e6f99406f46e756862e9dcdd6cdd601246cd199e'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [response, setResponse] = useState<
		InternalTransactionByHashResponse[] | null
	>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const transactions = await getInternalTransactionsByHash(txHash);
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
				Get 'Internal Transactions' by Transaction Hash
			</h2>
			<section className="flex gap-3">
				<Input
					type="text"
					placeholder="txHash"
					defaultValue={txHash}
					onChange={(e) => setTxHash(e.target.value)}
					disabled={loading}
				/>
				<Button
					type="submit"
					disabled={loading || txHash.length === 0}
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
					<p>Failed to fetch transactions:</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
						{error.toString()}
					</pre>
				</section>
			)}
		</form>
	);
};

export default TxListInternalTx;
