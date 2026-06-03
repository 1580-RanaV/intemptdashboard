import { notFound } from "next/navigation";
import DashboardView from "../../components/DashboardView";
import { DASHBOARD_VIEW_KEYS } from "../../lib/dashboardRoutes";

export function generateStaticParams() {
  return DASHBOARD_VIEW_KEYS.map((view) => ({ view }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  if (!DASHBOARD_VIEW_KEYS.includes(view as typeof DASHBOARD_VIEW_KEYS[number])) {
    notFound();
  }

  return <DashboardView view={view} />;
}
