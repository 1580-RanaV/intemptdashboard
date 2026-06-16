"use client";

import { useState } from "react";
import { BarChart2, LayoutDashboard, Plus, Table2 } from "lucide-react";
import CreateUserDrawer from "./CreateUserDrawer";
import DashboardTable, { TableColumn } from "./DashboardTable";

const USER_COLUMNS: TableColumn[] = [
  { key: "user", label: "User", width: "22%" },
  { key: "accountName", label: "Account name", width: "22%" },
  { key: "email", label: "Email", width: "24%" },
  { key: "jobTitle", label: "Job title", width: "16%" },
  { key: "intemptTags", label: "Intempt tags", width: "16%" },
];

const TABS = [
  { key: "table",     label: "Table",     icon: <Table2 size={14} /> },
  { key: "board",     label: "Board",     icon: <LayoutDashboard size={14} /> },
  { key: "analytics", label: "Analytics", icon: <BarChart2 size={14} /> },
] as const;

type Tab = typeof TABS[number]["key"];

export default function UsersView() {
  const [tab, setTab]             = useState<Tab>("table");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex h-9 items-center gap-2 px-3 rounded-lg text-sm font-medium transition-colors duration-100
              ${tab === t.key
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/6"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="flex-1 min-h-0 px-4 pb-4 pt-4 animate-fade-up">
        {tab === "table" && (
          <DashboardTable
            columns={USER_COLUMNS}
            rows={[]}
            searchPlaceholder="Search users..."
            emptyState="No users yet."
            action={
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#0080FF" }}
              >
                <Plus size={14} />
                Create user
              </button>
            }
          />
        )}
        {tab === "board" && (
          <div className="flex flex-1 h-full items-center justify-center">
            <div className="text-center space-y-1.5">
              <LayoutDashboard size={24} className="mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Board view coming soon</p>
            </div>
          </div>
        )}
        {tab === "analytics" && (
          <div className="flex flex-1 h-full items-center justify-center">
            <div className="text-center space-y-1.5">
              <BarChart2 size={24} className="mx-auto text-stone-300 dark:text-stone-600" />
              <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Analytics view coming soon</p>
            </div>
          </div>
        )}
      </div>

      {drawerOpen && <CreateUserDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
