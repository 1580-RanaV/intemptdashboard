"use client";

import { useEffect, useRef, useState } from "react";
import { X, Plus, ArrowUp, AtSign, Paperclip, Terminal, ChevronRight, History } from "lucide-react";

const SAMPLE: { role: "user" | "blu"; text: string }[] = [
  {
    role: "user",
    text: "2. Abandoned Cart Email\nGenerate an abandoned cart email for the customer's cart contents. Open with a minimal logo header — no hero. Show each cart item as a row with image, name, variant, and price. One full-width CTA linking directly to the cart. One supporting nudge below the cart — free shipping, return policy, or active offer if one exists. Keep the tone direct and low-pressure.",
  },
  {
    role: "blu",
    text: "Generated the FieldsUSA abandoned cart recovery email — minimal dark header, Anton headline, three cart rows with Liquid feed tags, single red CTA, nudge line, and compact dark footer with unsubscribe.",
  },
];

const PLUS_ITEMS = [
  {
    icon: <AtSign size={15} className="text-stone-500 dark:text-stone-400" />,
    label: "References",
    desc: "Brand kit, products, feeds",
    arrow: true,
  },
  {
    icon: <Paperclip size={15} className="text-stone-500 dark:text-stone-400" />,
    label: "Attach Files",
    desc: "File from device",
    arrow: false,
  },
  {
    icon: <Terminal size={15} className="text-stone-500 dark:text-stone-400" />,
    label: "Commands",
    desc: "Slash commands",
    arrow: false,
  },
];

export default function BluChat({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [plusOpen, setPlusOpen] = useState(false);
  const plusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (plusRef.current && !plusRef.current.contains(e.target as Node)) {
        setPlusOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden"
      style={{
        background: "var(--content-bg)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.75 shrink-0"
      >
        <div
          className="w-7 h-7 rounded-full shrink-0"
          style={{ background: "linear-gradient(135deg, #c7dcfa 0%, #dde8fc 100%)" }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-stone-800 dark:text-stone-100 leading-none">Blu</p>
        </div>
        <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/8 transition-colors text-stone-400">
          <History size={13} />
        </button>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-stone-100 dark:hover:bg-white/8 transition-colors text-stone-400"
        >
          <X size={13} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 chat-scroll">
        {SAMPLE.map((msg, i) => (
          <div key={i} className="flex gap-2.5 items-start animate-fade-up">
            {/* Avatar */}
            {msg.role === "user" ? (
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-semibold shrink-0 mt-0.5">
                R
              </div>
            ) : (
              <div
                className="w-6 h-6 rounded-full shrink-0 mt-0.5"
                style={{ background: "linear-gradient(135deg, #c7dcfa 0%, #dde8fc 100%)" }}
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[12px] font-semibold text-stone-700 dark:text-stone-200">
                  {msg.role === "user" ? "Rana" : "Blu"}
                </span>
                <span className="text-[10.5px] text-stone-400 dark:text-stone-500">Just now</span>
              </div>
              <p className="text-[12.5px] text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3 shrink-0">
        <div
          className="rounded-xl px-4 pt-3 pb-2.5"
          style={{ border: "1px solid var(--border)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the content you want to create..."
            className="w-full bg-transparent text-[12.5px] text-stone-700 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 outline-none"
          />
          <div className="flex items-center justify-between mt-3">
            {/* + with dropup */}
            <div ref={plusRef} className="relative">
              <button
                onClick={() => setPlusOpen((o) => !o)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
              >
                <Plus size={15} />
              </button>

              {plusOpen && (
                <div
                  className="absolute bottom-[calc(100%+8px)] left-0 w-56 rounded-xl overflow-hidden animate-card-in"
                  style={{
                    background: "var(--content-bg)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  {PLUS_ITEMS.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => setPlusOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-white/5 transition-colors
                        ${i > 0 ? "border-t" : ""}`}
                      style={i > 0 ? { borderColor: "var(--border)" } : undefined}
                    >
                      <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-white/6 flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-stone-700 dark:text-stone-200 leading-none mb-0.5">{item.label}</p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 leading-none">{item.desc}</p>
                      </div>
                      {item.arrow && <ChevronRight size={12} className="text-stone-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150"
              style={{ background: input ? "#0080FF" : "var(--border)" }}
            >
              <ArrowUp size={13} className={input ? "text-white" : "text-stone-400 dark:text-stone-500"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
