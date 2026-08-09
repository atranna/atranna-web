import { getRuntimeApiUrl } from "@/lib/runtime-config";

export function getOrganization(id: string) {
  const jwtToken = localStorage.getItem("jwtToken");

  const apiUrl = getRuntimeApiUrl();
  const orgEndpoint = `${apiUrl}/api/v1/organizations/${id}`;
  const response = fetch(orgEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
}

export function getOrganizations() {
  const jwtToken = localStorage.getItem("jwtToken");

  const apiUrl = getRuntimeApiUrl();
  const orgEndpoint = `${apiUrl}/api/v1/organizations`;
  const response = fetch(orgEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  return response;
}
