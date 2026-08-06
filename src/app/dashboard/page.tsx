"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H1 } from "@/lib/page-components/headings";

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
      <Sidebar activePage="dashboard" />
      <main className="flex-1">
        <Header pageName="Dashboard" preferredName={preferredName} />

        <section className="p-6">
          <H1>Dashboard</H1>
        </section>
      </main>
    </div>
  );
}
