"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/dashboard/business", label: "Dashboard", emoji: "📊" },
  { href: "/dashboard/business/analytics", label: "Analytics", emoji: "📈" },
  { href: "/dashboard/business/campaigns", label: "Campaigns", emoji: "📱" },
  { href: "/dashboard/business/ai-tools", label: "AI Tools", emoji: "🤖" },
  { href: "/dashboard/business/settings", label: "Settings", emoji: "⚙️" },
];

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"));
    }
  }, []);

  const isActive = (href: string) =>
    href === "/dashboard/business" ? pathname === href : pathname.startsWith(href);

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
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-500/25"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
              >
                {user?.name?.[0]?.toUpperCase() || "B"}
              </div>
              <div>
                <p className="text-white/90 font-semibold text-sm truncate max-w-[130px]">
                  {user?.name || "Business"}
                </p>
                <p className="text-white/35 text-xs">Business Owner</p>
              </div>
            </div>
            {/* Live badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              <span className="text-blue-400/80 text-[10px] font-semibold">Platform Active</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-3 px-2">
              Navigation
            </p>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    active
                      ? "bg-blue-500/[0.12] text-blue-300 border-blue-500/[0.25]"
                      : "text-white/40 hover:text-white/75 hover:bg-white/[0.05] border-transparent"
                  }`}
                >
                  <span className="text-base w-5 text-center">{link.emoji}</span>
                  <span>{link.label}</span>
                  {active && (
                    <span className="ml-auto w-1 h-4 rounded-full"
                      style={{ background: "linear-gradient(180deg, #60a5fa, #6366f1)" }} />
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
                style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.13)" }}>
                <p className="text-white/35 text-xs">Revenue This Month</p>
                <p className="text-white font-bold text-lg mt-0.5">₹2,45,000</p>
              </div>
              <div className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-white/35 text-xs">Growth Rate</p>
                <p className="text-blue-400 font-bold text-lg mt-0.5">+18%</p>
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
            background: "radial-gradient(ellipse at top right, rgba(59,130,246,0.04) 0%, transparent 60%), #080f1e",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
