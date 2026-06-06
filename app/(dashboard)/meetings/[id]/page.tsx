import { notFound } from "next/navigation";
import MeetingDetailView from "../../../components/MeetingDetailView";

export function generateStaticParams() {
  return [{ id: "rd-check-in" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id !== "rd-check-in") notFound();

  return <MeetingDetailView />;
}
