import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function getDevices() {
  const jwtToken = localStorage.getItem("jwtToken");
  const apiUrl = getRuntimeApiUrl();
  const devicesEndpoint = `${apiUrl}/api/v1/devices`;
  const response = fetch(devicesEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
}
