import { notFound } from "next/navigation";
import ProductDetailView from "../../../../components/ProductDetailView";

export function generateStaticParams() {
  return [{ id: "42338" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id !== "42338") notFound();

  return <ProductDetailView />;
}
