"use client";

import { useState } from "react";
import { Filter, Plus, Search } from "lucide-react";

type Palette = {
  id: string;
  name: string;
  colors: [string, string, string, string];
};

const PALETTES: Palette[] = [
  { id: "alexandria",  name: "Alexandria",  colors: ["#7B6FA8", "#C9A8D4", "#2D2050", "#F0ECF8"] },
  { id: "ocean-drift", name: "Ocean Drift", colors: ["#1E6FA8", "#5BA8D4", "#0A2840", "#D4ECF8"] },
  { id: "sage-garden", name: "Sage Garden", colors: ["#5A8A6A", "#A8D4B0", "#1C3828", "#E4F4E8"] },
  { id: "ember",       name: "Ember",       colors: ["#C85A3A", "#E8A888", "#5C1A08", "#FCE8D8"] },
  { id: "midnight",    name: "Midnight",    colors: ["#2A3A5C", "#8898C0", "#0A1230", "#D8DCF0"] },
  { id: "blossom",     name: "Blossom",     colors: ["#D868A0", "#F0B8D4", "#5C1840", "#FCE8F4"] },
  { id: "stone-age",   name: "Stone Age",   colors: ["#A89070", "#D4C0A8", "#3C2C1C", "#F4EDE4"] },
  { id: "citrus",      name: "Citrus",      colors: ["#D4A820", "#E8D870", "#5C4000", "#FDF8D8"] },
];

function PaletteCard({ palette }: { palette: Palette }) {
  const { name, colors } = palette;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-lg"
      style={{ background: "var(--content-bg)", border: "1px solid var(--border)" }}
    >
      {/* Full-bleed color band */}
      <div className="flex h-28">
        {colors.map((color, i) => (
          <div key={i} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      {/* Name row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div
          className="h-7 w-7 shrink-0 rounded-full ring-2 ring-white dark:ring-stone-800"
          style={{
            background: `conic-gradient(${colors[0]} 0deg 180deg, ${colors[1]} 180deg 360deg)`,
          }}
        />
        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function DesignSystemView() {
  const [search, setSearch] = useState("");

  const filtered = search
    ? PALETTES.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : PALETTES;

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-y-auto animate-fade-up">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 pt-4 pb-4 shrink-0 flex-wrap">
        <div className="relative w-50">
          <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search palettes..."
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
          Create design system
        </button>
      </div>

      {/* Grid */}
      <div className="px-6 pb-6">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {filtered.map((palette) => (
            <PaletteCard key={palette.id} palette={palette} />
          ))}
        </div>
      </div>
    </div>
  );
}
