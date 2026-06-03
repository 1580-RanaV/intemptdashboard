"use client";

import {
  Activity,
  BarChart2,
  Building2,
  CalendarClock,
  CalendarDays,
  Clapperboard,
  CreditCard,
  Handshake,
  Library,
  PenTool,
  PersonStanding,
  Rss,
  UserCheck,
  UserCircle,
  Users,
} from "lucide-react";
import BrandView from "./BrandView";
import CatalogView from "./CatalogView";
import ConnectionsView from "./ConnectionsView";
import DateRangePicker from "./DateRangePicker";
import ExperiencesView from "./ExperiencesView";
import FeedsView from "./FeedsView";
import GenericView from "./GenericView";
import JourneysView from "./JourneysView";

const GENERIC_VIEWS: Record<string, { label: string; icon: React.ReactNode }> = {
  users: { label: "Create user", icon: <Users size={18} /> },
  events: { label: "Create event", icon: <Activity size={18} /> },
  subscribers: { label: "Create subscriber", icon: <UserCheck size={18} /> },
  "asset-library": { label: "Upload asset", icon: <Library size={18} /> },
  avatars: { label: "Create avatar", icon: <UserCircle size={18} /> },
  scenes: { label: "Create scene", icon: <Clapperboard size={18} /> },
  poses: { label: "Create pose", icon: <PersonStanding size={18} /> },
  "design-system": { label: "Add component", icon: <PenTool size={18} /> },
  accounts: { label: "Create account", icon: <Building2 size={18} /> },
  deals: { label: "Create deal", icon: <Handshake size={18} /> },
  meetings: { label: "Create meeting", icon: <CalendarDays size={18} /> },
  scheduler: { label: "Create schedule", icon: <CalendarClock size={18} /> },
  boards: { label: "Create board", icon: <BarChart2 size={18} /> },
  subscription: { label: "Manage subscription", icon: <CreditCard size={18} /> },
};

export function HomeEmpty() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-400">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-medium text-stone-600 dark:text-stone-300">Nothing here yet</p>
          <p className="text-[12px] text-stone-400 mt-0.5">Select an item from the sidebar to get started</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardView({ view = "home" }: { view?: string }) {
  const generic = GENERIC_VIEWS[view];

  if (view === "brand") return <BrandView />;
  if (view === "catalog") return <CatalogView />;
  if (view === "feeds") return <FeedsView />;
  if (view === "journeys") return <JourneysView />;
  if (view === "experiences") return <ExperiencesView />;
  if (view === "connections") return <ConnectionsView />;

  if (generic) {
    return (
      <GenericView
        createLabel={generic.label}
        icon={generic.icon}
        topbarLeft={view === "boards" ? <DateRangePicker /> : undefined}
      />
    );
  }

  return <HomeEmpty />;
}
