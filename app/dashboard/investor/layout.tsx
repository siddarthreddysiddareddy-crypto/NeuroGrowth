"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const investorNavigation = [
  { name: "Dashboard", href: "/dashboard/investor", icon: "📊" },
  { name: "Opportunities", href: "/dashboard/investor/opportunities", icon: "✨" },
  { name: "Portfolio", href: "/dashboard/investor/portfolio", icon: "💼" },
  { name: "Network", href: "/dashboard/investor/network", icon: "🤝" },
  { name: "Settings", href: "/dashboard/investor/settings", icon: "⚙️" },
];

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) =>
    href === "/dashboard/investor" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen" style={{ background: "#080f1e" }}>
      {/* ── Sidebar ── */}
      <aside
        className="w-64 fixed left-0 top-16 h-[calc(100vh-64px)] z-40 overflow-y-auto flex-shrink-0"
        style={{
          background: "rgba(8,15,30,0.98)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="p-5">
          {/* Profile */}
          <div className="mb-6 pb-6 border-b border-white/[0.07]">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-emerald-500/25"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
              >
                {user?.name?.[0]?.toUpperCase() || "I"}
              </div>
              <div>
                <p className="text-white/90 font-semibold text-sm truncate max-w-[130px]">
                  {user?.name || "Investor"}
                </p>
                <p className="text-white/35 text-xs">Investor Account</p>
              </div>
            </div>
            {/* Live badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400/80 text-[10px] font-semibold">Markets Live</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-3 px-2">
              Navigation
            </p>
            {investorNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    active
                      ? "bg-emerald-500/[0.12] text-emerald-300 border-emerald-500/[0.25]"
                      : "text-white/40 hover:text-white/75 hover:bg-white/[0.05] border-transparent"
                  }`}
                >
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  <span>{item.name}</span>
                  {active && (
                    <span className="ml-auto w-1 h-4 rounded-full"
                      style={{ background: "linear-gradient(180deg, #34d399, #10b981)" }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-white/[0.07]">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-3 px-2">At a Glance</p>
            <div className="space-y-2">
              <div className="rounded-xl p-3"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.13)" }}>
                <p className="text-white/35 text-xs">Portfolio Value</p>
                <p className="text-white font-bold text-lg mt-0.5">₹31,80,000</p>
              </div>
              <div className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-white/35 text-xs">Avg Return</p>
                <p className="text-emerald-400 font-bold text-lg mt-0.5">+28.4%</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 ml-64 pt-16 min-h-screen">
        <div
          className="min-h-[calc(100vh-64px)]"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(16,185,129,0.04) 0%, transparent 60%), #080f1e",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
