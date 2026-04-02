"use client";

import Card from "@/components/Card";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    campaignAlerts: true,
    weeklyDigest: true,
    dataAnalytics: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300 text-lg">Manage your account preferences and notifications</p>
      </div>

      {/* Profile Settings */}
      <Card title="👤 Profile Information" className="mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              defaultValue="Business Owner"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              defaultValue="business@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-semibold">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 000-0000"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-semibold">Company Name</label>
            <input
              type="text"
              defaultValue="My Business"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20 mt-4">
            Save Changes
          </button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card title="🔔 Notification Preferences" className="mb-8">
        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email Notifications", description: "Receive email updates about campaigns" },
            { key: "pushNotifications", label: "Push Notifications", description: "Get push notifications on your device" },
            { key: "campaignAlerts", label: "Campaign Alerts", description: "Alerts for campaign milestones and issues" },
            { key: "weeklyDigest", label: "Weekly Digest", description: "Receive a weekly summary of your performance" },
            { key: "dataAnalytics", label: "Analytics Reports", description: "Share analytics data for improvements" },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex-1">
                <p className="font-semibold text-white mb-1">{label}</p>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
              <button
                onClick={() => handleToggle(key as keyof typeof settings)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings[key as keyof typeof settings]
                    ? "bg-blue-500"
                    : "bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    settings[key as keyof typeof settings] ? "translate-x-6" : ""
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card title="🔐 Security & Privacy" className="mb-8">
        <div className="space-y-4">
          <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-left flex items-center justify-between group">
            <div>
              <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">Change Password</p>
              <p className="text-sm text-gray-400">Update your password regularly</p>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-left flex items-center justify-between group">
            <div>
              <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Add an extra layer of security</p>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-left flex items-center justify-between group">
            <div>
              <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">API Keys</p>
              <p className="text-sm text-gray-400">Manage your API credentials</p>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </Card>

      {/* Billing & Subscription */}
      <Card title="💳 Billing & Subscription" className="mb-8">
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-white">Current Plan: Pro</p>
                <p className="text-sm text-gray-400">Renews on March 15, 2024</p>
              </div>
              <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors text-sm font-medium">
                Upgrade
              </button>
            </div>
          </div>
          <button className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-left flex items-center justify-between group">
            <div>
              <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">View Invoice History</p>
              <p className="text-sm text-gray-400">Download past invoices</p>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card title="⚠️ Danger Zone" className="border-red-500/30 bg-red-500/5">
        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300 mb-3">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-colors text-sm font-medium">
                Delete Account
              </button>
              <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-colors text-sm font-medium">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
