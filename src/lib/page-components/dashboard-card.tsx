import Link from "next/link";

export function DashboardCard({
  title,
  content,
  link,
}: {
  title: string;
  content: React.ReactNode;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="mt-6 max-w-xs border border-black bg-gray-200  hover:bg-gray-100 p-5 min-w-60"
    >
      <h2 className="text-xl">{title}</h2>
      <p className="mt-3 text-3xl">{content}</p>
    </Link>
  );
}
