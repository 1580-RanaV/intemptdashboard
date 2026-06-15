import { Suspense } from "react";
import JourneyDetailView from "../../../components/JourneyDetailView";

export function generateStaticParams() {
  return [
    { id: "browse-abandonment" },
    { id: "product-based-sends" },
    { id: "negative-review-response" },
    { id: "cart-abandonment" },
  ];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense>
      <JourneyDetailView id={id} />
    </Suspense>
  );
}
