"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Home,
  Palette,
  Users,
  Activity,
  UserCheck,
  Plug,
  Library,
  UserCircle,
  Clapperboard,
  PersonStanding,
  PenTool,
  Package,
  Rss,
  Route,
  Shuffle,
  Building2,
  Handshake,
  CalendarDays,
  CalendarClock,
  BarChart2,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Check,
  Settings,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  children?: NavItem[];
};

type NavSection = {
  heading?: string;
  items: NavItem[];
};

const nav: NavSection[] = [
  {
    items: [
      { label: "Home", icon: <Home size={15} /> },
      { label: "Brand", icon: <Palette size={15} /> },
      { label: "Users", icon: <Users size={15} /> },
      { label: "Events", icon: <Activity size={15} /> },
      { label: "Subscribers", icon: <UserCheck size={15} /> },
      { label: "Connections", icon: <Plug size={15} /> },
    ],
  },
  {
    heading: "Design",
    items: [
      { label: "Asset Library", icon: <Library size={15} /> },
      { label: "Avatars", icon: <UserCircle size={15} /> },
      { label: "Scenes", icon: <Clapperboard size={15} /> },
      { label: "Poses", icon: <PersonStanding size={15} /> },
      { label: "Design System", icon: <PenTool size={15} /> },
    ],
  },
  {
    heading: "Marketing",
    items: [
      {
        label: "Catalog",
        icon: <Package size={15} />,
        children: [{ label: "Feeds", icon: <Rss size={15} /> }],
      },
      { label: "Journeys", icon: <Route size={15} /> },
      { label: "Experiences", icon: <Shuffle size={15} /> },
    ],
  },
  {
    heading: "Sales",
    items: [
      {
        label: "Accounts",
        icon: <Building2 size={15} />,
        children: [{ label: "Deals", icon: <Handshake size={15} /> }],
      },
      {
        label: "Meetings",
        icon: <CalendarDays size={15} />,
        children: [{ label: "Scheduler", icon: <CalendarClock size={15} /> }],
      },
    ],
  },
  {
    heading: "Analytics",
    items: [
      { label: "Boards", icon: <BarChart2 size={15} /> },
      { label: "Subscription", icon: <CreditCard size={15} /> },
    ],
  },
];

const projects = [
  { name: "Dev Playground", initials: "DP", color: "#e05252" },
  { name: "Linea", initials: "L", color: "#818cf8" },
];

const organizations = [
  { name: "fieldsusa", initials: "F", color: "#22c55e" },
  { name: "Intempt External Use", initials: "IE", color: "#6366f1" },
  { name: "Intempt Internal Use Only", initials: "II", color: "#8b5cf6", active: true },
  { name: "Intempt Technologies", initials: "IT", color: "#0ea5e9" },
  { name: "StockInvest.us", initials: "S", color: "#16a34a" },
];

function Avatar({
  initials,
  color,
  size = 22,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </span>
  );
}

type WorkspaceItem = { name: string; initials: string; color: string; active?: boolean };

function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<WorkspaceItem>(projects[1]); // Linea
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  function select(item: WorkspaceItem) {
    setSelected(item);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative px-3 pt-3 pb-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-stone-200/60 dark:hover:bg-white/6 transition-colors group"
      >
        <Avatar initials={selected.initials} color={selected.color} size={22} />
        <span className="flex-1 text-left text-[13px] font-semibold text-stone-800 dark:text-stone-100 truncate">
          {selected.name}
        </span>
        <ChevronDown
          size={13}
          className={`text-stone-400 dark:text-stone-500 transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-2 top-[calc(100%-4px)] z-50 overflow-hidden w-64 animate-card-in"
          style={{
            background: "var(--content-bg)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
          }}
        >
          {/* Projects */}
          <div className="px-2 pt-2.5 pb-1">
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-600">
              Projects
            </p>
            {projects.map((p) => (
              <button
                key={p.name}
                onClick={() => select(p)}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/6 transition-colors group"
              >
                <Avatar initials={p.initials} color={p.color} size={20} />
                <span className="flex-1 text-left text-[12.5px] text-stone-700 dark:text-stone-300">
                  {p.name}
                </span>
                {selected.name === p.name ? (
                  <Check size={12} className="text-blue-500 shrink-0" />
                ) : (
                  <span onClick={(e) => { e.stopPropagation(); router.push("/settings"); setOpen(false); }}>
                    <Settings size={12} className="text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:text-stone-500" />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mx-2 border-t border-stone-100 dark:border-stone-700/50" />

          {/* Organizations */}
          <div className="px-2 pt-2 pb-2.5">
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-600">
              Organizations
            </p>
            {organizations.map((o) => (
              <button
                key={o.name}
                onClick={() => select(o)}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/6 transition-colors group"
              >
                <Avatar initials={o.initials} color={o.color} size={20} />
                <span className="flex-1 text-left text-[12.5px] text-stone-700 dark:text-stone-300">
                  {o.name}
                </span>
                {selected.name === o.name ? (
                  <Check size={12} className="text-blue-500 shrink-0" />
                ) : (
                  <span onClick={(e) => { e.stopPropagation(); router.push("/settings"); setOpen(false); }}>
                    <Settings size={12} className="text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:text-stone-500" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Nav items that map to dedicated views
const NAV_VIEWS: Record<string, string> = {
  Brand: "brand",
  Users: "users",
  Events: "events",
  Subscribers: "subscribers",
  Connections: "connections",
  "Asset Library": "asset-library",
  Avatars: "avatars",
  Scenes: "scenes",
  Poses: "poses",
  "Design System": "design-system",
  Catalog: "catalog",
  Feeds: "feeds",
  Journeys: "journeys",
  Experiences: "experiences",
  Accounts: "accounts",
  Deals: "deals",
  Meetings: "meetings",
  Scheduler: "scheduler",
  Boards: "boards",
  Subscription: "subscription",
};

function NavItemRow({
  item,
  depth = 0,
  activeItem,
}: {
  item: NavItem;
  depth?: number;
  activeItem: string;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeItem === item.label;
  const view = NAV_VIEWS[item.label];
  const href = item.label === "Home" ? "/home" : view ? `/${view}` : "#";
  const rowClassName = `
    w-full flex items-center gap-2.5 px-3 py-1.25 rounded-md text-left
    text-[13px] font-[450] transition-colors duration-100 group
    ${isActive
      ? "bg-white dark:bg-white/8 text-stone-800 dark:text-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/6 hover:text-stone-800 dark:hover:text-stone-100"
    }
  `;
  const rowContent = (
    <>
      <span className={isActive ? "text-blue-600" : "text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400"}>
        {item.icon}
      </span>
      <span className="flex-1 leading-none">{item.label}</span>
    </>
  );

  return (
    <div>
      {view || item.label === "Home" ? (
        <Link href={href} className={rowClassName}>{rowContent}</Link>
      ) : (
        <button className={rowClassName}>{rowContent}</button>
      )}

      {hasChildren && (
        <div className="mt-0.5 mb-1.5">
          {item.children!.map((child, idx) => {
            const isLast = idx === item.children!.length - 1;
            return (
              <div key={child.label} className="relative ml-5.5 pl-4">
                <span className="pointer-events-none absolute left-0 top-0 w-3.5 h-3.25 border-l-2 border-b-2 border-stone-400/60 dark:border-stone-500/50 rounded-bl-[5px]" />
                {!isLast && (
                  <span className="pointer-events-none absolute left-0 top-3.25 bottom-0 border-l-2 border-stone-400/60 dark:border-stone-500/50" />
                )}
                <NavItemRow
                  item={child}
                  depth={depth + 1}
                  activeItem={activeItem}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CollapsibleSection({
  section,
  activeItem,
}: {
  section: NavSection;
  activeItem: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {section.heading ? (
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-1 px-3 mb-1.5 group"
        >
          <span className="flex-1 text-left text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-600 leading-none">
            {section.heading}
          </span>
          <ChevronRight
            size={10}
            className={`text-stone-400 dark:text-stone-600 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          />
        </button>
      ) : null}

      {open && (
        <div className="space-y-px">
          {section.items.map((item) => (
            <NavItemRow
              key={item.label}
              item={item}
              activeItem={activeItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const currentView = pathname === "/home" ? "Home" : Object.entries(NAV_VIEWS).find(([, view]) => pathname === `/${view}`)?.[0] ?? "";

  return (
    <aside
      className="flex flex-col h-full select-none"
      style={{
        width: 196,
        minWidth: 196,
        background: "var(--main-bg)",
      }}
    >
      {/* Top: workspace switcher */}
      <WorkspaceSwitcher />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-5">
        {nav.map((section, si) => (
          <CollapsibleSection
            key={si}
            section={section}
            activeItem={currentView}
          />
        ))}
      </nav>

      {/* Bottom: Intempt branding */}
      <div className="flex items-center gap-2 px-4 py-3.5">
        <Image
          src="/logo.png"
          alt="Intempt"
          width={18}
          height={18}
          className="rounded-md opacity-60"
          style={{ objectFit: "contain" }}
        />
        <span className="flex-1 text-[12px] font-medium text-stone-400 dark:text-stone-600 tracking-tight">
          Intempt
        </span>
        <button className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-600 flex items-center justify-center hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-100 dark:hover:bg-white/6 transition-colors shrink-0">
          <span className="text-[10px] font-semibold text-stone-400 dark:text-stone-500 leading-none">?</span>
        </button>
      </div>
    </aside>
  );
}
