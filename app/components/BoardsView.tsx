"use client";

import { useEffect, useRef, useState } from "react";
import { Filter, LayoutDashboard, Pencil, Plus, RotateCcw, Trash2, TrendingUp } from "lucide-react";
import DashboardTable, { TableColumn, TableRow } from "./DashboardTable";
import { ThreeDotsMenuItem } from "./ThreeDotsMenu";

function TypeBadge({ type }: { type: "retention" | "dashboard" | "insights" | "funnel" }) {
  const config = {
    retention: { icon: <RotateCcw size={12} />, label: "Retention" },
    dashboard: { icon: <LayoutDashboard size={12} />, label: "Dashboard" },
    insights: { icon: <TrendingUp size={12} />, label: "Insights" },
    funnel: { icon: <Filter size={12} />, label: "Funnel" },
  } as const;
  const { icon, label } = config[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-[12px] font-medium text-stone-600 dark:border-stone-700 dark:bg-white/4 dark:text-stone-300">
      {icon}
      {label}
    </span>
  );
}

function UserAvatar({ initials, color, name }: { initials: string; color: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
        style={{ background: color }}
      >
        {initials}
      </span>
      <span>{name}</span>
    </div>
  );
}

function InlineEditor({
  value,
  onSave,
  onCancel,
}: {
  value: string;
  onSave: (val: string) => void;
  onCancel: () => void;
}) {
  const [val, setVal] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  return (
    <input
      ref={ref}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => onSave(val)}
      onKeyDown={(e) => {
        if (e.key === "Enter") { e.preventDefault(); onSave(val); }
        if (e.key === "Escape") { e.preventDefault(); onCancel(); }
      }}
      onClick={(e) => e.stopPropagation()}
      className="w-full rounded-md border border-blue-400 bg-white px-2 py-0.5 text-[13px] font-medium text-stone-900 outline-none ring-2 ring-blue-500/15 dark:bg-stone-800 dark:text-stone-100"
    />
  );
}

type BoardEntry = {
  id: string;
  title: string;
  type: "retention" | "dashboard" | "insights" | "funnel";
  lastUpdated: string;
  createdBy: { initials: string; color: string; name: string };
};

const INITIAL_ENTRIES: BoardEntry[] = [
  { id: "r1", title: "Untitled report-330", type: "retention", lastUpdated: "Jun 4, 2026 03:52 PM", createdBy: { initials: "YB", color: "#8B5CF6", name: "Yaroslav Bezr..." } },
  { id: "r2", title: "Central Marketing Dashboard", type: "dashboard", lastUpdated: "May 27, 2026 01:30 PM", createdBy: { initials: "SN", color: "#0D9488", name: "Somya Nayak" } },
  { id: "r3", title: "Untitled report-719", type: "insights", lastUpdated: "May 15, 2026 04:17 PM", createdBy: { initials: "I", color: "#EF4444", name: "Intempt" } },
  { id: "r4", title: "Untitled report-105", type: "funnel", lastUpdated: "May 11, 2026 04:20 PM", createdBy: { initials: "I", color: "#EF4444", name: "Intempt" } },
  { id: "r5", title: "Traffic from Newsletter", type: "insights", lastUpdated: "May 11, 2026 04:19 PM", createdBy: { initials: "SN", color: "#0D9488", name: "Somya Nayak" } },
  { id: "r6", title: "Untitled report-768", type: "insights", lastUpdated: "Apr 17, 2026 05:56 PM", createdBy: { initials: "HS", color: "#22C55E", name: "Hardik Sharma" } },
  { id: "r7", title: "Company newsletter", type: "dashboard", lastUpdated: "Apr 9, 2026 04:30 PM", createdBy: { initials: "TB", color: "#F59E0B", name: "Tushar Bansal" } },
  { id: "r8", title: "Untitled report-279", type: "retention", lastUpdated: "Apr 8, 2026 03:02 PM", createdBy: { initials: "HK", color: "#0F766E", name: "Harish Kumar" } },
  { id: "r9", title: "Untitled report-486", type: "insights", lastUpdated: "Apr 8, 2026 01:58 PM", createdBy: { initials: "HK", color: "#0F766E", name: "Harish Kumar" } },
];

const COLUMNS: TableColumn[] = [
  { key: "title", label: "Title", width: "30%" },
  { key: "type", label: "Type", width: "160px" },
  { key: "lastUpdated", label: "Last Updated", width: "210px" },
  { key: "createdBy", label: "Created By", width: "200px" },
];

export default function BoardsView() {
  const [entries, setEntries] = useState<BoardEntry[]>(INITIAL_ENTRIES);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEditing(id: string) {
    setEditingId(id);
  }

  function saveEdit(id: string, newTitle: string) {
    const trimmed = newTitle.trim();
    if (trimmed) {
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, title: trimmed } : e)));
    }
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function menuItemsFor(entry: BoardEntry): ThreeDotsMenuItem[] {
    return [
      { label: "Rename", icon: Pencil, onClick: () => startEditing(entry.id) },
      { label: "Delete", icon: Trash2, tone: "danger" },
    ];
  }

  const tableRows: TableRow[] = entries.map((entry) => ({
    id: entry.id,
    menuItems: menuItemsFor(entry),
    cells: {
      title:
        editingId === entry.id ? (
          <InlineEditor
            value={entry.title}
            onSave={(val) => saveEdit(entry.id, val)}
            onCancel={cancelEdit}
          />
        ) : (
          entry.title
        ),
      type: <TypeBadge type={entry.type} />,
      lastUpdated: entry.lastUpdated,
      createdBy: <UserAvatar {...entry.createdBy} />,
    },
  }));

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      <div className="min-h-0 px-4 py-4 animate-fade-up">
        <DashboardTable
          columns={COLUMNS}
          rows={tableRows}
          searchPlaceholder="Search boards..."
          action={
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-medium text-white transition-opacity hover:opacity-90 shrink-0"
              style={{ background: "#0080FF" }}
            >
              <Plus size={14} />
              Create board
            </button>
          }
        />
      </div>
    </div>
  );
}
