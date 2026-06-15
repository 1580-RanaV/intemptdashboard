import { Suspense } from "react";
import ExperienceDetailView from "../../../components/ExperienceDetailView";

export function generateStaticParams() {
  return [
    { id: "spring-homepage-test" },
    { id: "returning-visitor-personalization" },
    { id: "pricing-page-cta" },
    { id: "new-user-banner" },
  ];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense>
      <ExperienceDetailView id={id} />
    </Suspense>
  );
}
