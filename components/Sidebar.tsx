"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole);
    }
  }, []);

  // Hide on auth / home / onboard
  if (
    pathname.startsWith("/auth/") ||
    pathname === "/" ||
    pathname.startsWith("/onboard") ||
    pathname.startsWith("/dashboard/business") ||
    pathname.startsWith("/dashboard/investor")
  ) {
    return null;
  }

  const isInvestor = userRole === "investor";
  const accent = isInvestor ? "emerald" : "blue";

  const accentActive = isInvestor
    ? "bg-emerald-500/[0.12] text-emerald-300 border-emerald-500/30"
    : "bg-blue-500/[0.12] text-blue-300 border-blue-500/30";

  const businessLinks = [
    { href: "/dashboard/business", label: "Dashboard", emoji: "📊" },
    { href: "/dashboard/business/analytics", label: "Analytics", emoji: "📈" },
    { href: "/dashboard/business/campaigns", label: "Campaigns", emoji: "📱" },
    { href: "/dashboard/business/ai-tools", label: "AI Tools", emoji: "🤖" },
    { href: "/dashboard/business/settings", label: "Settings", emoji: "⚙️" },
  ];

  const investorLinks = [
    { href: "/dashboard/investor", label: "Dashboard", emoji: "💰" },
    { href: "/dashboard/investor/opportunities", label: "Opportunities", emoji: "✨" },
    { href: "/dashboard/investor/portfolio", label: "Portfolio", emoji: "💼" },
    { href: "/dashboard/investor/network", label: "Network", emoji: "🤝" },
    { href: "/dashboard/investor/settings", label: "Settings", emoji: "⚙️" },
  ];

  const links = isInvestor ? investorLinks : businessLinks;

  const isActive = (href: string) =>
    href === (isInvestor ? "/dashboard/investor" : "/dashboard/business")
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <aside
      className="w-64 fixed left-0 top-16 h-[calc(100vh-64px)] z-40 overflow-y-auto"
      style={{
        background: "rgba(8,15,30,0.97)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="p-5">
        {/* Profile */}
        <div className="mb-6 pb-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/10"
              style={{
                background: isInvestor
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #3b82f6, #6366f1)",
              }}
            >
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-white/90 font-semibold text-sm">{user?.name || "User"}</p>
              <p className="text-white/35 text-xs">
                {isInvestor ? "Investor Account" : "Business Owner"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest mb-3 px-2">
            Navigation
          </p>
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  active
                    ? `${accentActive} border`
                    : "text-white/45 hover:text-white/80 hover:bg-white/[0.05] border-transparent"
                }`}
              >
                <span className="text-base">{link.emoji}</span>
                <span>{link.label}</span>
                {active && (
                  <span
                    className="ml-auto w-1 h-4 rounded-full"
                    style={{
                      background: isInvestor
                        ? "linear-gradient(180deg, #34d399, #10b981)"
                        : "linear-gradient(180deg, #60a5fa, #6366f1)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 pt-6 border-t border-white/[0.07]">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest mb-3 px-2">
            At a Glance
          </p>
          {isInvestor ? (
            <div className="space-y-2">
              <div
                className="rounded-xl p-3"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <p className="text-white/40 text-xs">Portfolio Value</p>
                <p className="text-white font-bold text-lg mt-0.5">₹31,80,000</p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-white/40 text-xs">Avg Return</p>
                <p className="text-emerald-400 font-bold text-lg mt-0.5">+28.4%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                className="rounded-xl p-3"
                style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
              >
                <p className="text-white/40 text-xs">Revenue This Month</p>
                <p className="text-white font-bold text-lg mt-0.5">₹2,45,000</p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-white/40 text-xs">Growth Rate</p>
                <p className="text-blue-400 font-bold text-lg mt-0.5">+18%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
