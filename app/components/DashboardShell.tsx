"use client";

import { useState } from "react";
import BluChat from "./BluChat";
import NotificationsMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [bluOpen, setBluOpen] = useState(false);

  return (
    <div className="flex h-full animate-fade-up" style={{ background: "var(--main-bg)" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-end gap-3 px-5 py-3">
          <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-stone-200/70 dark:hover:bg-white/8 cursor-pointer transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500 dark:text-stone-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <button
            onClick={() => setBluOpen((o) => !o)}
            title="Ask Blu anything"
            className="w-7 h-7 rounded-full shrink-0 hover:opacity-85 transition-opacity cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0080FF 0%, #00AAFF 100%)",
              boxShadow: bluOpen ? "0 0 0 2px #0080FF40" : "0 0 8px rgba(0,128,255,0.3)",
            }}
          />
          <NotificationsMenu />
          <ThemeToggle />
          <ProfileMenu />
        </div>

        <div className="flex-1 flex min-h-0 gap-2 mr-3 mb-2">
          <div
            className="flex-1 flex flex-col rounded-xl overflow-hidden min-w-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              background: "var(--content-bg)",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)",
            }}
          >
            {children}
          </div>

          <div
            className="shrink-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: bluOpen ? 380 : 0, opacity: bluOpen ? 1 : 0 }}
          >
            {bluOpen && <BluChat onClose={() => setBluOpen(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
