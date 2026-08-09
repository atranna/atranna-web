"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H2 } from "@/lib/page-components/headings";
import { Plus } from "lucide-react";
import { Button } from "@/lib/page-components/button";
import { getDevices } from "@/api/devices";
import Link from "next/link";

type DeviceRow = {
  id: number;
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

export default function Devices() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [allDevices, setAllDevices] = useState<DeviceRow[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    async function fetchAllUsers() {
      const allDevices = await getDevices();
      const devicesData = await allDevices.json();
      setAllDevices(Array.isArray(devicesData) ? devicesData : []);
    }

    fetchUserData();
    fetchAllUsers();
  }, []);
  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="devices" />
      <main className="flex-1">
        <Header pageName="Devices" preferredName={preferredName} />
        <section className="p-4">
          <div className="flex items-center justify-between">
            <H2>
              Devices &middot; <span>{allDevices.length || 0}</span>
            </H2>
            <Button>
              <Plus size={16} />
              Add
            </Button>
          </div>
          <table className="mt-6 w-full border border-black text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-r-black pl-1">ID</th>
                <th className="border border-r-black pl-1">Hostname</th>
                <th className="border border-r-black pl-1">IP</th>
                <th className="border border-r-black pl-1">Vendor</th>
                <th className="border border-r-black pl-1">Model</th>
                <th className="border border-r-black pl-1">Type</th>
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device) => (
                <tr key={device.id} className="border border-b-black">
                  <td className="border border-r-black pl-1">{device.id}</td>
                  <td className="border border-r-black pl-1">
                    <Link
                      href={`/devices/${device.id}`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      {device.hostname || "N/A"}
                    </Link>
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.ip || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.vendor || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.model || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.type || "N/A"}
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
