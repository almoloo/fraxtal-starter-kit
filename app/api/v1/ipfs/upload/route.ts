import PinataClient from "@pinata/sdk";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

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
export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const json = formData.get("json");
  const file = formData.get("file");

  try {
    if (json) {
      const pinnedData = await pinata.pinJSONToIPFS(
        JSON.parse(json.toString())
      );
      console.log(pinnedData);
      return NextResponse.json(pinnedData, { status: 200 });
    } else if (file) {
      const pinnedData = await pinata.pinFileToIPFS(file as File);
      console.log(pinnedData);
      return NextResponse.json(pinnedData, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No data provided." },
        { status: 422 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to pin data to IPFS." },
      { status: 500 }
    );
  }
}
