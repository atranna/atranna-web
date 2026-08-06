"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe, getAllUsers } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H1 } from "@/lib/page-components/headings";

export default function Users() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [allUsers, setAllUsers] = useState([]);

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
          <H1>
            Users &middot; <span>{allUsers.length}</span>
          </H1>
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
