import { getExplorerSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const txHash = searchParams.get("txhash");
  const { apiKey, baseUrl } = getExplorerSettings();

  const returnError = (message: string, status: number) => {
    return NextResponse.json({ message }, { status });
  };

  if (!apiKey) returnError("API key not found.", 500);
  if (!baseUrl) returnError("Base URL not found.", 500);
  if (!txHash) returnError("Address not found.", 422);

  const res = await fetch(
    `${baseUrl}?module=transaction&action=getstatus&txhash=${txHash}&tag=latest&apikey=${apiKey}`
  );

  if (!res.ok) returnError("Failed to fetch contract execution status.", 500);

  const jsonRes = await res.json();

  if (jsonRes.status === "0" || jsonRes.isError !== undefined)
    returnError("Failed to fetch contract execution status.", 500);

  return NextResponse.json(jsonRes.result);
}
