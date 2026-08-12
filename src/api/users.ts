import { apiFetch, asArray } from "@/lib/api";
import type { User } from "@/lib/types";

export async function usersMe(): Promise<User> {
  const data = await apiFetch<{ user: User }>("/users/me");
  return data.user;
}

export async function getUsers(): Promise<User[]> {
  const data = await apiFetch<unknown>("/users");
  return asArray<User>(data);
}

export async function getUser(id: number): Promise<User> {
  const data = await apiFetch<{ user?: User } | User>(`/users/${id}`);
  return (data as { user?: User }).user ?? (data as User);
}
