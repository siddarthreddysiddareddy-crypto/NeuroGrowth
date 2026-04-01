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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required";
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
    } catch (error) {
      // Error is already shown via toast
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl">
              <span className="text-white font-bold">NG</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investor Login
          </h1>
          <p className="text-gray-600">Access your investment portfolio</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@investor.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading}
              className="w-full"
            >
              Login to Dashboard
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            New here?{" "}
            <Link
              href="/auth/investor/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Register here
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
