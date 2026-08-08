"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe, getAllUsers } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H1, H2 } from "@/lib/page-components/headings";
import { Plus } from "lucide-react";

type UserRow = {
  id: number;
  display_name: string | null;
  email: string | null;
  username: string;
};

export default function Users() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [allUsers, setAllUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    async function fetchAllUsers() {
      const allUsers = await getAllUsers();
      setAllUsers(allUsers);
    }

    fetchUserData();
    fetchAllUsers();
  }, []);
  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="users" />
      <main className="flex-1">
        <Header pageName="Users" preferredName={preferredName} />
        <section className="p-6">
          <div className="flex items-center justify-between">
            <H2>
              Users &middot; <span>{allUsers.length}</span>
            </H2>
            <button className="flex items-center gap-2 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 p-5 border border-black cursor-pointer hover:underline">
              <Plus size={16} />
              Add
            </button>
          </div>
          <table className="mt-6 w-full border border-black text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-r-black pl-1">ID</th>
                <th className="border border-r-black pl-1">Display Name</th>
                <th className="border border-r-black pl-1">Email</th>
                <th className="border border-r-black pl-1">Username</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
