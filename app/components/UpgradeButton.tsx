"use client";

import { useState } from "react";
import { Gem } from "lucide-react";

const STARS = [
  { left: "10%", color: "#93c5fd", variant: "a", delay: "0ms",  size: 4 },
  { left: "26%", color: "#ffffff", variant: "b", delay: "50ms", size: 5 },
  { left: "43%", color: "#bfdbfe", variant: "c", delay: "20ms", size: 4 },
  { left: "58%", color: "#ffffff", variant: "a", delay: "75ms", size: 5 },
  { left: "73%", color: "#93c5fd", variant: "b", delay: "35ms", size: 4 },
  { left: "88%", color: "#dbeafe", variant: "c", delay: "10ms", size: 5 },
] as const;

export default function UpgradeButton() {
  const [burstKey, setBurstKey] = useState(0);

  function burst() {
    setBurstKey((k) => k + 1);
  }

  return (
    <div className="relative" onMouseEnter={burst}>
      {burstKey > 0 && STARS.map((s, i) => (
        <span
          key={`${burstKey}-${i}`}
          className={`upgrade-star upgrade-star-${s.variant}`}
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDuration: "0.5s",
            animationDelay: s.delay,
          }}
        />
      ))}

      <button
        onClick={burst}
        className="relative flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-medium text-white select-none active:scale-95 transition-all duration-100 hover:opacity-90"
        style={{ background: "#0080FF" }}
      >
        <Gem size={12} className="shrink-0" />
        Upgrade
      </button>
    </div>
  );
}
