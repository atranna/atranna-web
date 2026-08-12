import { apiFetch } from "@/lib/api";

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
