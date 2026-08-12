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

export async function inviteUser(orgID: string, userId: number, role: string) {
  const jwtToken = localStorage.getItem("jwtToken");

  const apiUrl = getRuntimeApiUrl();
  const inviteEndpoint = `${apiUrl}/api/v1/organization-members`;
  const response = await fetch(inviteEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": orgID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to invite user");
  }

  return await response.json();
}
