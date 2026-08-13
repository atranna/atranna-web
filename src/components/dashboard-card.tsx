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
      className="mt-4 max-w-xs border border-latte-surface-0 dark:border-mocha-surface-0 bg-latte-mantle dark:bg-mocha-mantle hover:bg-latte-crust dark:hover:bg-mocha-crust rounded-lg p-5 min-w-60"
    >
      <h2 className="text-xl">{title}</h2>
      <p className="mt-3 text-3xl">{content}</p>
    </Link>
  );
}
