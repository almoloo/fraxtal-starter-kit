import { getPinataSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
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
