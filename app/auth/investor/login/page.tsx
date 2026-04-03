"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function InvestorLogin() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(formData.email, formData.password, "investor");
      setTimeout(() => router.push("/dashboard/investor"), 1500);
    } catch {}
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#080f1e" }}
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none select-none">
        <div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ top: "-15%", right: "-10%", background: "rgba(16,185,129,0.10)", filter: "blur(100px)" }} />
        <div className="fixed w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ bottom: "5%", left: "-8%", background: "rgba(59,130,246,0.08)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", boxShadow: "0 4px 20px rgba(16,185,129,0.4)" }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">Neuro<span className="text-emerald-400">Growth</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Investor Login</h1>
          <p className="text-white/40 text-sm">Access your investment portfolio</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}>
          {/* Emerald top glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.20) 0%, transparent 70%)" }} />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-1">
            <Input label="Email Address" name="email" type="email" accent="emerald"
              placeholder="jane@investor.com" value={formData.email}
              onChange={handleChange} error={errors.email} />
            <Input label="Password" name="password" type="password" accent="emerald"
              placeholder="••••••••" value={formData.password}
              onChange={handleChange} error={errors.password} />

            <div className="pt-2">
              <Button type="submit" variant="emerald" size="lg" loading={isLoading} className="w-full">
                Login to Portfolio →
              </Button>
            </div>
          </form>

          <p className="text-center mt-6 text-white/35 text-sm">
            New here?{" "}
            <Link href="/auth/investor/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </div>

        <p className="text-center mt-5">
          <Link href="/" className="text-white/25 hover:text-white/50 text-sm transition-colors">
            ← Back to Home
          </Link>
        </p>

        <p className="text-center mt-3 text-white/20 text-xs">
          Are you a business?{" "}
          <Link href="/auth/business/login" className="text-blue-500/60 hover:text-blue-400 transition-colors">
            Business login
          </Link>
        </p>
      </div>
    </div>
  );
}
