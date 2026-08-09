import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function login(username: string, password: string) {
  const apiUrl = getRuntimeApiUrl();
  const loginEndpoint = `${apiUrl}/api/v1/auth/login`;

  const response = await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: "Login failed: " + data.error };
  }

  return { data, success: true };
}
