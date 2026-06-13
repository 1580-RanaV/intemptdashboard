"use client";

import GridCardView, { GridCard } from "./GridCardView";

const IMG = "/scene.png";

const SCENES: GridCard[] = [
  { id: "office",   name: "Office",   gradient: ["#c4d0d8", "#8fa4b4"], image: IMG },
  { id: "street",   name: "Street",   gradient: ["#c8c4bc", "#a0988c"], image: IMG },
  { id: "park",     name: "Park",     gradient: ["#b8d0b8", "#80a880"], image: IMG },
  { id: "cafe",     name: "Cafe",     gradient: ["#d4c4b0", "#b09870"], image: IMG },
  { id: "studio",   name: "Studio",   gradient: ["#d0d0d0", "#a8a8a8"], image: IMG },
  { id: "kitchen",  name: "Kitchen",  gradient: ["#d4ccc0", "#b0a888"], image: IMG },
  { id: "beach",    name: "Beach",    gradient: ["#b8d8e0", "#78b0c0"], image: IMG },
  { id: "mountain", name: "Mountain", gradient: ["#b0c4d8", "#708fb8"], image: IMG },
  { id: "city",     name: "City",     gradient: ["#bcc4cc", "#8898a8"], image: IMG },
  { id: "library",  name: "Library",  gradient: ["#c8c0b4", "#a89878"], image: IMG },
];

export default function ScenesView() {
  return (
    <GridCardView
      createLabel="Custom scene"
      createSubLabel="Create your own"
      items={SCENES}
      searchPlaceholder="Search scenes..."
      newLabel="New scene"
    />
  );
}
