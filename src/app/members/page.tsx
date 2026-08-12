"use client";
import { Header } from "@/components/header";
import { usersMe, getAllUsers } from "@/api/users";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { H2 } from "@/components/headings";
import { Mail, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { getAllMembers } from "@/api/members";

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

export default function Users() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [rawMembers, setRawMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    async function fetchAllUsers() {
      const allUsers = await getAllUsers();
      setRawUsers(allUsers);
    }

    async function fetchAllMembers() {
      const allMembers = await getAllMembers(
        localStorage.getItem("activeOrganization") || "0",
      );
      setRawMembers(allMembers);
    }

    fetchUserData();
    fetchAllUsers();
    fetchAllMembers();
  }, []);
  const preferredName = displayName || username || "N/A";
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
            <Button primary>
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
    </div>
  );
}
