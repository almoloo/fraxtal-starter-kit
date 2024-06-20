import { getExplorerSettings } from "@/utils/network-configs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const contractAddress = searchParams.get("contractaddress");
  const perpage = searchParams.get("perpage");
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const { apiKey, baseUrl } = getExplorerSettings();

  const returnError = (message: string, status: number) => {
    return NextResponse.json({ message }, { status });
  };

  if (!apiKey) returnError("API key not found.", 500);
  if (!baseUrl) returnError("Base URL not found.", 500);
  if (!address) returnError("Address not found.", 422);

  let extraParams = "";
  if (perpage) extraParams += `&offset=${perpage}`;
  if (page) extraParams += `&page=${page}`;
  if (sort) extraParams += `&sort=${sort}`;

  const res = await fetch(
    `${baseUrl}?module=account&action=tokennfttx&address=${address}&contractaddress=${contractAddress}&tag=latest&apikey=${apiKey}${extraParams}`
  );

  if (!res.ok) returnError("Failed to fetch NFT transfers list.", 500);

  const jsonRes = await res.json();

  if (jsonRes.status === "0")
    returnError("Failed to fetch token NFT list.", 500);

  return NextResponse.json(jsonRes.result);
}
