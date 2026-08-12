import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function getAllMembers(orgID: string) {
  const jwtToken = localStorage.getItem("jwtToken");

  const apiUrl = getRuntimeApiUrl();
  const membersEndpoint = `${apiUrl}/api/v1/organization-members`;
  const response = await fetch(membersEndpoint, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": orgID,
    },
  });
  const data = await response.json();
  return data;
}
