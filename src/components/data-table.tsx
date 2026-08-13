import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T extends { id: number | string }>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-latte-surface-0 dark:border-mocha-surface-0">
      <table className="w-full text-left text-sm">
        <thead className="bg-latte-crust dark:bg-mocha-crust">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-latte-subtext-0 dark:text-mocha-subtext-0"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-latte-surface-0 dark:border-mocha-surface-0 text-latte-subtext-1 dark:text-mocha-subtext-1 transition-colors odd:bg-latte-base dark:odd:bg-mocha-base even:bg-latte-mantle dark:even:bg-mocha-mantle hover:bg-latte-surface-0 dark:hover:bg-mocha-surface-0"
            >
              {columns.map((column) => (
                <td key={column.header} className="px-4 py-3">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
