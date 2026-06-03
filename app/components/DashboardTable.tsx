"use client";

import { Fragment, useState } from "react";
import { ArrowUpDown, ChevronRight, Info, MoreHorizontal, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export type TableCell = {
  value: React.ReactNode;
  subValue?: React.ReactNode;
  muted?: boolean;
};

export type TableStatus = {
  label: string;
  tone: "green" | "gray" | "blue";
};

export type TableColumn = {
  key: string;
  label: string;
  width?: string;
  info?: boolean;
};

export type TableRow = {
  id: string;
  type?: "group";
  href?: string;
  cells: Record<string, React.ReactNode | TableCell | TableStatus>;
  children?: TableRow[];
};

function isCell(value: React.ReactNode | TableCell | TableStatus): value is TableCell {
  return Boolean(value && typeof value === "object" && "value" in value);
}

function isStatus(value: React.ReactNode | TableCell | TableStatus): value is TableStatus {
  return Boolean(value && typeof value === "object" && "tone" in value && "label" in value);
}

function StatusPill({ status }: { status: TableStatus }) {
  const tone = {
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300",
    gray: "bg-stone-100 text-stone-600 dark:bg-white/8 dark:text-stone-300",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300",
  }[status.tone];

  const dot = {
    green: "bg-emerald-500",
    gray: "bg-slate-400",
    blue: "bg-blue-500",
  }[status.tone];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${tone}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {status.label}
    </span>
  );
}

function CellContent({ value }: { value: React.ReactNode | TableCell | TableStatus }) {
  if (isStatus(value)) return <StatusPill status={value} />;

  if (isCell(value)) {
    return (
      <div className="min-w-0">
        <div className="text-stone-900 dark:text-stone-100">
          {value.value}
        </div>
        {value.subValue ? (
          <div className="mt-1 text-[11.5px] font-medium text-slate-500 dark:text-slate-400">
            {value.subValue}
          </div>
        ) : null}
      </div>
    );
  }

  return <>{value}</>;
}

export default function DashboardTable({
  columns,
  rows,
  action,
  searchPlaceholder = "Search",
  emptyState,
}: {
  columns: TableColumn[];
  rows: TableRow[];
  action?: React.ReactNode;
  searchPlaceholder?: string;
  emptyState?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const router = useRouter();

  function toggleRow(row: TableRow) {
    if (row.type !== "group" || !row.children?.length) return;
    setExpanded((current) => ({ ...current, [row.id]: !current[row.id] }));
  }

  function handleRowClick(row: TableRow) {
    if (row.type === "group") {
      toggleRow(row);
      return;
    }

    if (row.href) router.push(row.href);
  }

  return (
    <div className="min-h-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative w-full max-w-[320px]">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-[12.5px] font-medium text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>
          <button className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-white px-3.5 text-[12.5px] font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-300 dark:hover:bg-white/6 dark:hover:text-stone-100">
            <ArrowUpDown size={13} />
            Sort by
          </button>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div
        className="overflow-hidden rounded-xl"
        style={{
          border: "1px solid var(--border)",
          background: "var(--content-bg)",
        }}
      >
        <div className="overflow-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
          <thead>
            <tr className="bg-stone-50 dark:bg-white/[0.035]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-r border-stone-200/80 px-4 py-3 text-[12px] font-semibold text-slate-500 last:border-r-0 dark:border-stone-700/70 dark:text-slate-400"
                  style={{ width: column.width }}
                >
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    {column.label}
                    {column.info ? <Info size={12} className="text-slate-400" /> : null}
                  </span>
                </th>
              ))}
              <th className="w-12 border-b border-stone-200/80 px-3 py-3 dark:border-stone-700/70" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="h-36 border-b border-stone-200/70 px-4 py-8 text-center text-[13px] font-medium text-slate-500 dark:border-stone-700/60 dark:text-slate-400"
                >
                  {emptyState ?? "No items yet."}
                </td>
              </tr>
            ) : rows.map((row) => {
              const isGroup = row.type === "group" && Boolean(row.children?.length);
              const isExpanded = Boolean(expanded[row.id]);

              return (
                <Fragment key={row.id}>
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    className={`group hover:bg-stone-50/70 dark:hover:bg-white/[0.03] ${isGroup || row.href ? "cursor-pointer" : ""}`}
                  >
                    {columns.map((column, index) => (
                      <td
                        key={column.key}
                        className="border-b border-r border-stone-200/70 px-4 py-3 text-[13px] font-medium text-stone-900 last:border-r-0 dark:border-stone-700/60 dark:text-stone-100"
                      >
                        <div className={index === 0 ? "flex items-center gap-2" : ""}>
                          {index === 0 && isGroup ? (
                            <ChevronRight size={14} className={`shrink-0 text-stone-500 transition-transform dark:text-stone-400 ${isExpanded ? "rotate-90" : ""}`} />
                          ) : null}
                          <CellContent value={row.cells[column.key] ?? "--"} />
                        </div>
                      </td>
                    ))}
                    <td className="border-b border-stone-200/70 px-3 py-3 text-right dark:border-stone-700/60">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/8 dark:hover:text-stone-200"
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                  {isGroup && isExpanded
                    ? row.children!.map((child) => (
                        <tr key={child.id} className="bg-stone-50/50 hover:bg-stone-50 dark:bg-white/[0.018] dark:hover:bg-white/[0.035]">
                          {columns.map((column, index) => (
                            <td
                              key={column.key}
                              className="border-b border-r border-stone-200/70 px-4 py-3 text-[13px] font-medium text-stone-900 last:border-r-0 dark:border-stone-700/60 dark:text-stone-100"
                            >
                              <div className={index === 0 ? "pl-6" : ""}>
                                <CellContent value={child.cells[column.key] ?? ""} />
                              </div>
                            </td>
                          ))}
                          <td className="border-b border-stone-200/70 px-3 py-3 dark:border-stone-700/60" />
                        </tr>
                      ))
                    : null}
                </Fragment>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
