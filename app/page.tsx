// Server Component — no "use client" directive
// Hero text renders instantly from the server.
// Dynamic stats are streamed via <Suspense> inside BentoGrid > StatsCard.
import dynamic from "next/dynamic";
import { Inter, Outfit } from "next/font/google";
import type { Metadata } from "next";
import { ViewProvider } from "@/components/landing/ViewToggle";

// Metadata (static, server-side)
export const metadata: Metadata = {
  title: "NeuroGrowth — AI Growth Intelligence Platform",
  description:
    "Connect investors with high-alpha opportunities and empower businesses with AI‑driven marketing automation, growth analytics, and intelligent deal flow.",
  openGraph: {
    title: "NeuroGrowth — AI Growth Intelligence Platform",
    description: "AI-powered platform connecting businesses and investors for accelerated growth.",
    type: "website",
  },
};

// Dynamically import heavy client components (no SSR for Three.js canvas)
const ParticleField = dynamic(
  () => import("@/components/landing/ParticleField"),
  { ssr: false }
);

const ViewToggle = dynamic(
  () => import("@/components/landing/ViewToggle"),
  { ssr: false }
);

const BentoGrid = dynamic(
  () => import("@/components/landing/BentoGrid"),
  { ssr: false }
);

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export default function LandingPage() {
  return (
    <>
      {/* ── Ambient background orbs (static, server-rendered) ── */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <div
          className="ambient-orb"
          style={{
            width: 600,
            height: 600,
            top: "-15%",
            left: "-10%",
            background: "rgba(59,130,246,0.12)",
            animationDelay: "0s",
          }}
        />
        <div
          className="ambient-orb"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            right: "-8%",
            background: "rgba(139,92,246,0.10)",
            animationDelay: "3s",
          }}
        />
        <div
          className="ambient-orb"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "55%",
            background: "rgba(16,185,129,0.07)",
            animationDelay: "6s",
          }}
        />
      </div>

      {/* ── Three.js particle canvas (client island, no SSR) ── */}
      <ParticleField />

      {/* ── Main content ── */}
      <main
        className={`relative z-10 min-h-screen flex flex-col ${outfit.className}`}
        style={{ paddingTop: "80px" }} // below Navbar
      >
        {/* ── Stats bar — server rendered, instant ── */}
        <div className="flex items-center justify-center py-5 px-4">
          <div
            className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Live pulse */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-green-400">Platform is live</span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="text-xs text-white/35 hidden sm:block">
              Real-time data updates every 4 seconds
            </span>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="text-xs font-medium text-white/40">
              Powered by NeuroGrowth Intelligence
            </span>
          </div>
        </div>

        {/* ── View Toggle ── */}
        <ViewProvider>
          <div className="flex flex-col items-center gap-10 pb-16">
            {/* Toggle pill — client interactive */}
            <div className="flex items-center justify-center px-4">
              <ViewToggle />
            </div>

            {/* ── Bento Grid (client, with Suspense inside) ── */}
            <BentoGrid />

            {/* ── Trusted badge row (server-rendered static content) ── */}
            <div className="flex flex-col items-center gap-4 px-4 mt-4">
              <p className="text-xs text-white/25 uppercase tracking-widest font-semibold">
                Built on trusted infrastructure
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 opacity-40">
                {[
                  { label: "Next.js 14", icon: "▲" },
                  { label: "Supabase", icon: "⚡" },
                  { label: "OpenAI GPT-4o", icon: "🧠" },
                  { label: "Ethereum", icon: "◆" },
                  { label: "Vercel Edge", icon: "⬡" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5">
                    <span className="text-white/50 text-sm">{t.icon}</span>
                    <span className="text-xs font-semibold text-white/40">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ViewProvider>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 py-8 px-4 flex flex-col items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} NeuroGrowth Intelligence Ltd. · All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Security", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}

