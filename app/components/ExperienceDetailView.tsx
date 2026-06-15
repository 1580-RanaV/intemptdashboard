"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3, ChevronDown, ChevronLeft, ChevronRight, ChevronUp,
  Clock, Crosshair, ExternalLink, FileText,
  FlaskConical, Info, MoreHorizontal, Pencil, Plus, X,
} from "lucide-react";
import SlidingSidebar from "./SlidingSidebar";

// ── Data ───────────────────────────────────────────────────────────────────────

const EXPERIENCES: Record<string, { title: string; progress: number; daysLeft: number }> = {
  "spring-homepage-test":             { title: "Spring homepage hero test",        progress: 4,  daysLeft: 2938 },
  "returning-visitor-personalization":{ title: "Returning visitor personalization", progress: 12, daysLeft: 14   },
  "pricing-page-cta":                 { title: "Pricing page CTA experiment",      progress: 0,  daysLeft: 0    },
  "new-user-banner":                  { title: "New user onboarding banner",        progress: 67, daysLeft: 3    },
};

// ── Shared primitives ──────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white dark:bg-transparent ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  icon, title, subtitle, action,
}: {
  icon: React.ReactNode; title: string; subtitle?: string; action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-1 pb-3">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-stone-100 text-stone-500 dark:bg-white/8 dark:text-stone-400">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{title}</p>
          {subtitle && <p className="text-xs text-stone-500 dark:text-stone-400">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

function PercentInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <span className="px-2.5 text-sm font-medium text-stone-800 dark:text-stone-100 min-w-8 text-center select-none">
          {value}
        </span>
        <div className="flex flex-col border-l" style={{ borderColor: "var(--border)" }}>
          <button
            onClick={() => onChange(Math.min(100, value + 1))}
            className="flex h-4 w-5 items-center justify-center text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronUp size={9} />
          </button>
          <button
            onClick={() => onChange(Math.max(0, value - 1))}
            className="flex h-4 w-5 items-center justify-center border-t text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors"
            style={{ borderColor: "var(--border)" }}
          >
            <ChevronDown size={9} />
          </button>
        </div>
      </div>
      <span className="text-xs text-stone-500 dark:text-stone-400">%</span>
    </div>
  );
}

function ThreeDots() {
  return (
    <button className="flex h-7 w-7 items-center justify-center rounded-md text-stone-400 hover:bg-stone-100 dark:hover:bg-white/8 transition-colors">
      <MoreHorizontal size={15} />
    </button>
  );
}

function MetricTag({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 dark:bg-white/8 pl-2.5 pr-1.5 py-1">
      <span className="text-xs font-medium text-stone-700 dark:text-stone-300">{name}</span>
      <span className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-white/8 px-1.5 py-0.5">
        <span className="text-stone-500 text-xs font-semibold">#</span>
        <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Event Count</span>
      </span>
      <button
        onClick={onRemove}
        className="flex h-4 w-4 items-center justify-center rounded text-stone-400 hover:bg-stone-100 dark:hover:bg-white/8 transition-colors"
      >
        <X size={11} />
      </button>
    </div>
  );
}

// ── Variants card ──────────────────────────────────────────────────────────────

function VariantsCard() {
  const [control, setControl] = useState(5);
  const [variants, setVariants] = useState([
    { id: "v1", name: "this is the only variant I have", pct: 47 },
    { id: "v2", name: "Variant 3",                       pct: 48 },
  ]);

  function setPct(id: string, pct: number) {
    setVariants((prev) => prev.map((v) => v.id === id ? { ...v, pct } : v));
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader
        icon={<FlaskConical size={15} />}
        title="Variants"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-200 dark:bg-white/8 dark:text-stone-200 dark:hover:bg-white/12">
            <Plus size={14} />
            Add variant
          </button>
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-stone-200 dark:border-stone-700/70">
        {/* URL row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200/80 dark:border-stone-700/70">
          <Info size={14} className="text-stone-400 shrink-0" />
          <span className="flex-1 truncate text-xs text-stone-500 dark:text-stone-400">https://intempt.com</span>
          <button
            className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-200 dark:bg-white/8 dark:text-stone-200 dark:hover:bg-white/12"
          >
            Open editor
            <ExternalLink size={11} />
          </button>
        </div>

        {/* Control */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200/80 dark:border-stone-700/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300">Control</span>
            <span className="rounded-md bg-stone-100 dark:bg-white/8 px-1.5 py-0.5 text-xs font-medium text-stone-500 dark:text-stone-400">original</span>
          </div>
          <div className="flex items-center gap-2">
            <PercentInput value={control} onChange={setControl} />
            <span className="text-xs text-stone-400 dark:text-stone-500">No changes</span>
          </div>
        </div>

        {/* Variant rows */}
        {variants.map((v, i) => (
          <div
            key={v.id}
            className={`flex items-center justify-between px-4 py-3 ${i < variants.length - 1 ? "border-b border-stone-200/80 dark:border-stone-700/70" : ""}`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-medium text-stone-800 dark:text-stone-100 truncate">{v.name}</span>
              <button className="shrink-0 text-stone-300 hover:text-stone-500 dark:text-stone-600 dark:hover:text-stone-400 transition-colors">
                <Pencil size={12} />
              </button>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <PercentInput value={v.pct} onChange={(pct) => setPct(v.id, pct)} />
              <ThreeDots />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Metrics card ───────────────────────────────────────────────────────────────

function MetricsCard() {
  const [primary, setPrimary] = useState(["creating user"]);
  const [secondary, setSecondary] = useState(["New Metric"]);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader icon={<BarChart3 size={15} />} title="Metrics" />

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto rounded-xl border border-stone-200 px-4 py-4 dark:border-stone-700/70">
        {/* Primary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info size={13} className="text-stone-400" />
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">Primary Metrics</span>
            <button className="flex h-5 w-5 items-center justify-center rounded text-stone-400 hover:bg-stone-100 dark:hover:bg-white/8 transition-colors">
              <Plus size={13} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {primary.map((m) => (
              <MetricTag key={m} name={m} onRemove={() => setPrimary((p) => p.filter((x) => x !== m))} />
            ))}
          </div>
        </div>

        {/* Secondary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info size={13} className="text-stone-400" />
            <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">Secondary Metrics</span>
            <button className="flex h-5 w-5 items-center justify-center rounded text-stone-400 hover:bg-stone-100 dark:hover:bg-white/8 transition-colors">
              <Plus size={13} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {secondary.map((m) => (
              <MetricTag key={m} name={m} onRemove={() => setSecondary((p) => p.filter((x) => x !== m))} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Schedule + Targeting cards ─────────────────────────────────────────────────

function ConfigTile({
  icon, title, summary, onConfigure,
}: {
  icon: React.ReactNode; title: string; summary: string; onConfigure: () => void;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border bg-white dark:bg-stone-900 px-5 py-4"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-100 dark:bg-white/8 text-stone-500 dark:text-stone-400">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">{title}</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 truncate mt-0.5">{summary}</p>
      </div>
      <button
        onClick={onConfigure}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 transition-colors hover:bg-stone-50 dark:hover:bg-white/5"
        style={{ borderColor: "var(--border)" }}
      >
        Configure
        <ChevronRight size={12} className="text-stone-400" />
      </button>
    </div>
  );
}

// ── Main view ──────────────────────────────────────────────────────────────────

type TabKey = "setup" | "results" | "report";

export default function ExperienceDetailView({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabKey) ?? "setup";
  const [shelf, setShelf] = useState<null | "schedule" | "targeting">(null);
  const exp = EXPERIENCES[id] ?? EXPERIENCES["spring-homepage-test"];

  function setActiveTab(key: TabKey) {
    router.replace(`?tab=${key}`);
  }

  const TABS: { key: TabKey; icon: React.ReactNode }[] = [
    { key: "setup",   icon: <FlaskConical size={15} /> },
    { key: "results", icon: <BarChart3 size={15} />    },
    { key: "report",  icon: <FileText size={15} />     },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white animate-fade-up dark:bg-stone-950">
      {/* Top bar: breadcrumb left, segmented control pinned right */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b"
        style={{ background: "var(--content-bg)", borderColor: "var(--border)" }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm min-w-0 pr-4">
          <Link
            href="/experiences"
            className="inline-flex shrink-0 items-center gap-1.5 text-slate-500 transition-colors hover:text-stone-900 dark:text-slate-400 dark:hover:text-stone-100"
          >
            <ChevronLeft size={15} />
            Experiences
          </Link>
          <span className="shrink-0 text-slate-300 dark:text-slate-600">/</span>
          <span className="truncate font-medium text-stone-900 dark:text-stone-100">{exp.title}</span>
        </div>

        {/* Segmented control — always pinned right */}
        <div className="shrink-0 flex items-center gap-0.5 rounded-lg bg-stone-100 dark:bg-white/8 p-0.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all ${
                activeTab === t.key
                  ? "bg-white dark:bg-white/12 text-stone-900 dark:text-stone-100 shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              }`}
            >
              {t.icon}
              {t.key === "setup" ? "Setup" : t.key === "results" ? "Results" : "Report"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "setup" && (
        <div className="flex flex-1 flex-col gap-4 overflow-hidden px-5 pb-5 pt-3">
          <div className="flex shrink-0 items-center justify-end gap-4">
            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
              <button
                className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-stone-50 dark:hover:bg-white/5"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-stone-700 dark:text-stone-300">Active</span>
                <ChevronDown size={11} className="text-stone-400" />
              </button>
              {exp.progress > 0 ? (
                <span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{exp.progress}%</span> progress
                </span>
              ) : null}
              {exp.daysLeft > 0 ? (
                <span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{exp.daysLeft.toLocaleString()}</span> days left
                </span>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setShelf("schedule")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-[12.5px] font-medium text-stone-700 transition-colors hover:bg-stone-200 dark:bg-white/8 dark:text-stone-200 dark:hover:bg-white/12"
              >
                <Clock size={14} />
                Schedule
              </button>
              <button
                onClick={() => setShelf("targeting")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-2 text-[12.5px] font-medium text-stone-700 transition-colors hover:bg-stone-200 dark:bg-white/8 dark:text-stone-200 dark:hover:bg-white/12"
              >
                <Crosshair size={14} />
                Targeting
              </button>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] gap-4">
            <div className="flex min-h-0 flex-col">
              <VariantsCard />
            </div>
            <div className="flex min-h-0 flex-col">
              <MetricsCard />
            </div>
          </div>
        </div>
      )}

      {activeTab === "results" && (
        <div className="flex-1 flex items-center justify-center text-stone-400 dark:text-stone-600">
          <div className="text-center">
            <BarChart3 size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Results will appear here once the experience is running</p>
          </div>
        </div>
      )}

      {activeTab === "report" && (
        <div className="flex-1 flex items-center justify-center text-stone-400 dark:text-stone-600">
          <div className="text-center">
            <FileText size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Reports are generated after the experience ends</p>
          </div>
        </div>
      )}

      {shelf ? (
        <SlidingSidebar
          title={shelf === "schedule" ? "Schedule" : "Targeting"}
          description={shelf === "schedule" ? "Control when this experience runs." : "Define who is eligible for this experience."}
          onClose={() => setShelf(null)}
          footerBorder={false}
          footer={(close) => (
            <>
              <button
                onClick={close}
                className="rounded-lg px-4 py-2 text-[13px] font-medium text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/8"
              >
                Cancel
              </button>
              <button className="rounded-lg px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "#0080FF" }}>
                Save
              </button>
            </>
          )}
        >
          {shelf === "schedule" ? (
            <div className="space-y-6">
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">Run mode</p>
                <div className="mt-3 rounded-xl bg-stone-100 p-1 dark:bg-white/8">
                  <button className="w-full rounded-lg bg-white px-3 py-2 text-left text-[13px] font-medium text-stone-900 shadow-sm dark:bg-white/10 dark:text-stone-100">
                    Runs continuously
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">Start</p>
                <p className="mt-2 text-[13px] font-medium text-stone-500 dark:text-stone-400">Immediately after publishing</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">End</p>
                <p className="mt-2 text-[13px] font-medium text-stone-500 dark:text-stone-400">No scheduled end date</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">Audience</p>
                <p className="mt-2 text-[13px] font-medium text-stone-500 dark:text-stone-400">All users</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">Frequency</p>
                <p className="mt-2 text-[13px] font-medium text-stone-500 dark:text-stone-400">Always eligible</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-stone-900 dark:text-stone-100">Devices</p>
                <p className="mt-2 text-[13px] font-medium text-stone-500 dark:text-stone-400">Desktop only</p>
              </div>
            </div>
          )}
        </SlidingSidebar>
      ) : null}
    </div>
  );
}
