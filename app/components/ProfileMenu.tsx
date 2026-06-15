"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
      >
        R
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-64 z-50 overflow-hidden animate-card-in"
          style={{
            background: "var(--content-bg)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
          }}
        >
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-stone-500 dark:text-stone-400 text-sm font-semibold shrink-0">
              R
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-800 dark:text-stone-100 leading-none mb-1">rana</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 truncate leading-none">rana@intempt.com</p>
            </div>
          </div>

          <div className="mx-4 border-t border-stone-100 dark:border-stone-700/50" />

          {/* Menu items */}
          <div className="px-2 py-2">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-stone-100 dark:hover:bg-white/6 transition-colors text-left"
            >
              <User size={15} className="text-stone-400 dark:text-stone-500 shrink-0" />
              <span className="text-sm text-stone-700 dark:text-stone-300">Profile Settings</span>
            </Link>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors text-left">
              <LogOut size={15} className="text-red-500 shrink-0" />
              <span className="text-sm font-medium text-red-500">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
