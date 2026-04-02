"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import { useNeuroGrowth } from "../../hooks/useNeuroGrowth";

export default function OnboardPage() {
  const router = useRouter();
  const { connectWallet, isConnecting, isConnected, walletAddress } = useNeuroGrowth();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'business' | 'investor' | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Business fields
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");

  // Investor fields
  const [preferences, setPreferences] = useState("");

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate mapping to schema and API call
    console.log("Saving onboarding data...", { role, businessName, industry, preferences, walletAddress });
    setTimeout(() => {
      setLoading(false);
      router.push(`/dashboard/${role}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary py-12 px-4 transition-all duration-500">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your NeuroGrowth Journey
          </h1>
          <p className="text-gray-300 text-lg">
            Step {step} of 3
          </p>
        </div>

        <Card className="mb-8 overflow-hidden relative min-h-[400px]">
           {step === 1 && (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-white mb-6">Choose Your Role</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <button 
                     onClick={() => setRole('business')}
                     className={`p-6 rounded-xl border-2 transition-all text-left ${role === 'business' ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 hover:border-gray-500 text-gray-400'}`}
                   >
                     <div className="text-4xl mb-4">🏢</div>
                     <h3 className="text-xl font-bold text-white mb-2">Business</h3>
                     <p className="text-sm">Raise capital and simulate growth campaigns.</p>
                   </button>
                   <button 
                     onClick={() => setRole('investor')}
                     className={`p-6 rounded-xl border-2 transition-all text-left ${role === 'investor' ? 'border-green-500 bg-green-500/20' : 'border-gray-700 hover:border-gray-500 text-gray-400'}`}
                   >
                     <div className="text-4xl mb-4">💸</div>
                     <h3 className="text-xl font-bold text-white mb-2">Investor</h3>
                     <p className="text-sm">Discover AI-vetted startups and stake tokens.</p>
                   </button>
                </div>
                <button 
                  disabled={!role}
                  onClick={handleNext}
                  className="w-full mt-8 btn-primary py-4 text-lg font-semibold disabled:opacity-50"
                  style={{
                    backgroundColor: "#1D4ED8", // Specific tailored tailwind fallback for btn-primary
                    color: "white",
                    borderRadius: "0.5rem"
                  }}
                >
                  Continue →
                </button>
             </div>
           )}

           {step === 2 && (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Details</h2>
                {role === 'business' ? (
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Business Name</label>
                      <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="Enter business name"/>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Industry</label>
                      <input value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="e.g. SaaS, FinTech"/>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">Investment Preferences</label>
                      <input value={preferences} onChange={(e) => setPreferences(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="e.g. GreenTech, AI (comma separated)"/>
                    </div>
                  </div>
                )}
                <div className="flex gap-4 mt-8">
                  <button onClick={handleBack} className="px-6 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors">Back</button>
                  <button 
                    disabled={role === 'business' ? !businessName : !preferences}
                    onClick={handleNext}
                    className="flex-1 py-4 text-lg font-semibold disabled:opacity-50"
                    style={{
                      backgroundColor: "#1D4ED8",
                      color: "white",
                      borderRadius: "0.5rem"
                    }}
                  >
                    Continue →
                  </button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">Connect Your Wallet</h2>
                <p className="text-gray-400 mb-8">Securely connect your web3 wallet to enable investments and token features.</p>
                
                {!isConnected ? (
                  <button 
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-bold transition-colors disabled:opacity-50 inline-flex items-center gap-3"
                  >
                    {isConnecting ? "Connecting..." : "🦊 Connect MetaMask"}
                  </button>
                ) : (
                  <div className="inline-block p-4 rounded-xl bg-green-500/20 border border-green-500/50 mb-8 mt-4">
                    <span className="text-green-400 font-bold block mb-1">✅ Wallet Connected</span>
                    <span className="text-sm text-green-300 bg-green-500/20 px-3 py-1 rounded-full font-mono">
                      {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                    </span>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button onClick={handleBack} className="px-6 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors">Back</button>
                  <button 
                    onClick={handleSubmit}
                    disabled={!isConnected || loading}
                    className="flex-1 py-4 text-lg font-semibold disabled:opacity-50 flex justify-center items-center gap-2"
                    style={{
                      backgroundColor: "#1D4ED8",
                      color: "white",
                      borderRadius: "0.5rem"
                    }}
                  >
                    {loading ? "Generating Dashboard..." : "Complete Setup ✨"}
                  </button>
                </div>
             </div>
           )}
        </Card>
      </div>
    </div>
  );
}
