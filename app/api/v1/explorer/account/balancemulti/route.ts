import { getExplorerSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface AccountBalance {
  account: string;
  balance: string;
}

/**
 * Retrieves the account balance for a list of addresses.
 * @param addresses - The addresses (separated by comma) for which to retrieve the account balance.
 * @returns A Promise that resolves to a NextResponse Array containing the account balances in wei and eth.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const addresses = searchParams.get("addresses");
  const { apiKey, baseUrl } = getExplorerSettings();

  const returnError = (message: string, status: number) => {
    return NextResponse.json({ message }, { status });
  };

  if (!apiKey) returnError("API key not found.", 500);
  if (!baseUrl) returnError("Base URL not found.", 500);
  if (!addresses || addresses === null) returnError("Address not found.", 422);

  const res = await fetch(
    `${baseUrl}?module=account&action=balancemulti&address=${addresses}&tag=latest&apikey=${apiKey}`
  );

  if (!res.ok) returnError("Failed to fetch accounts balances.", 500);

  const jsonRes = await res.json();

  if (jsonRes.status === "0")
    returnError("Failed to fetch account balance.", 500);

  const rawBalances = jsonRes.result;
  const formattedBalances: object[] = [];
  rawBalances.forEach((accountInfo: AccountBalance) => {
    formattedBalances.push({
      account: accountInfo.account,
      wei: accountInfo.balance,
      eth: (Number(accountInfo.balance) / 1e18).toString(),
    });
  });

  return NextResponse.json(formattedBalances);
}
