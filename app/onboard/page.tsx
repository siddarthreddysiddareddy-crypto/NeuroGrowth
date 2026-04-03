"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNeuroGrowth } from "../../hooks/useNeuroGrowth";

const STEPS = ["Choose Role", "Profile Details", "Connect Wallet"];

export default function OnboardPage() {
  const router = useRouter();
  const { connectWallet, isConnecting, isConnected, walletAddress } = useNeuroGrowth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"business" | "investor" | null>(null);
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/dashboard/${role}`);
    }, 1500);
  };

  const canProceed1 = !!role;
  const canProceed2 = role === "business" ? !!businessName && !!industry : !!preferences;

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: "#080f1e" }}>
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none">
        <div className="fixed w-[600px] h-[600px] rounded-full"
          style={{ top: "-20%", left: "-10%", background: "rgba(59,130,246,0.10)", filter: "blur(120px)" }} />
        <div className="fixed w-[500px] h-[500px] rounded-full"
          style={{ bottom: "0%", right: "-10%", background: "rgba(139,92,246,0.08)", filter: "blur(100px)" }} />
        <div className="fixed w-[400px] h-[400px] rounded-full"
          style={{ top: "40%", left: "55%", background: "rgba(16,185,129,0.06)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Header */}
        <div className="text-center mb-10 max-w-xl">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">Neuro<span className="text-blue-400">Growth</span></span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Start Your Journey
          </h1>
          <p className="text-white/40 text-base">
            Set up your NeuroGrowth account in 3 simple steps
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-lg mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                        done ? "border-blue-500 bg-blue-500 text-white" :
                        active ? "border-blue-400 bg-blue-500/20 text-blue-300" :
                        "border-white/15 bg-white/[0.04] text-white/30"
                      }`}
                    >
                      {done ? "✓" : num}
                    </div>
                    <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-white/70" : "text-white/25"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 mt-[-14px]"
                      style={{ background: step > num + 1 ? "#3b82f6" : "rgba(255,255,255,0.08)" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-lg rounded-2xl p-8 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${role === "investor" ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.15)"} 0%, transparent 70%)` }} />

          {/* Step 1 — Choose Role */}
          {step === 1 && (
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
              <p className="text-white/40 text-sm mb-6">Select how you&apos;ll use NeuroGrowth</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {([
                  { id: "business" as const, emoji: "🏢", label: "Business", desc: "Raise capital & grow with AI campaigns", color: "#3b82f6" },
                  { id: "investor" as const, emoji: "💸", label: "Investor", desc: "Discover AI-vetted startups & invest", color: "#10b981" },
                ] as const).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 group`}
                    style={{
                      borderColor: role === r.id ? r.color : "rgba(255,255,255,0.08)",
                      background: role === r.id ? `${r.color}15` : "rgba(255,255,255,0.02)",
                      boxShadow: role === r.id ? `0 0 30px ${r.color}20` : "none",
                    }}
                  >
                    <div className="text-3xl mb-3">{r.emoji}</div>
                    <h3 className="text-base font-bold text-white mb-1">{r.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
                  </button>
                ))}
              </div>
              <button
                disabled={!canProceed1}
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: canProceed1
                    ? (role === "investor"
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "linear-gradient(135deg, #3b82f6, #6366f1)")
                    : "rgba(255,255,255,0.08)",
                  boxShadow: canProceed1 ? "0 4px 20px rgba(59,130,246,0.3)" : "none",
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Profile Details */}
          {step === 2 && (
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Profile Details</h2>
              <p className="text-white/40 text-sm mb-6">Tell us about {role === "business" ? "your business" : "your investment preferences"}</p>
              {role === "business" ? (
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-2">Business Name</label>
                    <input value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm bg-white/[0.05] border border-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all"
                      placeholder="Enter your business name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-2">Industry</label>
                    <input value={industry} onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm bg-white/[0.05] border border-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all"
                      placeholder="e.g. SaaS, FinTech, EdTech" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-white/55 mb-2">Investment Preferences</label>
                    <input value={preferences} onChange={(e) => setPreferences(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm bg-white/[0.05] border border-white/[0.10] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all"
                      placeholder="e.g. GreenTech, AI, HealthTech (comma separated)" />
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={handleBack}
                  className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] text-white/70 font-semibold text-sm transition-all border border-white/[0.08]">
                  ← Back
                </button>
                <button
                  disabled={!canProceed2}
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: canProceed2
                      ? (role === "investor" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #3b82f6, #6366f1)")
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Connect Wallet */}
          {step === 3 && (
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
              <p className="text-white/40 text-sm mb-8">
                Securely connect your Web3 wallet to enable token features and investments.
              </p>

              {!isConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 disabled:opacity-50 mb-4"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    <><span>🦊</span> Connect MetaMask</>
                  )}
                </button>
              ) : (
                <div className="inline-block mb-6 px-5 py-4 rounded-2xl"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <span className="text-emerald-400 font-bold block mb-1">✅ Wallet Connected</span>
                  <span className="text-emerald-300/70 text-sm font-mono">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
              )}

              <p className="text-white/25 text-xs mb-8">You can also connect a wallet later from your dashboard</p>

              <div className="flex gap-3">
                <button onClick={handleBack}
                  className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] text-white/70 font-semibold text-sm transition-all border border-white/[0.08]">
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 4px 20px rgba(59,130,246,0.35)" }}
                >
                  {loading ? (
                    <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Setting up dashboard...</>
                  ) : (
                    <>Complete Setup ✨</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
