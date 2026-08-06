import type { LucideIcon } from "lucide-react";
import Link from "next/link";
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
} from "lucide-react";

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
  return (
    <aside className="w-64 border-r bg-gray-200">
      <div className="p-3">
        <h3 className="text-center text-2xl font-bold">ATRANNA</h3>

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
