'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoaderIcon, UploadIcon } from 'lucide-react';
import { useState } from 'react';

const page = () => {
	const [response, setResponse] = useState<object | null>(null);
	const [fileResponse, setFileResponse] = useState<object | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);
	const [data, setData] = useState('[]');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [currentTab, setCurrentTab] = useState<'data' | 'file'>('data');
	const [loading, setLoading] = useState<boolean>(false);

	const handleDataSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setResponse(null);
		setError(null);
		try {
			setLoading(true);
			// CHECK IF DATA IS VALID JSON
			try {
				JSON.parse(data);
			} catch (e) {
				setError('Invalid JSON data');
				return;
			}
			const form = new FormData();
			form.append('json', data);

			const res = await fetch('/api/v1/ipfs/upload', {
				method: 'POST',
				body: form,
			});
			const json = await res.json();
			setResponse(json);
		} catch (error: unknown) {
			setResponse(null);
			setError(error as string);
		} finally {
			setLoading(false);
		}
	};

	const handleFileSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFileResponse(null);
		setFileError(null);
		try {
			setLoading(true);
			const form = new FormData();
			if (selectedFile) {
				form.append('file', selectedFile);

				const res = await fetch('/api/v1/ipfs/upload', {
					method: 'POST',
					body: form,
				});
				const json = await res.json();
				setFileResponse(json);
			} else {
				setFileResponse(null);
				setFileError('Please select a file to upload.');
			}
		} catch (error: unknown) {
			setFileResponse(null);
			setFileError(error as string);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<header className="mb-5 flex flex-col gap-3">
				<h1 className="flex items-center font-bold text-xl">
					<UploadIcon className="text-neutral-500 mr-2 h-6 w-6" />
					<span>Upload Data/File to IPFS</span>
				</h1>
				<p className="alert gray leading-relaxed">
					This interface allows you to upload and store a file or data
					to IPFS and retrieve the hash of the content. Enter the data
					or select a file below and click "Save" to store the
					content.
				</p>
			</header>
			<form
				className="border rounded p-5 flex flex-col gap-5 mb-5"
				onSubmit={
					currentTab === 'data' ? handleDataSubmit : handleFileSubmit
				}
			>
				<h2 className="font-medium">Save to IPFS</h2>
				<section className="flex gap-3">
					<Button
						variant={
							currentTab === 'data' ? 'default' : 'secondary'
						}
						onClick={() => setCurrentTab('data')}
						type="button"
						disabled={loading}
					>
						Save Data
					</Button>
					<Button
						variant={
							currentTab === 'file' ? 'default' : 'secondary'
						}
						onClick={() => setCurrentTab('file')}
						type="button"
						disabled={loading}
					>
						Upload File
					</Button>
				</section>
				{currentTab === 'data' ? (
					<section className="flex flex-col items-end gap-3">
						<Textarea
							placeholder="[]"
							defaultValue={data}
							onChange={(e) => setData(e.target.value)}
							disabled={loading}
						></Textarea>
						<Button
							type="submit"
							disabled={loading}
						>
							{loading && (
								<LoaderIcon className="animate-spin w-4 h-4 mr-2" />
							)}
							Save
						</Button>
					</section>
				) : (
					<section className="flex flex-col items-end gap-3">
						<Input
							type="file"
							onChange={(e) =>
								setSelectedFile(
									e.target.files ? e.target.files[0] : null
								)
							}
							disabled={loading}
						/>
						<Button
							type="submit"
							disabled={loading}
						>
							{loading && (
								<LoaderIcon className="animate-spin w-4 h-4 mr-2" />
							)}
							Upload
						</Button>
					</section>
				)}
				{response && (
					<section className="alert green">
						<h3 className="font-bold mb-1">Saved Data:</h3>
						<pre className="text-sm whitespace-break-spaces break-words">
							{JSON.stringify(response, null, 2)}
						</pre>
					</section>
				)}
				{fileResponse && (
					<section className="alert green">
						<h3 className="font-bold mb-1">Saved File:</h3>
						<pre className="text-sm whitespace-break-spaces break-words">
							{JSON.stringify(fileResponse, null, 2)}
						</pre>
					</section>
				)}
				{error && (
					<section className="alert red">
						<p>Failed to save data from IPFS.</p>
						<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
							{error.toString()}
						</pre>
					</section>
				)}
				{fileError && (
					<section className="alert red">
						<p>Failed to save file to IPFS.</p>
						<pre className="mt-3 bg-rose-100/50 p-5 whitespace-break-spaces break-words">
							{fileError.toString()}
						</pre>
					</section>
				)}
			</form>
		</div>
	);
};

export default page;
