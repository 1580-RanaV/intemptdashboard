import { notFound } from "next/navigation";
import BoardDetailView from "../../../components/boards/BoardDetailView";
import { BOARDS_DATA } from "../../../components/boards/boardsData";

export function generateStaticParams() {
  return BOARDS_DATA.map((b) => ({ id: b.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!BOARDS_DATA.find((b) => b.id === id)) notFound();

  return <BoardDetailView id={id} />;
}
