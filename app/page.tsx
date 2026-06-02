"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import ProfileMenu from "./components/ProfileMenu";
import NotificationsMenu from "./components/NotificationsMenu";
import SettingsLayout from "./components/SettingsLayout";
import BrandView from "./components/BrandView";
import BluChat from "./components/BluChat";

const breadcrumbs: Record<string, string> = {
  home: "Home",
  settings: "Settings",
  brand: "Brand",
};

export default function Page() {
  const [view, setView] = useState("home");
  const [bluOpen, setBluOpen] = useState(false);

  if (view === "settings") {
    return (
      <div className="flex h-full" style={{ background: "var(--main-bg)" }}>
        <SettingsLayout onBack={() => setView("home")} />
      </div>
    );
  }

  return (
    <div className="flex h-full animate-fade-up" style={{ background: "var(--main-bg)" }}>
      <Sidebar onNavigate={setView} />

      {/* Right pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Outer header */}
        <div className="flex items-center justify-end gap-3 px-5 py-3">
          <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-stone-200/70 dark:hover:bg-white/8 cursor-pointer transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-500 dark:text-stone-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          {/* Blu circle */}
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
          <ProfileMenu onNavigate={setView} />
        </div>

        {/* Content row — main card + Blu chat side by side */}
        <div className="flex-1 flex min-h-0 gap-2 mr-3 mb-2">
          {/* Main card */}
          <div
            className="flex-1 flex flex-col rounded-xl overflow-hidden min-w-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              background: "var(--content-bg)",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)",
            }}
          >
            {view !== "brand" && (
              <div
                className="flex items-center px-5 py-3 shrink-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-[12px] text-stone-400 dark:text-stone-500">
                  {breadcrumbs[view] ?? "Home"}
                </span>
              </div>
            )}

            {view === "brand" ? (
              <BrandView />
            ) : (
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
            )}
          </div>

          {/* Blu chat panel — slides in from the right */}
          <div
            className="shrink-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: bluOpen ? 320 : 0, opacity: bluOpen ? 1 : 0 }}
          >
            {bluOpen && <BluChat onClose={() => setBluOpen(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
