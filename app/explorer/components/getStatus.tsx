import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getContractExecutionStatus } from '@/utils/data';
import { ContractExecutionStatusResponse } from '@/utils/definitions';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

const GetStatus = () => {
	const [txHash, setTxHash] = useState(
		'0xc2c1cccb3cc92c959c91b2b6451f29734f67675ac39949552fee82237e5d052f'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [response, setResponse] =
		useState<ContractExecutionStatusResponse | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResponse(null);

		try {
			const status = await getContractExecutionStatus(txHash);
			setResponse(status);
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
			<h2 className="font-medium">Check Contract Execution Status</h2>
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
					<p>Failed to fetch contract execution status:</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
						{error.toString()}
					</pre>
				</section>
			)}
		</form>
	);
};

export default GetStatus;
