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
    businessEmail: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    gstNumber: "",
    sector: "",
    city: "",
    foundingYear: "",
    fundingTarget: "",
    equityOffered: "",
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
    if (!formData.businessEmail) newErrors.businessEmail = "Business email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail))
      newErrors.businessEmail = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
      await register(
        formData.name,
        formData.businessEmail,
        formData.password,
        "business",
        {
          business_name: formData.businessName,
          gst_number: formData.gstNumber,
          sector: formData.sector,
          city: formData.city,
          founding_year: parseInt(formData.foundingYear),
          funding_target: parseFloat(formData.fundingTarget),
          equity_offered: parseFloat(formData.equityOffered),
        }
      );
      setTimeout(() => router.push("/dashboard/business"), 1500);
    } catch (error) {
      // Error is already shown via toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
              <span className="text-white font-bold">NG</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Register as Business
          </h1>
          <p className="text-gray-600">Join NeuroGrowth and scale your business with AI</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

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
            </div>

            {/* Business Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              
              <Input
                label="Business Name"
                name="businessName"
                type="text"
                placeholder="Your Company Name"
                value={formData.businessName}
                onChange={handleChange}
                error={errors.businessName}
              />

              <Input
                label="GST Number"
                name="gstNumber"
                type="text"
                placeholder="27ABCDE1234F1Z5"
                value={formData.gstNumber}
                onChange={handleChange}
                error={errors.gstNumber}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select sector</option>
                  <option value="SaaS">SaaS</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Services">Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="EdTech">EdTech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Other">Other</option>
                </select>
                {errors.sector && (
                  <p className="text-red-500 text-sm mt-1">{errors.sector}</p>
                )}
              </div>

              <Input
                label="City"
                name="city"
                type="text"
                placeholder="e.g., Bangalore"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />

              <Input
                label="Founding Year"
                name="foundingYear"
                type="number"
                placeholder="2020"
                value={formData.foundingYear}
                onChange={handleChange}
                error={errors.foundingYear}
              />

              <Input
                label="Funding Target (in USD)"
                name="fundingTarget"
                type="number"
                placeholder="500000"
                value={formData.fundingTarget}
                onChange={handleChange}
                error={errors.fundingTarget}
              />

              <Input
                label="Equity Offered (%)"
                name="equityOffered"
                type="number"
                placeholder="10"
                step="0.1"
                value={formData.equityOffered}
                onChange={handleChange}
                error={errors.equityOffered}
              />
            </div>

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
          <p className="text-center mt-6 text-gray-600 text-sm">
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
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
