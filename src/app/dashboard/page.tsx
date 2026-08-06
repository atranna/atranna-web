"use client";

import { usersMe } from "@/api/users";
import { useEffect, useState } from "react";
import {
  Building2,
  Users,
  UserShield,
  Box,
  Server,
  EthernetPort,
} from "lucide-react";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();
      console.log("Fetched user data:", userData);
      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }
    fetchUserData();
  }, []);

  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-200">
        <div className="ml-3">
          <h3 className="text-center text-2xl font-bold pt-2">ATRANNA</h3>
          <ul>
            <li>
              <div className="flex items-center gap-2 pt-2 pb-2">
                <Building2 size={24} />
                <h4 className="font-bold">ORGANIZATION</h4>
              </div>
              <ul className="ml-4 mt-2">
                <li className="flex items-center gap-2">
                  <Users size={24} />
                  Users
                </li>
                <li className="flex items-center gap-2">
                  <UserShield size={24} />
                  Roles
                </li>
                <li className="flex items-center gap-2">
                  <UserShield size={24} />
                  Permissions
                </li>
              </ul>
            </li>
            <li>
              <div className="flex items-center gap-2 pt-2 pb-2">
                <Box size={24} />
                <h4 className="font-bold">RESOURCES</h4>
              </div>
              <ul className="ml-4 mt-2">
                <li className="flex items-center gap-2">
                  <Server size={24} />
                  Devices
                </li>
                <li className="flex items-center gap-2">
                  <EthernetPort size={24} />
                  Interfaces
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1">
        <header className="border-b p-4 bg-gray-300">
          <span>Overview</span>
          <span className="float-right">
            <a href="/me">{preferredName}</a>
          </span>
        </header>

        <section className="p-6">Content</section>
      </main>
    </div>
  );
}
