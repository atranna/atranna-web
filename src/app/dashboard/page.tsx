"use client";

import { usersMe } from "@/api/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Users,
  UserShield,
  Box,
  Server,
  EthernetPort,
  Network,
  Cable,
  Scroll,
  Shield,
  LayoutDashboard,
} from "lucide-react";

type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function NavItem({ label, href, icon: Icon }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-300"
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );
}

type NavSectionProps = {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

function NavSection({ title, icon: Icon, children }: NavSectionProps) {
  return (
    <li className="mt-4">
      <div className="flex items-center gap-2 py-2">
        <Icon size={24} />
        <h4 className="font-bold">{title}</h4>
      </div>

      <ul className="ml-4 space-y-1">{children}</ul>
    </li>
  );
}

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    fetchUserData();
  }, []);

  const preferredName = displayName || username || "N/A";

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-200">
        <div className="p-3">
          <h3 className="text-center text-2xl font-bold">ATRANNA</h3>

          <ul className="mt-4">
            <NavItem
              label="Dashboard"
              href="/dashboard"
              icon={LayoutDashboard}
            />
            <NavSection title="ORGANIZATION" icon={Building2}>
              <NavItem label="Users" href="/users" icon={Users} />
              <NavItem label="Roles" href="/roles" icon={Shield} />
              <NavItem label="Permissions" href="/permissions" icon={Scroll} />
            </NavSection>

            <NavSection title="RESOURCES" icon={Box}>
              <NavItem label="Devices" href="/devices" icon={Server} />

              <NavItem
                label="Interfaces"
                href="/interfaces"
                icon={EthernetPort}
              />
            </NavSection>

            <NavSection title="NETWORK" icon={Network}>
              <NavItem label="Networks" href="/networks" icon={Network} />
              <NavItem label="Connections" href="/connections" icon={Cable} />
            </NavSection>
          </ul>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b bg-gray-300 p-4">
          <span>Overview</span>

          <Link href="/me" className="hover:underline">
            {preferredName}
          </Link>
        </header>

        <section className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </section>
      </main>
    </div>
  );
}
