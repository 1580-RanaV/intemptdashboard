"use client";

import { useEffect, useState } from "react";
import { X, Monitor, Globe, FlaskConical, Users } from "lucide-react";

const groups = [
  {
    key: "experiments",
    label: "Experiments",
    icon: <FlaskConical size={14} className="text-stone-500 dark:text-stone-400" />,
    items: [
      {
        key: "client-experiment",
        icon: <Monitor size={20} className="text-blue-500" />,
        iconBg: "bg-blue-50 dark:bg-blue-500/10",
        title: "Client-side Experiment",
        desc: "A/B test visual changes on your website using the visual editor",
        tag: "No variant targeting",
        tagColor: "bg-stone-100 dark:bg-white/8 text-stone-500 dark:text-stone-400",
      },
    ],
  },
  {
    key: "personalizations",
    label: "Personalizations",
    icon: <Users size={14} className="text-stone-500 dark:text-stone-400" />,
    items: [
      {
        key: "client-personalization",
        icon: <Globe size={20} className="text-blue-500" />,
        iconBg: "bg-blue-50 dark:bg-blue-500/10",
        title: "Client-side Personalization",
        desc: "Personalize website content for specific audiences",
        tag: "Per-variant targeting",
        tagColor: "bg-blue-50 dark:bg-blue-500/10 text-blue-500",
      },
    ],
  },
];

export default function CreateExperienceDrawer({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("client-experiment");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.18)",
          opacity: visible ? 1 : 0,
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30 flex flex-col"
        style={{
          width: "min(440px, 52%)",
          background: "var(--content-bg)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.08)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-5 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[18px] font-bold text-stone-900 dark:text-stone-100 mb-1">
                Create experience
              </h2>
              <p className="text-[13px] text-stone-400 dark:text-stone-500">
                Choose an experience type to get started
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/8 transition-colors text-stone-400 mt-0.5"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 pb-4 space-y-6">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-600">
            Experience type
          </p>

          {groups.map((group) => (
            <div key={group.key}>
              {/* Group heading */}
              <div className="flex items-center gap-2 mb-3">
                {group.icon}
                <span className="text-[13px] font-medium text-stone-600 dark:text-stone-400">
                  {group.label}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {group.items.map((item) => {
                  const isSelected = selected === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setSelected(item.key)}
                      className="w-full text-left rounded-xl p-5 transition-all duration-150"
                      style={{
                        border: isSelected
                          ? "1.5px solid #0080FF"
                          : "1.5px solid var(--border)",
                        background: "var(--content-bg)",
                      }}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center mb-3`}
                      >
                        {item.icon}
                      </div>
                      <p className="text-[14px] font-semibold text-stone-800 dark:text-stone-100 mb-1.5">
                        {item.title}
                      </p>
                      <p className="text-[12.5px] text-stone-400 dark:text-stone-500 mb-3 leading-relaxed">
                        {item.desc}
                      </p>
                      <span
                        className={`inline-block text-[11.5px] font-medium px-2.5 py-1 rounded-md ${item.tagColor}`}
                      >
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-7 py-4 shrink-0"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/8 transition-colors"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg text-[13px] font-semibold text-white transition-colors"
            style={{ background: "#0080FF" }}
          >
            Create experience
          </button>
        </div>
      </div>
    </>
  );
}
