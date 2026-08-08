import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function getDevices() {
  const jwtToken = localStorage.getItem("jwtToken");
  const activeOrganization = localStorage.getItem("activeOrganization");
  const apiUrl = getRuntimeApiUrl();
  const devicesEndpoint = `${apiUrl}/api/v1/devices`;
  const response = fetch(devicesEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": `${activeOrganization}`,
    },
  });
  return response;
}
