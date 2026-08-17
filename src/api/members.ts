import { apiFetch } from "@/lib/api";
import type { Member } from "@/lib/types";

export async function getAllMembers(): Promise<Member[]> {
  return apiFetch<Member[]>("/organization-members");
}

export async function inviteUser(
  userId: number,
  role: string,
): Promise<Member> {
  return apiFetch<Member>("/organization-members", {
    method: "POST",
    body: { user_id: userId, role },
  });
}

export async function deleteMember(memberId: number): Promise<void> {
  return apiFetch<void>(`/organization-members/${memberId}`, {
    method: "DELETE",
  });
}
