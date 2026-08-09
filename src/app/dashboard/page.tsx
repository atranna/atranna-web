"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe, getUsers } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H1, H2 } from "@/lib/page-components/headings";
import { getDevices } from "@/api/devices";
import Link from "next/link";
import { Hr } from "@/lib/page-components/hr";
import { getNetworks } from "@/api/networks";
import { useRouter } from "next/dist/client/components/navigation";
import { DashboardCard } from "@/lib/page-components/dashboard-card";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [deviceCount, setDeviceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [networkCount, setNetworkCount] = useState(0);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      router.replace("/login");
    }
    if (!localStorage.getItem("activeOrganization")) {
      localStorage.setItem("activeOrganization", "0");
    }
  }, [router]);

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
      setDeviceCount(devices.length);
    }

    async function fetchUsers() {
      const response = await getUsers();
      const users = await response.json();
      console.log("Users fetched:", users);
      setUserCount(users.length);
    }

    async function fetchNetworks() {
      const response = await getNetworks();
      const networks = await response.json();
      console.log("Networks fetched:", networks);
      setNetworkCount(networks.length);
    }

    fetchUserData();
    fetchDevices();
    fetchUsers();
    fetchNetworks();
  }, []);
  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="dashboard" />
      <main className="flex-1">
        <Header pageName="Dashboard" preferredName={preferredName} />

        <section className="p-4">
          <H2>Inventory</H2>
          <div className="flex flex-wrap gap-x-4">
            <DashboardCard
              title="Devices"
              content={deviceCount}
              link="/devices"
            />
            <DashboardCard title="Users" content={userCount} link="/users" />
            <DashboardCard
              title="Networks"
              content={networkCount}
              link="/networks"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
