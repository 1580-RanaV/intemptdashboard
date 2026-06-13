"use client";

import { useState } from "react";
import { ArrowUpDown, Clock3, Copy, ExternalLink, Plus, Search, Users } from "lucide-react";
import CreateBookingDrawer from "./CreateBookingDrawer";
import ThreeDotsMenu from "./ThreeDotsMenu";

const bookingTypes = [
  { name: "test-meeting", tags: [{ label: "Individual", tone: "green" }], duration: "30m" },
  { name: "Test Meeting", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "15m" },
  { name: "Product Demo", tags: [{ label: "All", tone: "gray" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
  { name: "Test Booking 123", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
  { name: "Discovery Call", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
  { name: "Onboarding-2", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "1h" },
  { name: "Test meeting 3", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
  { name: "Business", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
  { name: "Onboarding", tags: [{ label: "All", tone: "gray" }, { label: "Product Team", tone: "outline" }], duration: "1h" },
  { name: "Product Query", tags: [{ label: "Round robin", tone: "blue" }, { label: "Product Team", tone: "outline" }], duration: "30m" },
] as const;

function Tag({ label, tone }: { label: string; tone: "green" | "blue" | "gray" | "outline" }) {
  const className = {
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300",
    gray: "bg-stone-100 text-stone-600 dark:bg-white/8 dark:text-stone-300",
    outline: "border border-stone-200 bg-white text-stone-700 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-200",
  }[tone];

  return <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11.5px] font-medium ${className}`}>{label}</span>;
}

export default function SchedulerView() {
  const [showCreateBooking, setShowCreateBooking] = useState(false);

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-y-auto px-4 pb-4 pt-4 animate-fade-up">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative w-full max-w-[320px]">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
            <input
              type="search"
              placeholder="Search booking types..."
              className="h-9 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-[12.5px] font-medium text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>
          <button className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-stone-200 bg-white px-3.5 text-[12.5px] font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:bg-white/[0.03] dark:text-stone-300 dark:hover:bg-white/6 dark:hover:text-stone-100">
            <ArrowUpDown size={13} />
            Sort by
          </button>
        </div>
        <button
          onClick={() => setShowCreateBooking(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "#0080FF" }}
        >
          <Plus size={14} />
          Create a booking
        </button>
      </div>

      <div className="min-w-[980px]">
        {bookingTypes.map((item) => (
          <div
            key={item.name}
            className="grid min-h-[58px] grid-cols-[minmax(220px,1.2fr)_minmax(260px,1fr)_120px_170px_112px] items-center border-b border-stone-200/80 px-4 dark:border-stone-700/70"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <Users size={16} className="shrink-0 text-slate-500 dark:text-slate-400" />
              <span className="truncate text-[13px] font-medium text-stone-900 dark:text-stone-100">{item.name}</span>
            </div>

            <div className="flex min-w-0 items-center gap-2">
              {item.tags.map((tag) => (
                <Tag key={`${item.name}-${tag.label}`} label={tag.label} tone={tag.tone} />
              ))}
            </div>

            <div className="flex items-center text-stone-900 dark:text-stone-100">
              <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-stone-200 bg-white px-2.5 text-[12px] font-medium dark:border-stone-700 dark:bg-white/[0.03]">
                <Clock3 size={13} />
                {item.duration}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[12.5px] font-medium text-slate-500 dark:text-slate-400">Visible</span>
              <button
                type="button"
                aria-label={`${item.name} visibility`}
                className="relative h-6 w-11 rounded-full bg-blue-600 shadow-sm"
              >
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 text-stone-900 dark:text-stone-100">
              <button className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-stone-100 dark:hover:bg-white/8" aria-label="Open booking page">
                <ExternalLink size={16} />
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-stone-100 dark:hover:bg-white/8" aria-label="Copy booking link">
                <Copy size={16} />
              </button>
              <ThreeDotsMenu />
            </div>
          </div>
        ))}
      </div>

      {showCreateBooking ? <CreateBookingDrawer onClose={() => setShowCreateBooking(false)} /> : null}
    </div>
  );
}
