"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<"business" | "investor"| null>(null);
  const { isAuthenticated, user } = useAuth();

  // Test Supabase connection on component mount
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        console.log("🔗 Testing Supabase connection...");
        
        // Get session to test connection
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Supabase connection error:", error.message);
        } else {
          console.log("✅ Supabase connection successful");
          console.log("📊 Current session:", session ? "User logged in" : "No user session");
        }
      } catch (error) {
        console.error("❌ Failed to test Supabase:", error);
      }
    };

    testSupabaseConnection();
  }, []);

  // If authenticated, redirect to appropriate dashboard
  const dashboardLink = isAuthenticated
    ? user?.role === "business"
      ? "/dashboard/business"
      : "/dashboard/investor"
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8 hover:bg-blue-500/20 transition-colors">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-blue-300">
              AI-Powered Growth Automation
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            NeuroGrowth{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect investors with growth opportunities and empower businesses with
            AI-driven insights, marketing automation, and intelligent analytics. The
            platform where growth meets opportunity.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              {
                icon: "✨",
                feature: "AI Content Generation",
              },
              {
                icon: "📊",
                feature: "Campaign Analytics",
              },
              {
                icon: "🚀",
                feature: "Growth Automation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-blue-500/20 rounded-lg hover:bg-primary-light/50 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-200">
                  {item.feature}
                </span>
              </div>
            ))}
          </div>

          {/* Role Selection or Dashboard Link */}
          {isAuthenticated ? (
            <Link
              href={dashboardLink || "/"}
              className="inline-block btn-primary text-lg px-8 py-4 font-semibold hover:scale-105"
            >
              Go to Your Dashboard
            </Link>
          ) : (
            <>
              {/* Role Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedRole("business")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedRole === "business"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-600/20 text-blue-300 hover:bg-blue-600/30"
                  }`}
                >
                  🏢 Continue as Business
                </button>
                <button
                  onClick={() => setSelectedRole("investor")}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedRole === "investor"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30"
                  }`}
                >
                  💰 Continue as Investor
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {selectedRole === "business" ? (
                  <>
                    <Link
                      href="/auth/business/register"
                      className="btn-primary text-lg px-8 py-4 font-semibold hover:scale-105"
                    >
                      Register as Business
                    </Link>
                    <Link
                      href="/auth/business/login"
                      className="btn-secondary text-lg px-8 py-4 font-semibold"
                    >
                      Already have account? Login
                    </Link>
                  </>
                ) : selectedRole === "investor" ? (
                  <>
                    <Link
                      href="/auth/investor/register"
                      className="btn-primary text-lg px-8 py-4 font-semibold hover:scale-105"
                    >
                      Register as Investor
                    </Link>
                    <Link
                      href="/auth/investor/login"
                      className="btn-secondary text-lg px-8 py-4 font-semibold"
                    >
                      Already have account? Login
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Select your role above to get started ↑
                  </p>
                )}
              </div>
            </>
          )}

          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-primary-light/20">
            <p className="text-sm text-gray-400 mb-4">
              Trusted by growth teams at:
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              {["TechStart", "GrowthHub", "ScaleUp", "StartupX"].map(
                (name, i) => (
                  <span
                    key={i}
                    className="text-gray-400 font-semibold text-sm"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-primary-light/30 border-t border-primary-light/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Why Choose NeuroGrowth?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6">For Businesses</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "AI Marketing Automation",
                    description: "Generate content, manage campaigns, and automate workflows",
                  },
                  {
                    title: "Growth Analytics",
                    description: "Real-time insights on performance and engagement metrics",
                  },
                  {
                    title: "Smart Scaling",
                    description: "Grow faster with AI-powered recommendations and automation",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-card/50 backdrop-blur-sm border border-primary-light/20 rounded-xl p-6 hover:bg-card/70 transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-6">For Investors</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Deal Pipeline",
                    description: "Access pre-screened, high-potential growth opportunities",
                  },
                  {
                    title: "Performance Tracking",
                    description: "Real-time portfolio metrics and investment performance analytics",
                  },
                  {
                    title: "Opportunity Insights",
                    description: "AI-driven market analysis and investment recommendations",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-card/50 backdrop-blur-sm border border-primary-light/20 rounded-xl p-6 hover:bg-card/70 transition-colors group"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-gray-300 mb-8">
            Join hundreds of growing businesses using AI to scale faster.
          </p>
          <Link
            href="/onboard"
            className="btn-primary text-lg px-8 py-4 inline-block"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
