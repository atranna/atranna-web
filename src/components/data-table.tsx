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
    <div className="mt-4 overflow-hidden rounded-lg border border-surface-0">
      <table className="w-full text-left text-sm">
        <thead className="bg-crust">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-subtext-0"
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
              className="border-t border-surface-0 text-subtext-1 transition-colors odd:bg-base even:bg-mantle hover:bg-surface-0"
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
