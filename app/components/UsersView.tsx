"use client";

import { useState } from "react";
import { Plus, Table2 } from "lucide-react";
import CreateUserDrawer from "./CreateUserDrawer";
import DashboardTable, { TableColumn } from "./DashboardTable";

const USER_COLUMNS: TableColumn[] = [
  { key: "user", label: "User", width: "22%" },
  { key: "accountName", label: "Account name", width: "22%" },
  { key: "email", label: "Email", width: "24%" },
  { key: "jobTitle", label: "Job title", width: "16%" },
  { key: "intemptTags", label: "Intempt tags", width: "16%" },
];

export default function UsersView() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-[13px] font-medium text-blue-600 transition-colors duration-100 dark:bg-blue-500/10 dark:text-blue-400">
          <Table2 size={15} />
          Table
        </button>
      </div>

      <div className="flex-1 min-h-0 px-4 pb-4 pt-4 animate-fade-up">
        <DashboardTable
          columns={USER_COLUMNS}
          rows={[]}
          searchPlaceholder="Search users..."
          emptyState="No users yet."
          action={
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#0080FF" }}
            >
              <Plus size={14} />
              Create user
            </button>
          }
        />
      </div>

      {drawerOpen && <CreateUserDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
