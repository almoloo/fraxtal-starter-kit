import { getPinataSettings } from "@/utils/network-configs";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get("hash");
  const gatewayUrl = getPinataSettings().gateway;

  if (!gatewayUrl) {
    return new Response("Pinata gateway URL not found.", { status: 500 });
  }
  if (!hash) {
    return new Response("IPFS hash not found.", { status: 422 });
  }

  const res = await fetch(`${gatewayUrl}/ipfs/${hash}`);

  if (!res.ok) {
    return new Response("Failed to fetch IPFS file." + (await res.text()), {
      status: 500,
    });
  }

  return Response.json({ message: res.body });
}
