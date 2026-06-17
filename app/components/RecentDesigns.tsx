"use client";

import { useRouter } from "next/navigation";
import { Mail, MessageSquare, Image, ArrowRight } from "lucide-react";

type AssetType = "email" | "sms" | "image";

const TYPE_META: Record<AssetType, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  email: {
    label: "Email",
    icon: <Mail size={12} />,
    bg: "bg-blue-50 dark:bg-blue-500/10",
    color: "text-blue-600 dark:text-blue-400",
  },
  sms: {
    label: "SMS",
    icon: <MessageSquare size={12} />,
    bg: "bg-violet-50 dark:bg-violet-500/10",
    color: "text-violet-600 dark:text-violet-400",
  },
  image: {
    label: "Image",
    icon: <Image size={12} />,
    bg: "bg-amber-50 dark:bg-amber-500/10",
    color: "text-amber-600 dark:text-amber-400",
  },
};

const RECENT: { id: string; name: string; ago: string; type: AssetType; thumb: string }[] = [
  { id: "a1", name: "Claude design - Email 1",                                                    ago: "2 days ago",   type: "email",  thumb: "#dbeafe" },
  { id: "a2", name: "Built a flash sale SMS using Liquid product variables with a 7-day window",  ago: "3 days ago",   type: "sms",    thumb: "#ede9fe" },
  { id: "a3", name: "Removed the JSON wrapper entirely — outputting only the raw HTML",           ago: "1 week ago",   type: "email",  thumb: "#dbeafe" },
  { id: "a4", name: "Generate an image of the brand character holding a can of Co",               ago: "1 month ago",  type: "image",  thumb: "#fef3c7" },
  { id: "a5", name: "Generate an image of the brand character holding a water tumbler",           ago: "1 month ago",  type: "image",  thumb: "#fef3c7" },
];

export default function RecentDesigns() {
  const router = useRouter();

  return (
    <div className="mt-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">Recent designs</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Pick up where you left off</p>
        </div>
        <button
          onClick={() => router.push("/asset-library")}
          className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors"
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {RECENT.map((item, i) => {
          const meta = TYPE_META[item.type];
          return (
            <button
              key={item.id}
              onClick={() => router.push("/asset-library")}
              className={`flex items-center gap-3 py-3 text-left hover:bg-stone-50 dark:hover:bg-white/4 transition-colors -mx-2 px-2 rounded-lg ${
                i < RECENT.length - 1 ? "border-b border-stone-100 dark:border-stone-700/40" : ""
              }`}
            >
              {/* Thumb */}
              <span
                className="w-9 h-9 rounded-lg shrink-0"
                style={{ background: item.thumb }}
              />

              {/* Name + ago */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700 dark:text-stone-200 truncate">{item.name}</p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{item.ago}</p>
              </div>

              {/* Type badge */}
              <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${meta.bg} ${meta.color}`}>
                {meta.icon}
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
