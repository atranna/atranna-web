import { apiFetch, getJwtToken } from "@/lib/api";

export async function validateToken(): Promise<boolean> {
  const token = getJwtToken();
  if (!token) return false;

  try {
    await apiFetch("/auth/validate-token", { includeOrg: false });
    return true;
  } catch {
    return false;
  }
}

export type LoginResult =
  | { data: { token: string }; success: true }
  | { error: string; success: false };

export async function login(username: string, password: string): Promise<LoginResult> {
  try {
    const data = await apiFetch<{ token: string }>("/auth/login", {
      method: "POST",
      body: { username, password },
      includeOrg: false,
    });

    return { data, success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { error: "Login failed: " + message, success: false };
  }
}
