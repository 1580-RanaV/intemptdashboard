"use client";

import { CalendarDays, Plus, Table2 } from "lucide-react";
import DashboardTable, { TableColumn, TableRow } from "./DashboardTable";

const MEETING_COLUMNS: TableColumn[] = [
  { key: "meeting", label: "Meeting", width: "28%" },
  { key: "startTime", label: "Start time", width: "18%" },
  { key: "endTime", label: "End time", width: "18%" },
  { key: "participants", label: "Participants", width: "22%" },
  { key: "status", label: "Status", width: "14%" },
];

function MeetingName({ name }: { name: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300">
        <CalendarDays size={15} />
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}

function Participant({ initial, name, more, color }: { initial: string; name: string; more: string; color: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white ${color}`}>{initial}</span>
      <span className="truncate">{name}</span>
      <span className="shrink-0 text-[12px] font-medium text-slate-500 dark:text-slate-400">{more}</span>
    </span>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: "blue" | "red" | "green" }) {
  const color = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/12 dark:text-blue-300",
    red: "bg-red-50 text-red-500 dark:bg-red-500/12 dark:text-red-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300",
  }[tone];

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium ${color}`}>{label}</span>;
}

const MEETING_ROWS: TableRow[] = [
  {
    id: "product-sync-jun4",
    href: "/meetings/rd-check-in",
    cells: {
      meeting: <MeetingName name="Product Sync" />,
      startTime: "Jun 4, 2026 07:00 PM",
      endTime: "Jun 4, 2026 07:30 PM",
      participants: <Participant initial="R" name="rana@intempt.c..." more="+4 more" color="bg-slate-200 !text-slate-500" />,
      status: <StatusBadge label="Scheduled" tone="blue" />,
    },
  },
  {
    id: "rd-checkin-jun4",
    href: "/meetings/rd-check-in",
    cells: {
      meeting: <MeetingName name="R&D check-in" />,
      startTime: "Jun 4, 2026 08:00 PM",
      endTime: "Jun 4, 2026 08:30 PM",
      participants: <Participant initial="M" name="matvey@intempt..." more="+10 more" color="bg-orange-500" />,
      status: <StatusBadge label="Scheduled" tone="blue" />,
    },
  },
  {
    id: "desktop-discussion",
    cells: {
      meeting: <MeetingName name="Discussion about Desktop a..." />,
      startTime: "Jun 4, 2026 03:30 PM",
      endTime: "Jun 4, 2026 04:00 PM",
      participants: <Participant initial="A" name="aman.patel@inte..." more="+2 more" color="bg-emerald-500" />,
      status: <StatusBadge label="Not Allowed In" tone="red" />,
    },
  },
  {
    id: "test-meeting-1215",
    cells: {
      meeting: <MeetingName name="Test Meeting" />,
      startTime: "Jun 4, 2026 12:15 PM",
      endTime: "Jun 4, 2026 12:30 PM",
      participants: <Participant initial="G" name="gugushvilibesik..." more="+1 more" color="bg-pink-500" />,
      status: <StatusBadge label="Canceled" tone="red" />,
    },
  },
  {
    id: "test-meeting-blocked",
    cells: {
      meeting: <MeetingName name="Test Meeting" />,
      startTime: "Jun 4, 2026 12:15 PM",
      endTime: "Jun 4, 2026 12:30 PM",
      participants: <Participant initial="R" name="rana@intempt.c..." more="+1 more" color="bg-slate-200 !text-slate-500" />,
      status: <StatusBadge label="Not Allowed In" tone="red" />,
    },
  },
  {
    id: "rd-standup-jun4",
    cells: {
      meeting: <MeetingName name="R&D Standup" />,
      startTime: "Jun 4, 2026 11:30 AM",
      endTime: "Jun 4, 2026 12:00 PM",
      participants: <Participant initial="M" name="matvey@intempt..." more="+10 more" color="bg-orange-500" />,
      status: <StatusBadge label="Denied Entry" tone="red" />,
    },
  },
  {
    id: "rd-standup-jun5",
    cells: {
      meeting: <MeetingName name="R&D Standup" />,
      startTime: "Jun 5, 2026 11:30 AM",
      endTime: "Jun 5, 2026 12:00 PM",
      participants: <Participant initial="M" name="matvey@intempt..." more="+10 more" color="bg-orange-500" />,
      status: <StatusBadge label="Scheduled" tone="blue" />,
    },
  },
  {
    id: "rd-checkin-jun3",
    cells: {
      meeting: <MeetingName name="R&D check-in" />,
      startTime: "Jun 3, 2026 08:00 PM",
      endTime: "Jun 3, 2026 09:03 PM",
      participants: <Participant initial="K" name="koray@intempt.c..." more="+11 more" color="bg-red-500" />,
      status: <StatusBadge label="Completed" tone="green" />,
    },
  },
];

export default function MeetingsView() {
  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-y-auto">
      <div className="flex items-center gap-1 px-4 pt-3 shrink-0">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-[13px] font-medium text-blue-600 transition-colors duration-100 dark:bg-blue-500/10 dark:text-blue-400">
          <Table2 size={15} />
          Table
        </button>
      </div>

      <div className="flex-1 min-h-0 px-4 pb-4 pt-4 animate-fade-up">
        <DashboardTable
          columns={MEETING_COLUMNS}
          rows={MEETING_ROWS}
          searchPlaceholder="Search meetings..."
          action={
            <button
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "#0080FF" }}
            >
              <Plus size={14} />
              Create meeting
            </button>
          }
        />
      </div>
    </div>
  );
}
