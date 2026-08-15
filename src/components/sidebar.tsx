import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Map,
  Building2,
  Users,
  Box,
  Server,
  EthernetPort,
  Network,
  Cable,
  Scroll,
  Shield,
  Plus,
  Settings,
  Factory,
  FileBox,
  Monitor,
  Earth,
  MapPin,
  ChevronRight,
  Share2,
  Globe,
  Cloud,
} from "lucide-react";
import { Hr } from "./hr";
import { useState, useEffect } from "react";
import { getOrganization, getOrganizations } from "@/api/organizations";
import { H3, H4 } from "./headings";

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
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function NavSection({
  title,
  icon: Icon,
  expanded,
  onToggle,
  children,
}: NavSectionProps) {
  return (
    <li className="mt-1">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-2 py-2 hover:text-latte-mauve dark:hover:text-mocha-mauve"
      >
        <div className="flex items-center gap-2">
          <Icon size={20} />
          <h4 className="font-bold">{title}</h4>
        </div>
        <ChevronRight
          size={16}
          className={`transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>

      {expanded && <ul className="ml-4 space-y-1">{children}</ul>}
    </li>
  );
}

type SectionKey =
  | "sites"
  | "organization"
  | "resources"
  | "network"
  | "virtualization";

const sectionSegments: Record<SectionKey, string[]> = {
  sites: ["sites", "locations", "regions"],
  organization: ["members", "roles", "permissions"],
  resources: [
    "racks",
    "devices",
    "device-types",
    "vendors",
    "models",
    "interfaces",
  ],
  network: ["networks", "connections"],
  virtualization: ["virtual-machines", "containers", "hypervisors", "clusters"],
};

function getActiveSection(segment: string): SectionKey | null {
  for (const [key, segments] of Object.entries(sectionSegments)) {
    if (segments.includes(segment)) return key as SectionKey;
  }
  return null;
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
  const [collapsed, setCollapsed] = useState<Record<SectionKey, boolean>>({
    sites: true,
    organization: true,
    resources: true,
    network: true,
    virtualization: true,
  });
  const [lastPath, setLastPath] = useState(pathname);
  const activeSection = getActiveSection(activePage);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    const newCollapsed: Record<SectionKey, boolean> = {
      sites: true,
      organization: true,
      resources: true,
      network: true,
      virtualization: true,
    };
    if (activeSection) {
      newCollapsed[activeSection] = false;
    }
    setCollapsed(newCollapsed);
  }

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
    <aside className="sticky top-0 h-screen w-64 overflow-y-auto border-r border-latte-surface-0 dark:border-mocha-surface-0 bg-latte-mantle dark:bg-mocha-mantle text-latte-text dark:text-mocha-text">
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
          <NavSection
            title="SITES"
            icon={Map}
            expanded={!collapsed.sites}
            onToggle={() =>
              setCollapsed((prev) => ({ ...prev, sites: !prev.sites }))
            }
          >
            <NavItem
              label="Sites"
              href="/sites"
              icon={Building2}
              active={activePage === "sites"}
              planned
            />
            <NavItem
              label="Locations"
              href="/locations"
              icon={MapPin}
              active={activePage === "locations"}
              planned
            />
            <NavItem
              label="Regions"
              href="/regions"
              icon={Earth}
              active={activePage === "regions"}
              planned
            />
          </NavSection>
          <NavSection
            title="ORGANIZATION"
            icon={Building2}
            expanded={!collapsed.organization}
            onToggle={() =>
              setCollapsed((prev) => ({
                ...prev,
                organization: !prev.organization,
              }))
            }
          >
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

          <NavSection
            title="RESOURCES"
            icon={Box}
            expanded={!collapsed.resources}
            onToggle={() =>
              setCollapsed((prev) => ({
                ...prev,
                resources: !prev.resources,
              }))
            }
          >
            <NavItem
              label="Racks"
              href="/racks"
              icon={Box}
              active={activePage === "racks"}
              planned
            />
            <NavItem
              label="Devices"
              href="/devices"
              icon={Server}
              active={activePage === "devices"}
            />

            <H4>
              <span className="text-latte-lavender dark:text-mocha-lavender">
                Device Types
              </span>
            </H4>

            <NavItem
              label="Device Types"
              href="/device-types"
              icon={Monitor}
              active={activePage === "device-types"}
              planned
            />

            <NavItem
              label="Vendors"
              href="/device-vendors"
              icon={Factory}
              active={activePage === "vendors"}
              planned
            />

            <NavItem
              label="Device Models"
              href="/device-models"
              icon={FileBox}
              active={activePage === "device-models"}
              planned
            />

            <H4>
              <span className="text-latte-lavender dark:text-mocha-lavender">
                Device Components
              </span>
            </H4>

            <NavItem
              label="Interfaces"
              href="/interfaces"
              icon={EthernetPort}
              active={activePage === "interfaces"}
              planned
            />
          </NavSection>

          <NavSection
            title="NETWORKS"
            icon={Network}
            expanded={!collapsed.network}
            onToggle={() =>
              setCollapsed((prev) => ({
                ...prev,
                network: !prev.network,
              }))
            }
          >
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
            <NavItem
              label="IP Addresses"
              href="/ip-addresses"
              icon={EthernetPort}
              active={activePage === "ip-addresses"}
              planned
            />
            <NavItem
              label="Subnets"
              href="/subnets"
              icon={Network}
              active={activePage === "subnets"}
              planned
            />
            <NavItem
              label="VLANs"
              href="/vlans"
              icon={Share2}
              active={activePage === "vlans"}
              planned
            />
            <NavItem
              label="DNS Records"
              href="/dns-records"
              icon={Globe}
              active={activePage === "dns-records"}
              planned
            />
          </NavSection>
          <NavSection
            title="VIRTUALIZATION"
            icon={Cloud}
            expanded={!collapsed.virtualization}
            onToggle={() =>
              setCollapsed((prev) => ({
                ...prev,
                virtualization: !prev.virtualization,
              }))
            }
          >
            <NavItem
              label="Virtual Machines"
              href="/virtual-machines"
              icon={Monitor}
              active={activePage === "virtual-machines"}
              planned
            />
            <NavItem
              label="Containers"
              href="/containers"
              icon={Box}
              active={activePage === "containers"}
              planned
            />
            <NavItem
              label="Hypervisors"
              href="/hypervisors"
              icon={Server}
              active={activePage === "hypervisors"}
              planned
            />
            <NavItem
              label="Clusters"
              href="/clusters"
              icon={Network}
              active={activePage === "clusters"}
              planned
            />
          </NavSection>
        </ul>
      </div>
    </aside>
  );
}
