import { Settings, User } from "lucide-react";
import Link from "next/link";
import { H1 } from "./headings";

export function Header({
  pageName,
  preferredName,
}: {
  pageName: string;
  preferredName: string;
}) {
  return (
    <header className="flex items-center justify-between border-b bg-gray-100 p-4 text-white">
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
      </div>
    </header>
  );
}
