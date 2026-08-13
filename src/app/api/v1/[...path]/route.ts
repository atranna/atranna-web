import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const target = new URL(
    `${API_URL}/api/v1/${path.join("/")}${request.nextUrl.search}`,
  );

  const headers = new Headers();

  const authorization = request.headers.get("authorization");
  const orgId = request.headers.get("x-org-id");
  const contentType = request.headers.get("content-type");

  if (authorization) headers.set("authorization", authorization);
  if (orgId) headers.set("x-org-id", orgId);
  if (contentType) headers.set("content-type", contentType);

  const body = await request.text();

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: body || undefined,
  });

  const responseBody = await response.text();

  return new Response(responseBody, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
