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

export async function addDevice(requestBody: {
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
}) {
  const jwtToken = localStorage.getItem("jwtToken");
  const activeOrganization = localStorage.getItem("activeOrganization");
  const apiUrl = getRuntimeApiUrl();
  const devicesEndpoint = `${apiUrl}/api/v1/devices`;
  const response = await fetch(devicesEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": `${activeOrganization}`,
    },
    body: JSON.stringify(requestBody),
  });
  return response;
}
