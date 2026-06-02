"use client";

import { useState } from "react";
import { Fingerprint, BookOpen } from "lucide-react";

const tabs = [
  {
    key: "identity",
    label: "Identity",
    icon: <Fingerprint size={15} />,
    emptyIcon: <Fingerprint size={20} className="text-stone-300 dark:text-stone-600" />,
    emptyTitle: "No identity assets yet",
    emptyDesc: "Add your logo, colours, and typography to define your brand identity.",
  },
  {
    key: "knowledge",
    label: "Knowledge Base",
    icon: <BookOpen size={15} />,
    emptyIcon: <BookOpen size={20} className="text-stone-300 dark:text-stone-600" />,
    emptyTitle: "Knowledge base is empty",
    emptyDesc: "Upload brand guidelines, messaging frameworks, and tone-of-voice documents.",
  },
];

export default function BrandView() {
  const [tab, setTab] = useState("identity");

  const active = tabs.find((t) => t.key === tab)!;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Tab bar */}
      <div
        className="flex items-center gap-0.5 px-4 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium border-b-2 -mb-px transition-colors duration-100
              ${tab === t.key
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div key={tab} className="flex-1 flex items-center justify-center animate-fade-up">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800/60 flex items-center justify-center mx-auto">
            {active.emptyIcon}
          </div>
          <p className="text-[13px] font-medium text-stone-600 dark:text-stone-300">{active.emptyTitle}</p>
          <p className="text-[12px] text-stone-400 dark:text-stone-500">{active.emptyDesc}</p>
        </div>
      </div>
    </div>
  );
}
