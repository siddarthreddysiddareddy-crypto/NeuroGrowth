"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function BusinessDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole);
    }
  }, []);

  const navLinks = [
    { href: "/dashboard/business", label: "📊 Dashboard", icon: "dashboard" },
    { href: "/dashboard/business/analytics", label: "📈 Analytics", icon: "analytics" },
    { href: "/dashboard/business/campaigns", label: "📱 Campaigns", icon: "campaigns" },
    { href: "/dashboard/business/ai-tools", label: "🤖 AI Tools", icon: "ai" },
    { href: "/dashboard/business/settings", label: "⚙️ Settings", icon: "settings" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard/business") {
      return pathname === "/dashboard/business";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0B1E3A] via-[#0E2650] to-[#0B1E3A]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#08172E] border-r border-white/10 fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto z-40">
        <div className="p-6">
          {/* Profile Section */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.[0].toUpperCase() || "B"}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user?.name || "Business"}</p>
                <p className="text-gray-400 text-xs">Business Owner</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 pt-20">
        <div className="min-h-screen bg-gradient-to-br from-[#0B1E3A] via-[#0E2650] to-[#0B1E3A]">
          {children}
        </div>
      </main>
    </div>
  );
}
