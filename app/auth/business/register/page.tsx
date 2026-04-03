"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function BusinessRegister() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "", businessEmail: "", password: "", confirmPassword: "",
    businessName: "", gstNumber: "", sector: "", city: "",
    foundingYear: "", fundingTarget: "", equityOffered: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.businessEmail) newErrors.businessEmail = "Business email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail))
      newErrors.businessEmail = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.businessName) newErrors.businessName = "Business name is required";
    if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.foundingYear) newErrors.foundingYear = "Founding year is required";
    if (!formData.fundingTarget) newErrors.fundingTarget = "Funding target is required";
    if (!formData.equityOffered) newErrors.equityOffered = "Equity offered is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await register(formData.name, formData.businessEmail, formData.password, "business", {
        business_name: formData.businessName,
        gst_number: formData.gstNumber,
        sector: formData.sector,
        city: formData.city,
        founding_year: parseInt(formData.foundingYear),
        funding_target: parseFloat(formData.fundingTarget),
        equity_offered: parseFloat(formData.equityOffered),
      });
      setTimeout(() => router.push("/dashboard/business"), 1500);
    } catch {}
  };

  const sectionLabel = "text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4 flex items-center gap-3";
  const divider = "flex-1 h-px bg-white/[0.06]";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "#080f1e" }}
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none">
        <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ top: "-20%", left: "-15%", background: "rgba(59,130,246,0.09)", filter: "blur(120px)" }} />
        <div className="fixed w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ bottom: "0%", right: "-10%", background: "rgba(139,92,246,0.07)", filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl py-6">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}>
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">Neuro<span className="text-blue-400">Growth</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Register as Business</h1>
          <p className="text-white/40 text-sm">Join NeuroGrowth and scale your business with AI</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-1">
            {/* Account Info */}
            <div className="mb-6">
              <p className={sectionLabel}>
                <span>Account Information</span><span className={divider} />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Input label="Full Name" name="name" type="text" placeholder="John Doe"
                  value={formData.name} onChange={handleChange} error={errors.name} />
                <Input label="Business Email" name="businessEmail" type="email" placeholder="business@company.com"
                  value={formData.businessEmail} onChange={handleChange} error={errors.businessEmail} />
                <Input label="Password" name="password" type="password" placeholder="Min. 6 characters"
                  value={formData.password} onChange={handleChange} error={errors.password} />
                <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••"
                  value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
              </div>
            </div>

            {/* Business Info */}
            <div className="mb-6">
              <p className={sectionLabel}>
                <span>Business Information</span><span className={divider} />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Input label="Business Name" name="businessName" type="text" placeholder="Your Company Name"
                  value={formData.businessName} onChange={handleChange} error={errors.businessName} />
                <Input label="GST Number" name="gstNumber" type="text" placeholder="27ABCDE1234F1Z5"
                  value={formData.gstNumber} onChange={handleChange} error={errors.gstNumber} />
                <Input label="City" name="city" type="text" placeholder="e.g., Bangalore"
                  value={formData.city} onChange={handleChange} error={errors.city} />
                <Input label="Founding Year" name="foundingYear" type="number" placeholder="2020"
                  value={formData.foundingYear} onChange={handleChange} error={errors.foundingYear} />
                <Input label="Funding Target (USD)" name="fundingTarget" type="number" placeholder="500000"
                  value={formData.fundingTarget} onChange={handleChange} error={errors.fundingTarget} />
                <Input label="Equity Offered (%)" name="equityOffered" type="number" placeholder="10" step="0.1"
                  value={formData.equityOffered} onChange={handleChange} error={errors.equityOffered} />
              </div>

              {/* Sector select */}
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-white/60 mb-2">Sector</label>
                <select name="sector" value={formData.sector} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.05] border border-white/[0.10] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all appearance-none"
                  style={{ colorScheme: "dark" }}>
                  <option value="" style={{ background: "#0f1c35" }}>Select sector</option>
                  {["SaaS","E-Commerce","Services","Manufacturing","Healthcare","EdTech","FinTech","Other"].map(s => (
                    <option key={s} value={s} style={{ background: "#0f1c35" }}>{s}</option>
                  ))}
                </select>
                {errors.sector && <p className="text-red-400 text-xs mt-1.5">⚠ {errors.sector}</p>}
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={isLoading} className="w-full mt-2">
              Create Business Account →
            </Button>
          </form>

          <p className="text-center mt-6 text-white/35 text-sm">
            Already have an account?{" "}
            <Link href="/auth/business/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
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
