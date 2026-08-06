import Link from "next/link";

export function Header({
  pageName,
  preferredName,
}: {
  pageName: string;
  preferredName: string;
}) {
  return (
    <header className="flex items-center justify-between border-b bg-gray-300 p-4">
      <span>{pageName}</span>

      <Link href="/me" className="hover:underline">
        {preferredName}
      </Link>
    </header>
  );
}
