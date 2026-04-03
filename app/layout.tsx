import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "NeuroGrowth — AI Marketing Operating System for Growth",
  description:
    "An intelligent AI-powered platform connecting investors, businesses, and growth opportunities for accelerated success",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className} style={{ fontFamily: "'Outfit', sans-serif" }}>
        <AuthProvider>
          <Navbar />
          <Sidebar />
          {children}
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
