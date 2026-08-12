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
    <table className="mt-4 w-full border border-black text-left">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((column) => (
            <th key={column.header} className="border border-r-black pl-1">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="border border-b-black">
            {columns.map((column) => (
              <td key={column.header} className="border border-r-black pl-1">
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
