import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Factory,
  FileBox,
  Monitor,
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
  planned,
}: NavItemProps & { active?: boolean; planned?: boolean }) {
  return (
    <li>
      <Link
        href={planned ? "" : href}
        className={`flex items-center gap-2 rounded px-2 py-1
  hover:bg-latte-base dark:hover:bg-mocha-base
  hover:text-latte-mauve dark:hover:text-mocha-mauve
  ${active ? "bg-latte-base dark:bg-mocha-base text-latte-mauve dark:text-mocha-mauve" : ""}
  ${planned ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Icon size={16} />
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
    <li className="mt-1">
      <div className="flex items-center gap-2 py-2">
        <Icon size={20} />
        <h4 className="font-bold">{title}</h4>
      </div>

      <ul className="ml-4 space-y-1">{children}</ul>
    </li>
  );
}

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activePage = pathname.split("/")[1] || "dashboard";
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
        const data = await getOrganization(organizationId);
        setOrganizationName(data.name);
      } else {
        setOrganizationName("Select Organization");
      }
    }

    async function fetchOrganizations() {
      const data = await getOrganizations();
      setOrganizations(data);
    }

    fetchOrganizations();

    fetchOrganizationName();
  }, []);
  return (
    <aside className="w-64 border-r border-latte-surface-0 dark:border-mocha-surface-0 bg-latte-mantle dark:bg-mocha-mantle text-latte-text dark:text-mocha-text">
      <div className="px-3 pt-4">
        <h3 className="text-2xl font-bold text-latte-mauve dark:text-mocha-mauve">
          <Link href="/dashboard" className="hover:underline">
            ATRANNA
          </Link>
        </h3>

        <details className="mt-1 cursor-pointer">
          <summary className="list-none">
            <h4 className="font-bold text-l hover:underline">
              {organizationName}
            </h4>
          </summary>
          <div className="border border-latte-surface-0 dark:border-mocha-surface-0 rounded-lg mt-2">
            <h5 className="font-bold pl-1 text-latte-mauve dark:text-mocha-mauve">
              Organizations
            </h5>
            {organizations.map((org) => (
              <button
                key={org.id}
                className="flex items-center pl-1 cursor-pointer hover:bg-latte-base dark:hover:bg-mocha-base hover:text-latte-mauve dark:hover:text-mocha-mauve w-full"
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
            <h5 className="font-bold pl-1 text-latte-mauve dark:text-mocha-mauve">
              Actions
            </h5>
            <button
              className="flex items-center pl-1 cursor-pointer hover:bg-latte-base dark:hover:bg-mocha-base hover:text-latte-mauve dark:hover:text-mocha-mauve w-full"
              onClick={() => {
                router.push("/organizations/settings");
              }}
            >
              <Settings size={16} className="inline mr-1" />
              Organization Settings
            </button>
            <button
              className="flex items-center pl-1 cursor-pointer hover:bg-latte-base dark:hover:bg-mocha-base hover:text-latte-mauve dark:hover:text-mocha-mauve w-full rounded-b-lg"
              onClick={() => {
                router.push("/organizations/new");
              }}
            >
              <Plus size={16} className="inline mr-1" />
              Create New Organization
            </button>
          </div>
        </details>
      </div>

      <Hr />

      <div className="px-3">
        <ul className="mt-4">
          <NavItem
            label="Dashboard"
            href="/dashboard"
            icon={LayoutDashboard}
            active={activePage === "dashboard"}
          />
          <NavSection title="ORGANIZATION" icon={Building2}>
            <NavItem
              label="Members"
              href="/members"
              icon={Users}
              active={activePage === "members"}
            />
            <NavItem
              label="Roles"
              href="/roles"
              icon={Shield}
              active={activePage === "roles"}
              planned
            />
            <NavItem
              label="Permissions"
              href="/permissions"
              icon={Scroll}
              active={activePage === "permissions"}
              planned
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
              label="Types"
              href="/device-types"
              icon={Monitor}
              active={activePage === "device-types"}
              planned
            />

            <NavItem
              label="Vendors"
              href="/vendors"
              icon={Factory}
              active={activePage === "vendors"}
              planned
            />

            <NavItem
              label="Models"
              href="/models"
              icon={FileBox}
              active={activePage === "models"}
              planned
            />

            <NavItem
              label="Interfaces"
              href="/interfaces"
              icon={EthernetPort}
              active={activePage === "interfaces"}
              planned
            />
          </NavSection>

          <NavSection title="NETWORK" icon={Network}>
            <NavItem
              label="Networks"
              href="/networks"
              icon={Network}
              active={activePage === "networks"}
              planned
            />
            <NavItem
              label="Connections"
              href="/connections"
              icon={Cable}
              active={activePage === "connections"}
              planned
            />
          </NavSection>
        </ul>
      </div>
    </aside>
  );
}
