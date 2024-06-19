import { getExplorerSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Retrieves the account balance for a given address.
 * @param address - The address for which to retrieve the account balance.
 * @returns A Promise that resolves to a NextResponse object containing the account balance in wei and eth.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const { apiKey, baseUrl } = getExplorerSettings();

  const returnError = (message: string, status: number) => {
    return NextResponse.json({ message }, { status });
  };

  if (!apiKey) returnError("API key not found.", 500);
  if (!baseUrl) returnError("Base URL not found.", 500);
  if (!address) returnError("Address not found.", 422);

  const res = await fetch(
    `${baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
  );

  if (!res.ok) returnError("Failed to fetch account balance.", 500);

  const jsonRes = await res.json();

  if (jsonRes.status === "0")
    returnError("Failed to fetch account balance.", 500);

  const balanceInWei = jsonRes.result;
  const balanceInEth = Number(balanceInWei) / 1e18;

  return NextResponse.json({ wei: balanceInWei, eth: balanceInEth });
}
