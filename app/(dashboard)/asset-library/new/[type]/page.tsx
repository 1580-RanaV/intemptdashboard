import AssetCreatorView from "../../../../components/AssetCreatorView";

const ASSET_TYPES = [
  "image", "email-html", "email-plain", "page",
  "sms", "push", "slack", "text", "code", "upload",
];

export function generateStaticParams() {
  return ASSET_TYPES.map((type) => ({ type }));
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <AssetCreatorView type={type} />;
}
