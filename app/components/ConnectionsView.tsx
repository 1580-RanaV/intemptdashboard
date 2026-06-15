"use client";

import { CalendarDays, Globe, Info, KeyRound, Mail, MousePointer2, Plus, ShieldCheck, Workflow } from "lucide-react";
import { useState } from "react";
import DashboardTable, { TableColumn } from "./DashboardTable";

const tabs = [
  { key: "connections", label: "Connections", icon: <Workflow size={15} /> },
  { key: "api-keys", label: "API Keys", icon: <KeyRound size={15} /> },
  { key: "domains", label: "Domains", icon: <Globe size={15} /> },
];

const CONNECTION_COLUMNS: TableColumn[] = [
  { key: "name", label: "Name", width: "13%" },
  { key: "integration", label: "Integration", width: "18%" },
  { key: "type", label: "Type", width: "11%" },
  { key: "status", label: "Status", width: "13%" },
  { key: "lastSync", label: "Last Sync", width: "16%" },
  { key: "lastUpdated", label: "Last Updated", width: "17%" },
  { key: "createdBy", label: "Created By", width: "12%" },
];

const API_KEY_COLUMNS: TableColumn[] = [
  { key: "name", label: "Name", width: "28%" },
  { key: "key", label: "Key", width: "34%" },
  { key: "modified", label: "Modified", width: "20%" },
  { key: "labels", label: "Labels", width: "18%" },
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
  const [tab, setTab] = useState("connections");

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-100
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
                className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
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
            rows={[]}
            searchPlaceholder="Search API keys..."
            emptyState={
              <span>
                No API keys yet. Create a key to start authenticating requests.
              </span>
            }
            action={
              <div className="flex items-center gap-2">
                <button
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-200 dark:hover:bg-white/6"
                >
                  <Plus size={14} />
                  Create public key
                </button>
                <button
                  className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0080FF" }}
                >
                  <Plus size={14} />
                  Create key
                </button>
              </div>
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
                  <section
                    key={section.title}
                    className="min-h-[142px] px-1"
                  >
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
    </div>
  );
}
