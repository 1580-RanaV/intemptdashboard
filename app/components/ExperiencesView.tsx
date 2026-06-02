"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateExperienceDrawer from "./CreateExperienceDrawer";
import DateRangePicker from "./DateRangePicker";
import MetricCard from "./MetricCard";

const CHART_DATA = [
  { date:"May 3",  value:0 },       { date:"May 4",  value:12000 },
  { date:"May 5",  value:175000 },  { date:"May 6",  value:230000 },
  { date:"May 7",  value:260000 },  { date:"May 8",  value:290000 },
  { date:"May 9",  value:310000 },  { date:"May 10", value:340000 },
  { date:"May 11", value:370000 },  { date:"May 12", value:400000 },
  { date:"May 13", value:430000 },  { date:"May 14", value:460000 },
  { date:"May 15", value:490000 },  { date:"May 16", value:510000 },
  { date:"May 17", value:530000 },  { date:"May 18", value:560000 },
  { date:"May 19", value:900000 },  { date:"May 20", value:1300000 },
  { date:"May 21", value:3600000 }, { date:"May 22", value:4700000 },
  { date:"May 23", value:5400000 }, { date:"May 24", value:6100000 },
  { date:"May 25", value:6200000 }, { date:"May 26", value:14900000 },
  { date:"May 27", value:15047484 },{ date:"May 28", value:15047484 },
  { date:"May 29", value:15047484 },{ date:"May 30", value:15047484 },
  { date:"Jun 1",  value:15047484 },{ date:"Jun 2",  value:15047484 },
];
const CHART_DATA_HALF = CHART_DATA.map(d => ({ ...d, value: Math.round(d.value * 0.5) }));

export default function ExperiencesView() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
      {/* Topbar */}
      <div className="flex items-center shrink-0 pr-3">
        <div className="flex-1"><DateRangePicker /></div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium text-white transition-opacity hover:opacity-90 shrink-0"
          style={{ background: "#0080FF" }}
        >
          <Plus size={13} />
          Create experience
        </button>
      </div>

      {/* Metric cards */}
      <div className="flex gap-4 px-4 pb-4 animate-fade-up">
        <MetricCard
          value="$15,047,484.74"
          label="Total revenue"
          change="-- vs. previous period"
          data={CHART_DATA}
        />
        <MetricCard
          value="$7,523,742.37"
          label="Intempt attributed revenue"
          labelSub="(50.00% of total)"
          change="-- vs. previous period"
          data={CHART_DATA_HALF}
        />
      </div>

      {drawerOpen && <CreateExperienceDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
