"use client";

import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";

export type GridCard = {
  id: string;
  name: string;
  gradient: [string, string];
  image?: string;
};

export default function GridCardView({
  items,
  searchPlaceholder,
  newLabel,
}: {
  createLabel?: string;
  createSubLabel?: string;
  items: GridCard[];
  searchPlaceholder: string;
  newLabel: string;
}) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-y-auto animate-fade-up">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 pt-4 pb-4 shrink-0 flex-wrap">
        <div className="relative w-50">
          <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 w-full rounded-lg border border-stone-200 bg-white pl-8 pr-3 text-xs font-medium text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-blue-400 dark:border-stone-700 dark:bg-white/3 dark:text-stone-100 dark:placeholder:text-stone-500"
          />
        </div>

        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-white/3 dark:text-stone-300 dark:hover:bg-white/6">
          <Filter size={13} />
          Filter
        </button>

        <button
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "#0080FF" }}
        >
          <Plus size={14} />
          {newLabel}
        </button>
      </div>

      {/* Card grid */}
      <div className="px-6 pb-6">
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
          {filtered.map(({ id, name, gradient, image }) => (
            <button
              key={id}
              className="group relative aspect-3/4 overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(145deg, ${gradient[0]}, ${gradient[1]})` }}
            >
              {image && (
                <img
                  src={image}
                  alt={name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* Bottom name */}
              <div
                className="absolute inset-x-0 bottom-0 px-3.5 pb-4 pt-16"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}
              >
                <p className="w-full text-left text-base font-bold leading-tight text-white">{name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
