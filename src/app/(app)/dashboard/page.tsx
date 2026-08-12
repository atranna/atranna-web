"use client";
import { useEffect, useState } from "react";
import { H2 } from "@/components/headings";
import { getDevices } from "@/api/devices";
import { getAllMembers } from "@/api/members";
import { getNetworks } from "@/api/networks";
import { DashboardCard } from "@/components/dashboard-card";

export default function Dashboard() {
  const [deviceCount, setDeviceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [networkCount, setNetworkCount] = useState(0);

  useEffect(() => {
    getDevices().then((devices) => setDeviceCount(devices.length));
    getAllMembers().then((members) => setUserCount(members.length));
    getNetworks().then((networks) => setNetworkCount(networks.length));
  }, []);

  return (
    <section className="p-4">
      <H2>Inventory</H2>
      <div className="pt-4 flex flex-wrap gap-x-4">
        <DashboardCard
          title="Devices"
          content={deviceCount}
          link="/devices"
        />
        <DashboardCard
          title="Members"
          content={userCount}
          link="/members"
        />
        <DashboardCard
          title="Networks"
          content={networkCount}
          link="/networks"
        />
      </div>
    </section>
  );
}
