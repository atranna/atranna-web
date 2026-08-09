import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Users,
  Box,
  Server,
  EthernetPort,
  Network,
  Cable,
  Scroll,
  Shield,
  LayoutDashboard,
  Plus,
  Settings,
} from "lucide-react";
import { Hr } from "./hr";
import { useState, useEffect } from "react";
import { getOrganization, getOrganizations } from "@/api/organizations";

type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

function NavItem({
  label,
  href,
  icon: Icon,
  active,
}: NavItemProps & { active?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-300 ${
          active ? "bg-gray-300" : ""
        }`}
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

export function Sidebar({ activePage }: { activePage: string }) {
  const router = useRouter();
  const [organizationName, setOrganizationName] = useState(
    "Select Organization",
  );
  const [organizations, setOrganizations] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    async function fetchOrganizationName() {
      const organizationId = window.localStorage.getItem("activeOrganization");

      if (organizationId) {
        const response = await getOrganization(organizationId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrganizationName(data.name);
      } else {
        setOrganizationName("Select Organization");
      }
    }

    async function fetchOrganizations() {
      const response = await getOrganizations();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOrganizations(
        data.map((org: { id: string; name: string }) => ({
          id: org.id,
          name: org.name,
        })),
      );
    }

    fetchOrganizations();

    fetchOrganizationName();
  }, []);
  return (
    <aside className="w-64 border-r bg-gray-200">
      <div className="p-3">
        <h3 className="text-center text-2xl font-bold">ATRANNA</h3>

        <details className="mt-1 cursor-pointer">
          <summary className="list-none">
            <h4 className="font-bold text-l text-center hover:underline">
              {organizationName}
            </h4>
          </summary>
          <div className="border mt-2">
            <h5 className="font-bold pl-1">Organizations</h5>
            {organizations.map((org) => (
              <button
                key={org.id}
                className="flex items-center pl-1 cursor-pointer hover:bg-gray-300 w-full"
                onClick={() => {
                  window.localStorage.setItem("activeOrganization", org.id);
                  setOrganizationName(org.name);
                  window.location.reload();
                }}
              >
                <Users size={16} className="inline mr-1" />
                {org.name}
              </button>
            ))}
            <h5 className="font-bold pl-1">Actions</h5>
            <button
              className="flex items-center pl-1 cursor-pointer hover:bg-gray-300 w-full"
              onClick={() => {
                router.push("/organizations/settings");
              }}
            >
              <Settings size={16} className="inline mr-1" />
              Organization Settings
            </button>
            <button
              className="flex items-center pl-1 cursor-pointer hover:bg-gray-300 w-full"
              onClick={() => {
                router.push("/organizations/new");
              }}
            >
              <Plus size={16} className="inline mr-1" />
              Create New Organization
            </button>
          </div>
        </details>

        <Hr />

        <ul className="mt-4">
          <NavItem
            label="Dashboard"
            href="/dashboard"
            icon={LayoutDashboard}
            active={activePage === "dashboard"}
          />
          <NavSection title="ORGANIZATION" icon={Building2}>
            <NavItem
              label="Users"
              href="/users"
              icon={Users}
              active={activePage === "users"}
            />
            <NavItem
              label="Roles"
              href="/roles"
              icon={Shield}
              active={activePage === "roles"}
            />
            <NavItem
              label="Permissions"
              href="/permissions"
              icon={Scroll}
              active={activePage === "permissions"}
            />
          </NavSection>

          <NavSection title="RESOURCES" icon={Box}>
            <NavItem
              label="Devices"
              href="/devices"
              icon={Server}
              active={activePage === "devices"}
            />

            <NavItem
              label="Interfaces"
              href="/interfaces"
              icon={EthernetPort}
              active={activePage === "interfaces"}
            />
          </NavSection>

          <NavSection title="NETWORK" icon={Network}>
            <NavItem
              label="Networks"
              href="/networks"
              icon={Network}
              active={activePage === "networks"}
            />
            <NavItem
              label="Connections"
              href="/connections"
              icon={Cable}
              active={activePage === "connections"}
            />
          </NavSection>
        </ul>
      </div>
    </aside>
  );
}
