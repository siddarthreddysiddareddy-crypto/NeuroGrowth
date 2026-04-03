"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function BusinessLogin() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ businessEmail: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessEmail) newErrors.businessEmail = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail))
      newErrors.businessEmail = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await login(formData.businessEmail, formData.password, "business");
      setTimeout(() => router.push("/dashboard/business"), 1500);
    } catch {}
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#080f1e" }}
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none select-none">
        <div className="fixed w-[500px] h-[500px] rounded-full opacity-100 pointer-events-none"
          style={{ top: "-15%", left: "-10%", background: "rgba(59,130,246,0.10)", filter: "blur(100px)" }} />
        <div className="fixed w-[400px] h-[400px] rounded-full opacity-100 pointer-events-none"
          style={{ bottom: "5%", right: "-8%", background: "rgba(139,92,246,0.08)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">Neuro<span className="text-blue-400">Growth</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Business Login</h1>
          <p className="text-white/40 text-sm">Access your NeuroGrowth dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}>
          {/* Blue top glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)" }} />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-1">
            <Input label="Business Email" name="businessEmail" type="email"
              placeholder="business@company.com" value={formData.businessEmail}
              onChange={handleChange} error={errors.businessEmail} />
            <Input label="Password" name="password" type="password"
              placeholder="••••••••" value={formData.password}
              onChange={handleChange} error={errors.password} />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" loading={isLoading} className="w-full">
                Login to Dashboard →
              </Button>
            </div>
          </form>

          <p className="text-center mt-6 text-white/35 text-sm">
            New here?{" "}
            <Link href="/auth/business/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Create account
            </Link>
          </p>
        </div>

        <p className="text-center mt-5">
          <Link href="/" className="text-white/25 hover:text-white/50 text-sm transition-colors">
            ← Back to Home
          </Link>
        </p>

        {/* Investor login link */}
        <p className="text-center mt-3 text-white/20 text-xs">
          Are you an investor?{" "}
          <Link href="/auth/investor/login" className="text-emerald-500/60 hover:text-emerald-400 transition-colors">
            Investor login
          </Link>
        </p>
      </div>
    </div>
  );
}
