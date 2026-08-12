import { apiFetch, asArray } from "@/lib/api";

export async function getNetworks(): Promise<unknown[]> {
  const data = await apiFetch<unknown>("/networks");
  return asArray<unknown>(data);
}
