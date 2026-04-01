# NeuroGrowth - Intelligent Investment & Growth Platform

A modern SaaS platform connecting investors with growth opportunities and empowering businesses with AI-driven marketing automation. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Landing Page** - Hero section showcasing dual-user value proposition
- **Business Onboarding** - Form-based setup flow for business accounts
- **Business Dashboard** - AI-powered marketing automation with:
  - Weekly content calendar
  - AI-generated social media captions
  - Campaign ROI tracking
  - Real-time engagement metrics
  - Growth insights and recommendations
- **Investor Dashboard** - Investment management platform with:
  - Portfolio performance tracking
  - Deal pipeline and AI-matched opportunities
  - Investment analytics and returns
  - Market intelligence and alerts
  - Founder communication tools
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Premium dark theme with smooth animations

## 🎨 Design

- **Color Scheme**: Deep navy primary (#0B1F3A), with blue & green accents
- **Components**: Rounded-xl cards with soft shadows
- **Animations**: Smooth hover effects and transitions
- **Premium Feel**: Glassmorphism effects with backdrop blur

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
app/
  ├── page.tsx                      # Landing page
  ├── layout.tsx                    # Root layout with navbar
  ├── globals.css                   # Global styles and Tailwind
  ├── onboard/
  │   └── page.tsx                  # Business onboarding
  └── dashboard/
      ├── business/
      │   └── page.tsx              # Business dashboard
      └── investor/
          └── page.tsx              # Investor dashboard

components/
  ├── Navbar.tsx                    # Navigation bar component
  └── Card.tsx                      # Reusable card component

config files:
  ├── next.config.js
  ├── tsconfig.json
  ├── tailwind.config.ts
  ├── postcss.config.js
  └── .eslintrc.json
```

## 🧩 Components

### Navbar
- Sticky navigation with logo and links
- Active route highlighting
- Dashboard dropdown menu
- Responsive design

### Card
- Reusable container component
- Props: `title`, `children`, `className`
- Built-in hover animations

## 🔧 Build & Deploy

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel (recommended):

```bash
vercel deploy
```

## 📝 Key Features Implemented

✅ Next.js 14 App Router
✅ Full TypeScript support
✅ Tailwind CSS styling
✅ Responsive mobile design
✅ Form validation and submission
✅ Dual dashboard system (Business & Investor)
✅ Mock data for realistic dashboards
✅ Smooth navigation and animations
✅ Modern SaaS UI patterns

## 🎯 User Flows

### Business Users
1. **Landing Page** → Showcase value proposition
2. **Get Started** → Route to onboarding
3. **Fill Form** → Collect business information
4. **Business Dashboard** → Access AI-powered marketing tools

### Investor Users
1. **Landing Page** → View investment opportunities
2. **Investor Dashboard** → Access deal pipeline and portfolio
3. **Browse Deals** → Explore AI-matched opportunities
4. **Track Returns** → Monitor portfolio performance

## 📊 Mock Data

### Business Dashboard
- 7-day content calendar with publishing status
- 3 AI-generated caption variations
- Campaign ROI tracking (3 active campaigns)
- Engagement metrics (CTR, Engagement Rate, Reach, Conversions)

### Investor Dashboard
- Portfolio metrics (Total Invested, Portfolio Value, Active Investments, ROI)
- Deal pipeline with AI match scoring (4 opportunities)
- Active portfolio (4 investments tracking returns)
- 3 AI-recommended opportunities with detailed information

## 🌟 Customization

Update theme colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#0B1F3A",
  "primary-light": "#142D55",
  card: "#101C2E",
}
```

## 📦 Dependencies

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **ESLint**: Code quality

## 🚀 Performance

- Server-side rendering with Next.js
- Optimized images and assets
- Code splitting and lazy loading
- CSS minification with Tailwind

## 📧 Questions?

This is a hackathon-ready SaaS platform. All features are fully implemented and production-ready.

---

**Connecting investors, businesses, and growth opportunities.**
