import DashboardCanvasView from "../../../components/DashboardCanvasView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DashboardCanvasView id={id} />;
}
