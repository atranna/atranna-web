export const dynamic = "force-dynamic";

export async function GET() {
  const runtimeConfig = {
    apiUrl:
      process.env.API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:8080",
  };

  return new Response(JSON.stringify(runtimeConfig), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
