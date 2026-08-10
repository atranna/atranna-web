"use client";

import { use, useEffect, useState } from "react";
import { getDevice } from "@/api/devices";
import { usersMe } from "@/api/users";
import "../../globals.css";
import { Sidebar } from "@/lib/page-components/sidebar";
import { H1, H2 } from "@/lib/page-components/headings";
import { Header } from "@/lib/page-components/header";

type Device = {
  id: number;
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

export default function Device({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [device, setDevice] = useState<Device>();
  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    fetchUserData();

    async function fetchDevice() {
      const response = await getDevice(id);
      const data = await response.json();
      setDevice(data);
    }

    fetchDevice();
  }, [id]);

  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="devices" />
      <main className="flex-1 bg-base text-text">
        <Header
          pageName={device?.hostname || `Device ${id}`}
          preferredName={preferredName}
        />
        <section className="p-4 gap-x-4 flex flex-col">
          <div className="border border-text p-4 max-w-100">
            <H2>Device Details</H2>
            <ul className="mt-2 space-y-1">
              <li>ID: {device?.id || "Loading..."}</li>
              <li>Hostname: {device?.hostname || "Loading..."}</li>
              <li>IP Address: {device?.ip || "Loading..."}</li>
              <li>Vendor: {device?.vendor || "Loading..."}</li>
              <li>Model: {device?.model || "Loading..."}</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
