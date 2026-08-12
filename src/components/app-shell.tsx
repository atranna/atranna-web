"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const pageNames: Record<string, string> = {
  dashboard: "Dashboard",
  devices: "Devices",
  members: "Members",
  networks: "Networks",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      router.replace("/login");
      return;
    }

    if (!localStorage.getItem("activeOrganization")) {
      localStorage.setItem("activeOrganization", "0");
    }
  }, [router]);

  const segment = pathname.split("/")[1] || "dashboard";
  const pageName =
    pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-base text-text">
        <Header pageName={pageName} />
        {children}
      </main>
    </div>
  );
}
