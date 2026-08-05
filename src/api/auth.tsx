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

  if (!response.ok) {
    throw new Error("Login failed: " + response.statusText);
  }

  const data = await response.json();
  return data.token;
}
