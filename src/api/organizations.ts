import { apiFetch } from "@/lib/api";
import type { Organization } from "@/lib/types";

export async function getOrganizations(): Promise<Organization[]> {
  return apiFetch<Organization[]>("/organizations", { includeOrg: false });
}

export async function getOrganization(id: string): Promise<Organization> {
  return apiFetch<Organization>(`/organizations/${id}`, { includeOrg: false });
}
