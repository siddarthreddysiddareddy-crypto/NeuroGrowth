"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";

interface OnboardingData {
  businessName: string;
  websiteUrl: string;
  targetAudience: string;
  industry: string;
}

export default function OnboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: "",
    websiteUrl: "",
    targetAudience: "",
    industry: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.businessName ||
      !formData.websiteUrl ||
      !formData.targetAudience ||
      !formData.industry
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Simulate API call
    console.log("NeuroGrowth Onboarding Data:", formData);

    // Simulate delay for better UX
    setTimeout(() => {
      setLoading(false);
      // Navigate to dashboard
      router.push("/dashboard/business");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your NeuroGrowth Journey
          </h1>
          <p className="text-gray-300 text-lg">
            Tell us about your business, and we'll create your AI-powered growth dashboard
          </p>
        </div>

        {/* Form Card */}
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-semibold text-white mb-2"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
                className="w-full px-4 py-3 bg-primary/50 border border-primary-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Website URL */}
            <div>
              <label
                htmlFor="websiteUrl"
                className="block text-sm font-semibold text-white mb-2"
              >
                Website URL
              </label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 bg-primary/50 border border-primary-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label
                htmlFor="targetAudience"
                className="block text-sm font-semibold text-white mb-2"
              >
                Target Audience
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., Young professionals, Tech enthusiasts"
                className="w-full px-4 py-3 bg-primary/50 border border-primary-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-semibold text-white mb-2"
              >
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-primary/50 border border-primary-light/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="" disabled>
                  Select your industry
                </option>
                <option value="saas">SaaS</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="services">Services</option>
                <option value="consulting">Consulting</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Generating Your Dashboard...
                </>
              ) : (
                <>
                  Create Dashboard with AI
                  <span>→</span>
                </>
              )}
            </button>
          </form>
        </Card>

        {/* Info Text */}
        <p className="text-center text-gray-400 text-sm">
          Don't worry, you can update these details anytime in your dashboard
          settings.
        </p>
      </div>
    </div>
  );
}
