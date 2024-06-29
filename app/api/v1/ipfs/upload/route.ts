import PinataClient from '@pinata/sdk';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
export const dynamic = 'force-dynamic';

const pinata = new PinataClient({
	pinataApiKey: process.env.PINATA_API_KEY,
	pinataSecretApiKey: process.env.PINATA_API_SECRET,
});

/**
 * Handles the POST request for uploading data to IPFS.
 * @param {FormData.file} File - FormData object containing the file to be pinned.
 * @param {FormData.json} json - FormData object containing the JSON data to be pinned.
 * @returns A promise that resolves to the response object.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	console.log('🎈 here');
	try {
		const formData = await request.formData();
		const json = formData.get('json') ?? null;
		const file = (formData.get('file') as File) ?? null;
		if (json) {
			const pinnedData = await pinata.pinJSONToIPFS(
				JSON.parse(json.toString()),
				{
					pinataMetadata: {
						name: 'json',
					},
				}
			);
			console.log(pinnedData);
			return NextResponse.json(pinnedData, { status: 200 });
		} else if (file) {
			// const pinnedData = await pinata.pinFileToIPFS(readableStream, {
			//   pinataMetadata: {
			//     name: "file",
			//   },
			// });
			// console.log(pinnedData);
			// return NextResponse.json(pinnedData, { status: 200 });
			const form = new FormData();
			form.append('file', file);
			form.append('pinataMetadata', JSON.stringify({ name: 'file' }));
			form.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

			const res = await fetch(
				`https://api.pinata.cloud/pinning/pinFileToIPFS`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${process.env.PINATA_JWT}`,
						// "Content-Type": "multipart/form-data",
					},
					body: form,
				}
			);
			const jsonRes = await res.json();
			console.log(jsonRes);
			return NextResponse.json(jsonRes, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: 'No data provided.' },
				{ status: 422 }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: 'Failed to pin data to IPFS.' },
			{ status: 500 }
		);
	}
}
