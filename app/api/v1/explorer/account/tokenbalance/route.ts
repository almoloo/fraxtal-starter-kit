import { getExplorerSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const contractAddress = searchParams.get("contractaddress");
  const { apiKey, baseUrl } = getExplorerSettings();

  const returnError = (message: string, status: number) => {
    return NextResponse.json({ message }, { status });
  };

  if (!apiKey) returnError("API key not found.", 500);
  if (!baseUrl) returnError("Base URL not found.", 500);
  if (!address) returnError("Address not found.", 422);

  const res = await fetch(
    `${baseUrl}?module=account&action=tokenbalance&address=${address}&contractaddress=${contractAddress}&tag=latest&apikey=${apiKey}`
  );

  if (!res.ok) returnError("Failed to fetch token balance.", 500);

  const jsonRes = await res.json();

  if (jsonRes.status === "0")
    returnError("Failed to fetch token balance.", 500);

  return NextResponse.json(jsonRes.result);
}
