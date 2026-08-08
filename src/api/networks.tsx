import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function getNetworks() {
  const jwtToken = localStorage.getItem("jwtToken");
  const apiUrl = getRuntimeApiUrl();
  const networksEndpoint = `${apiUrl}/api/v1/networks`;
  const response = fetch(networksEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
}
