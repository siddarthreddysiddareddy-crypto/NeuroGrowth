"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Get user role from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole);
    }
  }, []);

  // Hide sidebar on auth pages and home
  if (pathname.startsWith("/auth/") || pathname === "/") {
    return null;
  }

  const isBusinessDashboard = pathname === "/dashboard/business";
  const isInvestorDashboard = pathname === "/dashboard/investor";

  return (
    <aside className="w-64 bg-[#08172E] border-r border-white/10 min-h-screen fixed left-0 top-16 z-40 overflow-y-auto">
      <div className="p-6">
        {/* Profile Section */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.[0].toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{user?.name || "User"}</p>
              <p className="text-gray-400 text-xs">
                {userRole === "business" ? "Business Owner" : "Investor"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {userRole === "business" && (
            <>
              <Link
                href="/dashboard/business"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/business"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                📊 Dashboard
              </Link>
              <Link
                href="/dashboard/business/analytics"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/business/analytics"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                📈 Analytics
              </Link>
              <Link
                href="/dashboard/business/campaigns"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/business/campaigns"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                📱 Campaigns
              </Link>
              <Link
                href="/dashboard/business/ai-tools"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/business/ai-tools"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                🤖 AI Tools
              </Link>
              <Link
                href="/dashboard/business/settings"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/business/settings"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                ⚙️ Settings
              </Link>
            </>
          )}

          {userRole === "investor" && (
            <>
              <Link
                href="/dashboard/investor"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/investor"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                💰 Dashboard
              </Link>
              <Link
                href="/dashboard/investor/opportunities"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/investor/opportunities" || pathname.startsWith("/dashboard/investor/opportunities/")
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                ✨ Opportunities
              </Link>
              <Link
                href="/dashboard/investor/portfolio"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/investor/portfolio" || pathname.startsWith("/dashboard/investor/portfolio/")
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                💼 Portfolio
              </Link>
              <Link
                href="/dashboard/investor/network"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/investor/network" || pathname.startsWith("/dashboard/investor/network/")
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                🤝 Network
              </Link>
              <Link
                href="/dashboard/investor/settings"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  pathname === "/dashboard/investor/settings" || pathname.startsWith("/dashboard/investor/settings/")
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                ⚙️ Settings
              </Link>
            </>
          )}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-xs font-semibold mb-3 uppercase">
            At a Glance
          </p>
          {userRole === "business" && (
            <>
              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <p className="text-gray-400 text-xs">Revenue This Month</p>
                <p className="text-white font-bold text-lg">₹2,45,000</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Growth Rate</p>
                <p className="text-green-400 font-bold text-lg">+18%</p>
              </div>
            </>
          )}
          {userRole === "investor" && (
            <>
              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <p className="text-gray-400 text-xs">Portfolio Value</p>
                <p className="text-white font-bold text-lg">₹31,80,000</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Avg Return</p>
                <p className="text-green-400 font-bold text-lg">+28.4%</p>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
