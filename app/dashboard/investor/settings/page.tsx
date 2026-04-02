"use client";

import Card from "@/components/Card";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dealAlerts: true,
    weeklyReport: true,
    networkUpdates: true,
    twoFactorAuth: false,
    privateProfile: false,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 pt-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-300 text-lg">
          Manage your profile, preferences, and account
        </p>
      </div>

      {/* Profile Settings */}
      <Card title="👤 Profile Settings" className="mb-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-green-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-green-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              placeholder="Tell the community about your investing experience..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none h-24"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Stage
              </label>
              <select className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-green-500/50">
                <option>Seed</option>
                <option>Series A</option>
                <option>Series B+</option>
                <option>All Stages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Sector
              </label>
              <select className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-green-500/50">
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>All Sectors</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Investment Range
              </label>
              <select className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:outline-none focus:border-green-500/50">
                <option>₹20-50L</option>
                <option>₹50L-2Cr</option>
                <option>₹2-5Cr</option>
                <option>₹5Cr+</option>
              </select>
            </div>
          </div>

          <button className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card title="🔔 Notification Preferences" className="mb-8">
        <div className="space-y-4">
          {[
            { key: "emailNotifications", label: "Email Notifications", desc: "Receive important updates via email" },
            { key: "dealAlerts", label: "Deal Alerts", desc: "Get notified about new investment opportunities" },
            { key: "weeklyReport", label: "Weekly Report", desc: "Receive portfolio summary every Monday" },
            { key: "networkUpdates", label: "Network Updates", desc: "Updates about connections and network activity" },
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <p className="text-white font-medium">{setting.label}</p>
                <p className="text-gray-400 text-sm">{setting.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(setting.key)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings[setting.key as keyof typeof settings]
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings[setting.key as keyof typeof settings]
                      ? "translate-x-6"
                      : "translate-x-0.5"
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card title="🔐 Security & Privacy" className="mb-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => handleToggle("twoFactorAuth")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.twoFactorAuth ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.twoFactorAuth ? "translate-x-6" : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-white font-medium">Private Profile</p>
              <p className="text-gray-400 text-sm">Hide your profile from other investors</p>
            </div>
            <button
              onClick={() => handleToggle("privateProfile")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.privateProfile ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privateProfile ? "translate-x-6" : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>

          <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors font-medium">
            Change Password
          </button>

          <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg transition-colors font-medium">
            View Active Sessions
          </button>
        </div>
      </Card>

      {/* Billing & Payment */}
      <Card title="💳 Billing & Payment Methods" className="mb-8">
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white font-medium mb-2">Primary Payment Method</p>
            <p className="text-gray-400 text-sm">Visa ending in 4242</p>
            <button className="mt-3 px-4 py-2 text-green-300 text-sm font-medium hover:text-green-200">
              Edit →
            </button>
          </div>

          <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors font-medium">
            + Add Payment Method
          </button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card title="⚠️ Danger Zone" className="border-red-500/20">
        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-colors font-medium">
            Deactivate Account
          </button>
          <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-colors font-medium">
            Delete Account Permanently
          </button>
          <p className="text-gray-400 text-xs">
            These actions cannot be undone. Please proceed with caution.
          </p>
        </div>
      </Card>
    </div>
  );
}
