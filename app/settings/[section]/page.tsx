"use client";

import { use } from "react";
import { contentMap } from "../../components/SettingsLayout";

export default function SettingsSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = use(params);
  const content = contentMap[section] ?? contentMap["about"];

  return (
    <div key={section} className="px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-8 max-w-2xl w-full mx-auto animate-fade-up">
      {content}
    </div>
  );
}
