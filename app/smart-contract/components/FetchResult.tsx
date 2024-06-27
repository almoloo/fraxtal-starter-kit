import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReadContractErrorType } from 'wagmi/actions';

interface FetchResultProps {
	data: unknown;
	error: ReadContractErrorType | null;
	isPending: boolean;
}

const FetchResult = ({ data, error, isPending }: FetchResultProps) => {
	const [fetchedName, setFetchedName] = useState<string>('');

	useEffect(() => {
		setFetchedName(data as string);
	}, [data]);

	return (
		<div
			className={`alert mb-5 ${!isPending && !error ? 'green' : 'gray'} ${
				error && 'red'
			}`}
		>
			<h2 className="font-medium mb-1">Contract Data:</h2>
			{error ? (
				<>
					<p>Failed to fetch data from the smart contract.</p>
					<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
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
	);
};

export default FetchResult;
