'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DownloadIcon, LoaderIcon } from 'lucide-react';
import { useState } from 'react';

const page = () => {
	const [hash, setHash] = useState('');
	const [json, setJson] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await fetch(`/api/v1/ipfs/fetch?hash=${hash}`);
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();
			setJson(data);
		} catch (error: unknown) {
			setError(error as string);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<header className="mb-5 flex flex-col gap-3">
				<h1 className="flex items-center font-bold text-xl">
					<DownloadIcon className="text-neutral-500 mr-2 h-6 w-6" />
					<span>Fetch Data/File from IPFS</span>
				</h1>
				<p className="alert gray leading-relaxed">
					This interface allows you to fetch a file or data from IPFS
					based on its hash. Enter the IPFS hash below and click
					"Fetch" to retrieve the content.
				</p>
			</header>
			<form
				onSubmit={handleSubmit}
				className="border rounded p-5 flex flex-col gap-5 mb-5"
			>
				<h2 className="font-medium">Fetch from IPFS</h2>
				<section className="flex gap-3">
					<Input
						type="text"
						placeholder="IPFS Hash"
						defaultValue={hash}
						onChange={(e) => setHash(e.target.value)}
						disabled={loading}
					/>
					<Button
						type="submit"
						disabled={loading || hash.length === 0}
					>
						{loading && (
							<LoaderIcon className="animate-spin w-4 h-4 mr-2" />
						)}
						Fetch
					</Button>
				</section>
				{json.length > 0 && (
					<section className="alert green">
						<h3 className="font-bold mb-1">Fetched Data:</h3>
						<pre className="text-sm whitespace-break-spaces break-words">
							{json.map((item, index) => (
								<p key={index}>{JSON.stringify(item)}</p>
							))}
						</pre>
					</section>
				)}
				{error && (
					<section className="alert red">
						<p>Failed to fetch data from IPFS.</p>
						<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
							{error.toString()}
						</pre>
					</section>
				)}
			</form>
		</div>
	);
};

export default page;
