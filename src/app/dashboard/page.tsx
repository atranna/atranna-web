"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe, getUsers } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H1 } from "@/lib/page-components/headings";
import { getDevices } from "@/api/devices";
import Link from "next/link";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [deviceCount, setDeviceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    async function fetchDevices() {
      const response = await getDevices();
      const devices = await response.json();
      console.log("Devices fetched:", devices);
      for (const device of devices) {
        console.log(`Device: ${device.name}`);
      }
      setDeviceCount(devices.length);
    }

    async function fetchUsers() {
      const response = await getUsers();
      const users = await response.json();
      console.log("Users fetched:", users);
      setUserCount(users.length);
    }

    fetchUserData();
    fetchDevices();
    fetchUsers();
  }, []);
  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="dashboard" />
      <main className="flex-1">
        <Header pageName="Dashboard" preferredName={preferredName} />

        <section className="p-6">
          <H1>Dashboard</H1>
          <div className="flex flex-wrap gap-x-4">
            <div className="mt-6 max-w-xs border border-black bg-gray-200 p-5 min-w-60">
              <Link href="/devices">
                <h2 className="text-xl">Devices</h2>
                <p className="mt-3 text-3xl">
                  {deviceCount === 0 ? "N/A" : `${deviceCount}`}
                </p>
              </Link>
            </div>
            <div className="mt-6 border border-black bg-gray-200 p-5 min-w-60">
              <Link href="/users">
                <h2 className="text-xl">Users</h2>
                <p className="mt-3 text-3xl">
                  {userCount === 0 ? "N/A" : `${userCount}`}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
