"use client";

import { CalendarDays, Copy, Globe, Info, KeyRound, Mail, MousePointer2, Pencil, Plus, RefreshCw, ShieldCheck, Trash2, Workflow } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import DashboardTable, { TableColumn, TableRow } from "./DashboardTable";
import AddIntegrationDrawer from "./AddIntegrationDrawer";
import CreateApiKeyDrawer from "./CreateApiKeyDrawer";

const tabs = [
  { key: "connections", label: "Integrations", icon: <Workflow size={15} /> },
  { key: "api-keys",    label: "API Keys",    icon: <KeyRound size={15} /> },
  { key: "domains",     label: "Domains",     icon: <Globe size={15} /> },
];

const CONNECTION_COLUMNS: TableColumn[] = [
  { key: "name",        label: "Name",         width: "13%" },
  { key: "integration", label: "Integration",  width: "18%" },
  { key: "type",        label: "Type",         width: "11%" },
  { key: "status",      label: "Status",       width: "13%" },
  { key: "lastSync",    label: "Last Sync",    width: "16%" },
  { key: "lastUpdated", label: "Last Updated", width: "17%" },
  { key: "createdBy",   label: "Created By",   width: "12%" },
];

const API_KEY_COLUMNS: TableColumn[] = [
  { key: "name",     label: "Name",     width: "28%" },
  { key: "key",      label: "Key",      width: "34%" },
  { key: "modified", label: "Modified", width: "20%" },
  { key: "labels",   label: "Labels",   width: "18%" },
];

const INITIAL_API_KEYS: TableRow[] = [
  {
    id: "1",
    cells: {
      name:     "1756039631343251456",
      key:      "a37729af45b0430f9d0d21a2979331c2.1ce99933b19649f297b8cf2a45473dc5",
      modified: "Apr 16, 2026",
      labels:   "Full access",
    },
  },
];

const domainSections = [
  {
    title: "Booking",
    description: "Custom domain for team booking pages.",
    empty: "No org domains enabled for booking.",
    icon: <CalendarDays size={17} />,
  },
  {
    title: "Tracking",
    description: "Custom domain for click and open tracking links in emails.",
    empty: "No org domains enabled for tracking.",
    icon: <MousePointer2 size={17} />,
  },
  {
    title: "Privacy center",
    description: "Custom domain for the privacy and preference center page.",
    empty: "No org domains enabled for privacy center.",
    icon: <ShieldCheck size={17} />,
  },
  {
    title: "Sending domain & email addresses",
    description: "Pick a verified org sending domain, then add the per-project email addresses your project sends from.",
    empty: "No sending domain at the org level yet.",
    icon: <Mail size={17} />,
  },
];

export default function ConnectionsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "connections";
  const [addOpen, setAddOpen] = useState(false);
  const [createKeyOpen, setCreateKeyOpen] = useState(false);
  const [apiKeyRows, setApiKeyRows] = useState<TableRow[]>(INITIAL_API_KEYS);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const commitRef = useRef(false);

  function setTab(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function startRename(row: TableRow) {
    commitRef.current = false;
    setRenamingId(row.id);
    setRenameValue(String(row.cells.name));
  }

  function commitRename(id: string, value: string) {
    if (commitRef.current) return;
    commitRef.current = true;
    setApiKeyRows((prev) =>
      prev.map((r) => r.id === id ? { ...r, cells: { ...r.cells, name: value.trim() || r.cells.name } } : r)
    );
    setRenamingId(null);
  }

  function makeMenuItems(row: TableRow) {
    return [
      { label: "Rename",     icon: Pencil,    onClick: () => startRename(row) },
      { label: "Copy",       icon: Copy,      onClick: () => navigator.clipboard.writeText(String(row.cells.key)) },
      { label: "Regenerate", icon: RefreshCw },
      { label: "Delete",     icon: Trash2,    tone: "danger" as const, onClick: () => setApiKeyRows((prev) => prev.filter((r) => r.id !== row.id)) },
    ];
  }

  const displayRows: TableRow[] = apiKeyRows.map((row) => ({
    ...row,
    menuItems: makeMenuItems(row),
    cells: {
      ...row.cells,
      name: renamingId === row.id ? (
        <input
          autoFocus
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onBlur={() => commitRename(row.id, renameValue)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.currentTarget.blur(); }
            if (e.key === "Escape") { commitRef.current = true; setRenamingId(null); }
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded border border-blue-400 bg-white px-2 py-1 text-sm font-medium text-stone-900 outline-none ring-2 ring-blue-500/10 dark:bg-stone-900 dark:text-stone-100"
        />
      ) : row.cells.name,
    },
  }));

  return (
    <div className="relative flex flex-1 flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium transition-colors duration-100
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
        {tab === "connections" ? (
          <DashboardTable
            columns={CONNECTION_COLUMNS}
            rows={[]}
            searchPlaceholder="Search connections..."
            emptyState={
              <span>
                No connected integrations yet. Click <span className="font-semibold text-slate-600 dark:text-slate-300">Add Integration</span> to get started.
              </span>
            }
            action={
              <button
                onClick={() => setAddOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 h-9 text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#0080FF" }}
              >
                <Plus size={14} />
                Add Integration
              </button>
            }
          />
        ) : tab === "api-keys" ? (
          <DashboardTable
            columns={API_KEY_COLUMNS}
            rows={displayRows}
            searchPlaceholder="Search API keys..."
            emptyState={
              <span>No API keys yet. Create a key to start authenticating requests.</span>
            }
            action={
              <button
                onClick={() => setCreateKeyOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 h-9 text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#0080FF" }}
              >
                <Plus size={14} />
                Create key
              </button>
            }
          />
        ) : (
          <div className="min-h-0 overflow-y-auto pb-2">
            <div className="max-w-6xl">
              <div className="mb-8 flex items-start gap-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                <Info size={17} className="mt-0.5 shrink-0 text-stone-500 dark:text-stone-400" />
                <p>Root domains are added and DNS-verified once at the organization level. Each project picks which verified domain to use here.</p>
              </div>

              <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
                {domainSections.map((section) => (
                  <section key={section.title} className="min-h-35.5 px-1">
                    <div className="mb-2 flex items-center gap-2.5 text-stone-950 dark:text-stone-50">
                      {section.icon}
                      <h3 className="text-base font-semibold">{section.title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-stone-500 dark:text-stone-400">{section.description}</p>
                    <p className="mt-5 text-sm font-medium text-stone-500 dark:text-stone-400">{section.empty}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {addOpen && <AddIntegrationDrawer onClose={() => setAddOpen(false)} />}
      {createKeyOpen && (
        <CreateApiKeyDrawer
          onClose={() => setCreateKeyOpen(false)}
          onCreate={(row) => setApiKeyRows((prev) => [...prev, row])}
        />
      )}
    </div>
  );
}
