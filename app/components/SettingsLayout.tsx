"use client";

import { useState } from "react";
import {
  ChevronLeft,
  User,
  Clock,
  Link2,
  Inbox,
  Globe,
  Info,
  Users,
  MessageSquare,
  CalendarDays,
} from "lucide-react";

type SettingsItem = {
  label: string;
  icon: React.ReactNode;
  key: string;
};

type SettingsSection = {
  heading: string;
  items: SettingsItem[];
};

const settingsNav: SettingsSection[] = [
  {
    heading: "Profile",
    items: [
      { label: "About me", icon: <User size={14} />, key: "about" },
      { label: "My availability", icon: <Clock size={14} />, key: "availability" },
      { label: "Connections", icon: <Link2 size={14} />, key: "connections" },
      { label: "Inbox", icon: <Inbox size={14} />, key: "inbox" },
    ],
  },
  {
    heading: "Organization",
    items: [
      { label: "Domains", icon: <Globe size={14} />, key: "domains" },
    ],
  },
  {
    heading: "Project",
    items: [
      { label: "Basic info", icon: <Info size={14} />, key: "basic" },
      { label: "People", icon: <Users size={14} />, key: "people" },
      { label: "Messages", icon: <MessageSquare size={14} />, key: "messages" },
      { label: "Meetings", icon: <CalendarDays size={14} />, key: "meetings" },
    ],
  },
];

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-stone-100 dark:border-stone-700/40 last:border-0">
      <div className="flex-1 min-w-0 pr-8">
        <p className="text-sm font-medium text-stone-700 dark:text-stone-200">{label}</p>
        {description && (
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function FakeSelect({ value }: { value: string }) {
  return (
    <button className="flex h-9 items-center gap-2 px-3 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
      <span className="text-xs text-stone-700 dark:text-stone-200">{value}</span>
      <ChevronLeft size={11} className="text-stone-400 -rotate-90" />
    </button>
  );
}

function FakeToggle({ on = false }: { on?: boolean }) {
  const [enabled, setEnabled] = useState(on);
  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      aria-checked={enabled}
      role="switch"
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-blue-500" : "bg-stone-200 dark:bg-stone-700"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  about: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">About me</h2>
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100 dark:border-stone-700/40">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">R</div>
        <div>
          <p className="text-sm font-medium text-stone-700 dark:text-stone-200">Profile photo</p>
          <p className="text-xs text-stone-400 mt-0.5">Upload a photo to personalize your account</p>
          <button className="mt-2 text-xs text-blue-500 hover:text-blue-600 font-medium">Upload photo</button>
        </div>
      </div>
      <SettingsRow label="Full name" description="Your display name across the workspace">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-200 w-48 outline-none focus:border-blue-400" defaultValue="Rana V" />
      </SettingsRow>
      <SettingsRow label="Email address" description="Used for login and notifications">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-400 w-48 outline-none" defaultValue="rana@intempt.com" disabled />
      </SettingsRow>
      <SettingsRow label="Display name" description="Short name shown in conversations">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-200 w-48 outline-none focus:border-blue-400" defaultValue="rana" />
      </SettingsRow>
    </div>
  ),
  availability: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">My availability</h2>
      <SettingsRow label="Status" description="Your current presence status">
        <FakeSelect value="Active" />
      </SettingsRow>
      <SettingsRow label="Timezone" description="Used for scheduling and reminders">
        <FakeSelect value="Europe / Kyiv" />
      </SettingsRow>
      <SettingsRow label="Working hours" description="Let teammates know when you're available">
        <FakeSelect value="9am – 6pm" />
      </SettingsRow>
      <SettingsRow label="Out of office" description="Automatically set when you're away">
        <FakeToggle />
      </SettingsRow>
    </div>
  ),
  connections: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">Connections</h2>
      {[
        { name: "GitHub", desc: "Link pull requests and commits to issues", connected: true },
        { name: "Slack", desc: "Get notifications and create issues from Slack", connected: false },
        { name: "Google", desc: "Sign in with Google and sync calendar", connected: true },
        { name: "Figma", desc: "Embed Figma designs in your issues", connected: false },
      ].map((app) => (
        <SettingsRow key={app.name} label={app.name} description={app.desc}>
          <button className={`inline-flex h-9 items-center rounded-md px-3 text-xs font-medium transition-colors ${app.connected ? "border border-stone-200 dark:border-stone-600 text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
            {app.connected ? "Disconnect" : "Connect"}
          </button>
        </SettingsRow>
      ))}
    </div>
  ),
  inbox: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">Inbox</h2>
      <SettingsRow label="Email notifications" description="Receive a digest of your inbox activity">
        <FakeSelect value="Daily digest" />
      </SettingsRow>
      <SettingsRow label="Mentions" description="Notify me when someone mentions me">
        <FakeToggle on />
      </SettingsRow>
      <SettingsRow label="Assignments" description="Notify me when an issue is assigned to me">
        <FakeToggle on />
      </SettingsRow>
      <SettingsRow label="Comments" description="Notify me when someone comments on my issues">
        <FakeToggle />
      </SettingsRow>
    </div>
  ),
  domains: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-2">Domains</h2>
      <p className="text-xs text-stone-400 dark:text-stone-500 mb-6">Verified domains allow members to join your organization automatically.</p>
      <div className="rounded-xl border border-stone-100 dark:border-stone-700/50 overflow-hidden mb-4">
        {["intempt.com", "intempt.io"].map((domain, i) => (
          <div key={domain} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-stone-100 dark:border-stone-700/40" : ""}`}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-sm text-stone-700 dark:text-stone-300">{domain}</span>
            </div>
            <span className="text-xs text-emerald-500 font-medium">Verified</span>
          </div>
        ))}
      </div>
      <button className="inline-flex h-9 items-center rounded-md px-4 bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">Add domain</button>
    </div>
  ),
  basic: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">Basic info</h2>
      <SettingsRow label="Project name" description="The display name for this project">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-200 w-48 outline-none focus:border-blue-400" defaultValue="Linea" />
      </SettingsRow>
      <SettingsRow label="Description" description="Short description shown in project lists">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-400 w-48 outline-none focus:border-blue-400" placeholder="Add a description…" />
      </SettingsRow>
      <SettingsRow label="Identifier" description="Used in issue IDs (e.g. LIN-123)">
        <input className="px-3 h-9 rounded-md border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-200 w-24 outline-none focus:border-blue-400" defaultValue="LIN" />
      </SettingsRow>
    </div>
  ),
  people: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">People</h2>
      {[
        { name: "Rana V", email: "rana@intempt.com", role: "Admin", color: "#0080FF" },
        { name: "Beso", email: "beso@intempt.com", role: "Member", color: "#0080FF" },
        { name: "Roman", email: "roman@intempt.com", role: "Member", color: "#10b981" },
        { name: "Markiian", email: "markiian@intempt.com", role: "Member", color: "#8b5cf6" },
      ].map((p) => (
        <div key={p.email} className="flex items-center gap-3 py-2.5 border-b border-stone-100 dark:border-stone-700/40 last:border-0">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: p.color }}>
            {p.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-200">{p.name}</p>
            <p className="text-xs text-stone-400">{p.email}</p>
          </div>
          <FakeSelect value={p.role} />
        </div>
      ))}
      <button className="mt-4 inline-flex h-9 items-center rounded-md px-4 bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">Invite member</button>
    </div>
  ),
  messages: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">Messages</h2>
      <SettingsRow label="Allow direct messages" description="Team members can send direct messages within the project">
        <FakeToggle on />
      </SettingsRow>
      <SettingsRow label="Message retention" description="How long messages are kept in the project">
        <FakeSelect value="Forever" />
      </SettingsRow>
      <SettingsRow label="Read receipts" description="Show when messages have been read">
        <FakeToggle />
      </SettingsRow>
    </div>
  ),
  meetings: (
    <div>
      <h2 className="text-base font-semibold text-stone-800 dark:text-stone-100 mb-6">Meetings</h2>
      <SettingsRow label="Default meeting duration" description="Default length when creating a new meeting">
        <FakeSelect value="30 minutes" />
      </SettingsRow>
      <SettingsRow label="Video provider" description="Default video conferencing tool">
        <FakeSelect value="Google Meet" />
      </SettingsRow>
      <SettingsRow label="Send reminders" description="Automatically notify attendees before meetings">
        <FakeToggle on />
      </SettingsRow>
      <SettingsRow label="Reminder timing" description="How far in advance to send a reminder">
        <FakeSelect value="15 min before" />
      </SettingsRow>
    </div>
  ),
};

export default function SettingsLayout({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState("about");

  return (
    <div className="flex h-full w-full animate-fade-up">
      {/* Settings sidebar */}
      <div
        className="flex flex-col h-full shrink-0 select-none"
        style={{
          width: 196,
          minWidth: 196,
          background: "var(--main-bg)",
        }}
      >
        {/* Back to app */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-4 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
        >
          <ChevronLeft size={14} />
          <span>Back to app</span>
        </button>

        {/* Settings nav */}
        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-4">
          {settingsNav.map((section) => (
            <div key={section.heading}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-600">
                {section.heading}
              </p>
              <div className="space-y-px">
                {section.items.map((item) => {
                  const isActive = selected === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setSelected(item.key)}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-left text-sm font-[450] transition-colors duration-100 group
                        ${isActive
                          ? "bg-white dark:bg-white/8 text-stone-800 dark:text-stone-100 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                          : "text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-white/6 hover:text-stone-800 dark:hover:text-stone-100"
                        }`}
                    >
                      <span className={isActive ? "text-blue-600" : "text-stone-400 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400"}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Settings content */}
      <div className="flex-1 flex flex-col min-w-0 p-3 pl-0">
        <div
          className="flex-1 flex flex-col rounded-xl overflow-hidden"
          style={{
            background: "var(--content-bg)",
            border: "1px solid var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)",
          }}
        >
          <div key={selected} className="flex-1 overflow-y-auto px-12 py-8 max-w-2xl w-full mx-auto animate-fade-up">
            {contentMap[selected] ?? null}
          </div>
        </div>
      </div>
    </div>
  );
}
