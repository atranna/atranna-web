import { getRuntimeApiUrl } from "@/lib/runtime-config";

export async function usersMe() {
  const jwtToken = localStorage.getItem("jwtToken");
  const activeOrganization = localStorage.getItem("activeOrganization");
  const apiUrl = getRuntimeApiUrl();
  const usersMeEndpoint = `${apiUrl}/api/v1/users/me`;

  const response = await fetch(usersMeEndpoint, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": `${activeOrganization}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info: " + response.statusText);
  }

  const data = await response.json();
  return data.user;
}

export async function getAllUsers() {
  const jwtToken = localStorage.getItem("jwtToken");
  const activeOrganization = localStorage.getItem("activeOrganization");
  const apiUrl = getRuntimeApiUrl();
  const usersEndpoint = `${apiUrl}/api/v1/users`;

  const response = await fetch(usersEndpoint, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": `${activeOrganization}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users: " + response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getUsers() {
  const jwtToken = localStorage.getItem("jwtToken");
  const activeOrganization = localStorage.getItem("activeOrganization");
  const apiUrl = getRuntimeApiUrl();
  const usersEndpoint = `${apiUrl}/api/v1/users`;
  const response = fetch(usersEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
      "X-Org-ID": `${activeOrganization}`,
    },
  });
  return response;
}
