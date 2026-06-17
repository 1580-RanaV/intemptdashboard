"use client";

const VIDEO_URL = "https://cdn.intempt.com/brand-kit/creative-studio-hero-user.mp4"; // paste CDN video URL here

export default function HeroVideo() {
  if (!VIDEO_URL) return null;

  return (
    <div className="w-full mt-5 rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid var(--border)" }}>
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="w-full block"
        style={{ display: "block" }}
      />
    </div>
  );
}
