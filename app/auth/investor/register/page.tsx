"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function InvestorRegister() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "", investorEmail: "", password: "", confirmPassword: "", walletAddress: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.investorEmail) newErrors.investorEmail = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.investorEmail))
      newErrors.investorEmail = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await register(formData.name, formData.investorEmail, formData.password, "investor", {
        wallet_address: formData.walletAddress || null,
      });
      setTimeout(() => router.push("/dashboard/investor"), 1500);
    } catch {}
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#080f1e" }}
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none">
        <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ top: "-20%", right: "-15%", background: "rgba(16,185,129,0.09)", filter: "blur(120px)" }} />
        <div className="fixed w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ bottom: "0%", left: "-10%", background: "rgba(59,130,246,0.07)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md py-6">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", boxShadow: "0 4px 20px rgba(16,185,129,0.4)" }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">Neuro<span className="text-emerald-400">Growth</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Register as Investor</h1>
          <p className="text-white/40 text-sm">Join NeuroGrowth and invest in promising businesses</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, transparent 70%)" }} />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-1">
            <Input label="Full Name" name="name" type="text" placeholder="Jane Smith" accent="emerald"
              value={formData.name} onChange={handleChange} error={errors.name} />
            <Input label="Email Address" name="investorEmail" type="email" placeholder="jane@investor.com" accent="emerald"
              value={formData.investorEmail} onChange={handleChange} error={errors.investorEmail} />
            <Input label="Password" name="password" type="password" placeholder="Min. 6 characters" accent="emerald"
              value={formData.password} onChange={handleChange} error={errors.password} />
            <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" accent="emerald"
              value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

            {/* Wallet Address — optional with subtle styling */}
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-white/60 mb-2">
                Wallet Address{" "}
                <span className="text-white/25 text-xs font-normal">(optional)</span>
              </label>
              <input
                name="walletAddress"
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b..."
                value={formData.walletAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-white/80 placeholder:text-white/20 text-sm font-mono
                  bg-white/[0.03] border border-white/[0.07] focus:outline-none focus:ring-2
                  focus:border-emerald-500/50 focus:ring-emerald-500/15 transition-all"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="emerald" size="lg" loading={isLoading} className="w-full">
                Create Investor Account →
              </Button>
            </div>
          </form>

          <p className="text-center mt-6 text-white/35 text-sm">
            Already have an account?{" "}
            <Link href="/auth/investor/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Login here
            </Link>
          </p>
        </div>

        <p className="text-center mt-5">
          <Link href="/" className="text-white/25 hover:text-white/50 text-sm transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
