import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function usersMe() {
  const jwtToken = localStorage.getItem("jwtToken");
  const apiUrl = getRuntimeApiUrl();
  const usersMeEndpoint = `${apiUrl}/api/v1/users/me`;

  const response = await fetch(usersMeEndpoint, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info: " + response.statusText);
  }

  const data = await response.json();
  localStorage.setItem("jwtToken", data.token);
  return data;
}
