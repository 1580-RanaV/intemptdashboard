"use client";

import { Plus } from "lucide-react";
import DashboardTable, { TableColumn, TableRow } from "./DashboardTable";

const FEED_COLUMNS: TableColumn[] = [
  { key: "name", label: "Name", width: "48%" },
  { key: "type", label: "Type", width: "12%" },
  { key: "status", label: "Status", width: "12%" },
  { key: "lastUpdated", label: "Last Updated", width: "18%" },
  { key: "createdBy", label: "Created By", width: "10%" },
];

const FEED_ROWS: TableRow[] = [
  {
    id: "cart",
    cells: {
      name: "Continue where you left off - items in your cart",
      type: { value: "Regular", muted: true },
      status: { label: "Active", tone: "green" },
      lastUpdated: { value: "Feb 24, 2026 - 10:06 PM", muted: true },
      createdBy: "rana",
    },
  },
  {
    id: "popular",
    cells: {
      name: "Popular Right Now",
      type: { value: "Regular", muted: true },
      status: { label: "Active", tone: "green" },
      lastUpdated: { value: "Apr 22, 2026 - 4:53 PM", muted: true },
      createdBy: "Somya Nayak",
    },
  },
  {
    id: "new-arrivals",
    cells: {
      name: "New Arrivals",
      type: { value: "Regular", muted: true },
      status: { label: "Active", tone: "green" },
      lastUpdated: { value: "Apr 22, 2026 - 4:54 PM", muted: true },
      createdBy: "Somya Nayak",
    },
  },
  {
    id: "top-category",
    cells: {
      name: "Top Sellers in Category",
      type: { value: "Regular", muted: true },
      status: { label: "Active", tone: "green" },
      lastUpdated: { value: "Apr 22, 2026 - 4:59 PM", muted: true },
      createdBy: "Somya Nayak",
    },
  },
  {
    id: "featured",
    cells: {
      name: "Featured Picks",
      type: { value: "Regular", muted: true },
      status: { label: "Active", tone: "green" },
      lastUpdated: { value: "Apr 22, 2026 - 5:02 PM", muted: true },
      createdBy: "Somya Nayak",
    },
  },
];

export default function FeedsView() {
  return (
    <div className="flex-1 min-h-0 px-4 pb-4 pt-4">
      <DashboardTable
        columns={FEED_COLUMNS}
        rows={FEED_ROWS}
        searchPlaceholder="Search feeds..."
        action={
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-90 shrink-0"
            style={{ background: "#0080FF" }}
          >
            <Plus size={14} />
            Create feed
          </button>
        }
      />
    </div>
  );
}
