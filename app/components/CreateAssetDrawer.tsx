"use client";

import { useState } from "react";
import {
  AlignLeft, Bell, Braces, FileText, Image, Mail,
  MessageCircle, MessageSquare, Upload, Code,
} from "lucide-react";
import SlidingSidebar from "./SlidingSidebar";

const ASSET_TYPES = [
  { key: "image",       label: "New image",    icon: Image },
  { key: "email-html",  label: "Email HTML",   icon: Code },
  { key: "email-plain", label: "Email plain",  icon: Mail },
  { key: "page",        label: "Page",         icon: FileText },
  { key: "sms",         label: "SMS",          icon: MessageSquare },
  { key: "push",        label: "Push",         icon: Bell },
  { key: "slack",       label: "Slack",        icon: MessageCircle },
  { key: "text",        label: "Text",         icon: AlignLeft },
  { key: "code",        label: "Code",         icon: Braces },
  { key: "upload",      label: "Upload file",  icon: Upload },
];

export default function CreateAssetDrawer({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("image");

  return (
    <SlidingSidebar
      title="Create asset"
      description="Choose the type of asset you want to create."
      onClose={onClose}
      footer={(close) => (
        <>
          <button
            onClick={close}
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-stone-600 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-white/8"
          >
            Cancel
          </button>
          <button
            className="rounded-lg px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#0080FF" }}
          >
            Create asset
          </button>
        </>
      )}
    >
      <div className="space-y-1.5">
        {ASSET_TYPES.map(({ key, label, icon: Icon }) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left transition-all duration-100"
              style={{
                border: isSelected ? "1.5px solid #0080FF" : "1.5px solid var(--border)",
                background: isSelected ? "rgba(0,128,255,0.04)" : "var(--content-bg)",
              }}
            >
              <span className={isSelected ? "text-blue-500" : "text-stone-400 dark:text-stone-500"}>
                <Icon size={17} />
              </span>
              <span
                className={`text-[13.5px] font-medium ${
                  isSelected
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-stone-700 dark:text-stone-300"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </SlidingSidebar>
  );
}
