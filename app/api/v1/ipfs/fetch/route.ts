import { getPinataSettings } from "@/utils/network-configs";
import { NextResponse } from "next/server";
// import PinataClient from "@pinata/sdk";

// const pinata = new PinataClient({
//   pinataApiKey: process.env.PINATA_API_KEY,
//   pinataSecretApiKey: process.env.PINATA_API_SECRET,
// });

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("hash");
  const gatewayUrl = getPinataSettings().gateway;

  if (!gatewayUrl) {
    return NextResponse.json(
      { message: "Pinata gateway URL not found." },
      { status: 500 }
    );
  }
  if (!hash) {
    return NextResponse.json(
      { message: "IPFS hash not found." },
      { status: 422 }
    );
  }

  const res = await fetch(
    `${gatewayUrl}/ipfs/${hash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch IPFS file." } + (await res.text()),
      {
        status: 500,
      }
    );
  }
  const jsonRes = await res.json();

  return NextResponse.json(jsonRes);
}
