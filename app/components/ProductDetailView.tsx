"use client";

import { useState } from "react";
import { ChevronLeft, ExternalLink, Maximize2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const specs = [
  ["Link", "https://fieldsusa.com/product/pavashot-c5-5-capsaicin-round"],
  ["Caliber", "44mg"],
  ["Weight", "7lbs"],
  ["Availability", "in_stock"],
  ["Category Path", "Ammunition > Less Lethal Ammunition > OC / Pepper"],
  ["Categories", "Ammunition, Less Lethal Ammunition, OC / Pepper"],
  ["SKU", "PAVASHOT-C5-ROUND-PROJECTILE"],
  ["Category", "Ammunition"],
  ["Brand", "PavaShot"],
];

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold ${accent ? "text-blue-600 dark:text-blue-400" : "text-stone-900 dark:text-stone-100"}`}>
        {value || "-"}
      </p>
    </div>
  );
}

export default function ProductDetailView() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 pt-4 animate-fade-up">
      <div className="mb-4 flex items-center gap-2 text-[13px]">
        <Link href="/catalog" className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-stone-900 dark:text-slate-400 dark:hover:text-stone-100">
          <ChevronLeft size={15} />
          Catalog
        </Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="truncate font-medium text-stone-900 dark:text-stone-100">PavaShot C5 OC Rounds 5% Capsaicin .68 Cal Projectiles</span>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(360px,40%)_1fr]">
        <aside>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
            <Image
              src="/pava.png"
              alt="PavaShot C5 OC Rounds 5% Capsaicin .68 Cal Projectiles"
              fill
              priority
              sizes="(min-width: 1280px) 40vw, 100vw"
              className="object-contain p-6"
            />
            <button
              type="button"
              aria-label="Expand product image"
              onClick={() => setIsImageOpen(true)}
              className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-stone-700 dark:bg-stone-950/80 dark:text-stone-100 dark:hover:bg-stone-900"
            >
              <Maximize2 size={18} />
            </button>
          </div>

        </aside>

        <main className="min-w-0 space-y-8">
          <div>
            <h1 className="max-w-4xl text-[26px] font-bold leading-tight tracking-tight text-stone-950 dark:text-stone-50">
              PavaShot C5 OC Rounds 5% Capsaicin .68 Cal Projectiles
            </h1>
            <div className="mt-7 grid gap-x-10 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
              <Stat label="Item ID" value="42338" />
              <Stat label="Price" value="$54.95" />
              <Stat label="Added on" value="May 06, 2026 14:23 PM" />
              <Stat label="Last updated" value="Jun 02, 2026 23:01 PM" />
            </div>
          </div>

          <section>
            <h2 className="mb-3 text-[14px] font-semibold text-stone-900 dark:text-stone-100">Product Specifications</h2>
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
              {specs.map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
                  {label === "Link" ? (
                    <a href={value} className="mt-1 flex min-w-0 items-center gap-1.5 text-[13px] font-normal text-blue-600 dark:text-blue-400">
                      <span className="truncate">{value}</span>
                      <ExternalLink size={12} className="shrink-0" />
                    </a>
                  ) : label === "Availability" ? (
                    <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[12px] font-medium text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300">
                      In stock
                    </span>
                  ) : (
                    <p className="mt-1 truncate text-[13px] font-normal text-stone-900 dark:text-stone-100">{value || "-"}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[14px] font-semibold text-stone-900 dark:text-stone-100">Description</h2>
            <p className="text-[13.5px] leading-7 text-stone-800 dark:text-stone-200">
              PavaShot C5 OC Rounds are .68 caliber projectiles formulated with a 5% capsaicin payload for consistent less-lethal deployment. Designed for compatible PavaShot launcher systems, these rounds deliver a controlled irritant effect through reliable dispersal upon impact. Engineered for dependable feeding and performance, the C5 formulation provides a higher-strength OC option suitable for training and operational environments where increased effectiveness is required. Law Enforcement Agency purchase only. Verification may be required prior to order fulfillment.
            </p>
          </section>
        </main>
      </div>

      {isImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close product image"
            onClick={() => setIsImageOpen(false)}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <div className="relative h-full max-h-[86vh] w-full max-w-6xl">
            <Image
              src="/pava.png"
              alt="PavaShot C5 OC Rounds 5% Capsaicin .68 Cal Projectiles"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
