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
    name: "",
    businessType: "",
    businessEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.businessType) newErrors.businessType = "Business type is required";
    if (!formData.businessEmail) newErrors.businessEmail = "Business email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail))
      newErrors.businessEmail = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register(formData.name, formData.businessEmail, formData.password, "business");
      setTimeout(() => router.push("/dashboard/business"), 1500);
    } catch (error) {
      // Error is already shown via toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0E2650] to-[#0B1F3A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
              <span className="text-white font-bold">NG</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Register as Business
          </h1>
          <p className="text-gray-300">Join NeuroGrowth and scale your business with AI</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select business type</option>
                <option value="saas">SaaS</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="services">Services</option>
                <option value="startup">Startup</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && (
                <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
              )}
            </div>

            <Input
              label="Business Email"
              name="businessEmail"
              type="email"
              placeholder="business@company.com"
              value={formData.businessEmail}
              onChange={handleChange}
              error={errors.businessEmail}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-300 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/business/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Back Link */}
        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-white text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
