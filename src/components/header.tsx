import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { H1 } from "./headings";
import { Button } from "./button";
import { useCurrentUser } from "@/lib/user-context";

export function Header({ pageName }: { pageName: string }) {
  const router = useRouter();
  const { preferredName } = useCurrentUser();

  const Logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("activeOrganization");
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between border-b bg-crust p-4 text-text">
      <H1>{pageName}</H1>

      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="flex items-center gap-1 hover:underline"
        >
          <Settings size={16} />
          Instance Settings
        </Link>
        &middot;
        <Link href="/me" className="flex items-center gap-1 hover:underline">
          <User size={16} />
          {preferredName}
        </Link>
        &middot;
        <div>
          <Button onClick={Logout}>
            <LogOut size={16} />
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
}
