"use client";
import { Header } from "@/components/header";
import { usersMe, getUser, getUsers } from "@/api/users";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { H2 } from "@/components/headings";
import { inviteUser, getAllMembers } from "@/api/members";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/button";

type User = {
  id: number;
  display_name: string | null;
  email: string | null;
  username: string;
};

type Member = {
  organization_id: number;
  user_id: number;
  role: string;
};

type InviteUserFormState = {
  id: number;
  role: string;
};

const emptyInviteUserForm: InviteUserFormState = {
  id: 0,
  role: "operator",
};

const roleOptions = ["owner", "admin", "operator", "viewer"];

export default function Users() {
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [inviteUserForm, setInviteUserForm] =
    useState<InviteUserFormState>(emptyInviteUserForm);
  const [inviteUserFormError, setInviteUserFormError] = useState("");
  const [isSubmittingInviteUser, setIsSubmittingInviteUser] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [rawMembers, setRawMembers] = useState<Member[]>([]);

  async function fetchMembersAndUsers() {
    const allMembers = await getAllMembers(
      localStorage.getItem("activeOrganization") || "0",
    );
    setRawMembers(allMembers);

    const userResponses = await Promise.all(
      allMembers.map((member: Member) => getUser(member.user_id)),
    );
    const users = await Promise.all(
      userResponses.map(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user: " + response.statusText);
        }

        const data = await response.json();
        return data.user ?? data;
      }),
    );
    setRawUsers(users);
  }

  async function fetchAllUsers() {
    const usersResponse = await getUsers();

    if (!usersResponse.ok) {
      throw new Error("Failed to fetch users: " + usersResponse.statusText);
    }

    const usersData = await usersResponse.json();
    const usersList = Array.isArray(usersData)
      ? usersData
      : Array.isArray(usersData.users)
        ? usersData.users
        : [];

    setAllUsers(usersList);
  }

  useEffect(() => {
    async function loadInitialData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);

      await fetchMembersAndUsers();
      await fetchAllUsers();
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isInviteUserOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isInviteUserOpen]);

  const preferredName = displayName || username || "N/A";

  function openInviteUserForm() {
    setInviteUserForm(emptyInviteUserForm);
    setInviteUserFormError("");
    setIsInviteUserOpen(true);
  }

  function closeInviteUserForm() {
    setIsInviteUserOpen(false);
  }

  function updateInviteUserForm(
    field: keyof InviteUserFormState,
    value: string | number,
  ) {
    setInviteUserForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleInviteUserSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setInviteUserFormError("");
    setIsSubmittingInviteUser(true);

    try {
      await inviteUser(
        localStorage.getItem("activeOrganization") || "0",
        inviteUserForm.id,
        inviteUserForm.role,
      );

      await fetchMembersAndUsers();
      setInviteUserForm(emptyInviteUserForm);
      setIsInviteUserOpen(false);
    } catch (error) {
      setInviteUserFormError(
        error instanceof Error ? error.message : "Failed to invite user",
      );
    } finally {
      setIsSubmittingInviteUser(false);
    }
  }

  const usersWithRoles = rawUsers
    .map((user) => {
      const member = rawMembers.find((entry) => entry.user_id === user.id);
      return member
        ? {
            ...user,
            role: member.role,
          }
        : null;
    })
    .filter((user): user is User & { role: string } => user !== null);

  const existingMemberIds = new Set(rawMembers.map((member) => member.user_id));
  const inviteableUsers = allUsers.filter(
    (user) => !existingMemberIds.has(user.id),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="members" />
      <main className="flex-1 bg-base text-text">
        <Header pageName="Members" preferredName={preferredName} />
        <section className="p-4">
          <div className="flex items-center justify-between">
            <H2>
              Members &middot; <span>{rawMembers.length}</span>
            </H2>
            <Button primary onClick={openInviteUserForm}>
              <Mail size={16} />
              Invite
            </Button>
          </div>
          <table className="mt-4 w-full border border-black text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-r-black pl-1">ID</th>
                <th className="border border-r-black pl-1">Display Name</th>
                <th className="border border-r-black pl-1">Email</th>
                <th className="border border-r-black pl-1">Username</th>
                <th className="border border-r-black pl-1">Role</th>
              </tr>
            </thead>
            <tbody>
              {usersWithRoles.map((user) => (
                <tr key={user.id} className="border border-b-black">
                  <td className="border border-r-black pl-1">{user.id}</td>
                  <td className="border border-r-black pl-1">
                    {user.display_name || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {user.email || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {user.username}
                  </td>
                  <td className="border border-r-black pl-1">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      {isInviteUserOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-gray-300/40"
          onClick={closeInviteUserForm}
        >
          <div
            className="w-full max-w-2xl border border-black bg-mantle text-text p-6 "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Invite User</h2>
                <p className="mt-1 text-sm text-gray-700">
                  Enter the user details below to invite a new user.
                </p>
              </div>
              <button
                type="button"
                onClick={closeInviteUserForm}
                className="flex h-10 w-10 items-center justify-center border border-black bg-gray-100 hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
                aria-label="Close invite user form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteUserSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  User
                  <select
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    value={inviteUserForm.id}
                    onChange={(event) =>
                      updateInviteUserForm("id", Number(event.target.value))
                    }
                  >
                    <option value={0}>Select a user</option>
                    {inviteableUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  Role
                  <select
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    value={inviteUserForm.role}
                    onChange={(event) =>
                      updateInviteUserForm("role", event.target.value)
                    }
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeInviteUserForm}
                  disabled={isSubmittingInviteUser}
                  className="border border-black px-4 py-2 hover:bg-gray-300 active:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingInviteUser || inviteUserForm.id === 0}
                  className="border  border-mauve text-mauve bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 active:bg-gray-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingInviteUser ? "Inviting..." : "Invite user"}
                </button>
              </div>
              {inviteUserFormError ? (
                <p className="mt-3 text-sm text-red-700">
                  {inviteUserFormError}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
