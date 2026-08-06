export const dynamic = "force-dynamic";

export async function GET() {
  const runtimeConfig = {
    apiUrl:
      process.env.API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:8080",
  };

  return new Response(
    `window.__ATRANNA_RUNTIME_CONFIG__ = ${JSON.stringify(runtimeConfig)};`,
    {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
