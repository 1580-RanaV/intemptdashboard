"use client";

import { useRouter } from "next/navigation";
import SettingsLayout from "../components/SettingsLayout";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="flex h-full" style={{ background: "var(--main-bg)" }}>
      <SettingsLayout onBack={() => router.push("/")} />
    </div>
  );
}
