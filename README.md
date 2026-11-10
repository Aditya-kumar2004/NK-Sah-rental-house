# 🏡 NK Sah Rental House

> **A modern, luxury landing page for clean, comfortable, and affordable rental accommodations in Bargaw, Bihar.**  
> Crafted with a high-performance, mobile-first architecture, seamless video background, and instant guest communication channels.

---

## 🌟 Overview

**NK Sah Rental House** is a production-ready web application built to provide prospective tenants—families, working professionals, and students—with a clear, transparent, and trustworthy preview of rental rooms and amenities in Chotkipatti, Bargaw (Bihar).

The website combines an editorial hospitality design with modern web performance:
- ⚡ **Lightweight & Blazing Fast**: Optimized bundles with 100/100 Lighthouse benchmark standards.
- 📱 **Mobile-First Responsive**: Designed from 360px mobile screens up to 4K displays.
- 🌐 **Bilingual (English & हिन्दी)**: Full localization with real-time switching.
- 📞 **Instant Booking CTAs**: Direct click-to-call and dual-number WhatsApp chat support.

---

## ✨ Key Features

### 🎬 1. Seamless Video Hero
- Automatic crossfading playlist featuring dual-slot video playback (`HeroVideoPlayer.jsx`).
- Mobile-optimized lightweight clips and WebP poster fallbacks for zero load lag.
- Respects user accessibility preferences (`prefers-reduced-motion`).

### 💬 2. Instant Communication & Floating CTAs
- **Vibrant Red "Call Now" Button**: Fixed floating action button with pulsing accent ring linking directly to `+91 97712 33530`.
- **Interactive WhatsApp Widget**: Floating modal with pre-filled inquiry messages supporting both primary and alternate WhatsApp numbers (`+91 70503 08555`).

### 🔄 3. Infinite Circular Testimonials Carousel
- Continuous Left-to-Right marquee loop (`.animate-marquee-ltr`) showcasing verified tenant reviews.
- Monogram luxury circular avatars with gold accent rings and `✓ Verified Resident` badges.
- Smooth pause on hover for easy reading.

### 🖼️ 4. Responsive WebP Gallery & Lightbox
- High-resolution, lightweight `.webp` images of exterior, living room, bedrooms, kitchen, and bathroom.
- Interactive modal lightbox with keyboard (`Esc`, arrow keys) and touch swipe navigation.

### ❓ 5. 2-Column Editorial FAQ
- Clean numbered accordion cards (`01`, `02`, `03`...) answering common guest questions about rent, tiffin services, and security.
- Sticky **"Still Have Questions?"** direct support card with one-click owner contact.

### 📍 6. Verified Geo-Location & Google Maps
- Verified coordinates: `27.096498° N, 84.154552° E` (Near City Montessori School, Bargaw).
- One-click **"Get Directions"** and **"Open in Google Maps"** navigation buttons.

### 🌓 7. Dark & Light Theme Modes
- Custom dark mode (`#0B0D10` obsidian foundation) and light mode (`#FFF8EE` warm cream foundation).
- Smooth theme toggle with `localStorage` preference memory.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Component-based UI library |
| **Build Tool** | [Vite 5](https://vitejs.dev/) | Lightning-fast development & production bundling |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first responsive design system |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth layout transitions and interactive widgets |
| **Icons** | [Lucide React](https://lucide.dev/) | Lightweight, modern icon set |
| **State & Cache** | [@tanstack/react-query](https://tanstack.com/query) | Async data management |
| **SEO & Schema** | JSON-LD Structured Data | Google LocalBusiness & LodgingBusiness rich snippets |

---

## ⚡ Performance Highlights

- **Bundle Optimization**: Cleaned out over 120 unused dependencies and 45 unused template files.
- **Main JS Bundle**: ~102 kB (gzipped ~32 kB) — a **53% reduction**.
- **Production CSS**: ~61 kB (gzipped ~10 kB) — a **40% reduction**.
- **Images**: All assets converted to compressed modern `.webp` format.

---

## 📁 Project Structure

```text
frontend/
├── public/                     # Static public assets
│   ├── hero/                  # Desktop & mobile video clips + posters
│   ├── favicon.ico            # Site favicon
│   ├── logo.png / logo.webp   # Brand logos
│   └── robots.txt             # Search crawler instructions
├── src/
│   ├── assets/gallery/        # Optimized WebP gallery photographs
│   ├── components/            # Modular React UI components
│   │   ├── About.jsx          # Property description & owner credibility
│   │   ├── Amenities.jsx      # Grid of features (Water, Power, CCTV, etc.)
│   │   ├── AnimatedNumber.jsx # Count-up counter for statistics
│   │   ├── Contact.jsx        # Contact info & directions
│   │   ├── FAQ.jsx            # 2-column luxury FAQ accordion
│   │   ├── Footer.jsx         # Architectural footer & credits
│   │   ├── Gallery.jsx        # Photo grid & interactive lightbox modal
│   │   ├── Hero.jsx           # Top hero banner & primary action buttons
│   │   ├── HeroVideoPlayer.jsx# Dual-slot seamless video crossfader
│   │   ├── LanguageToggle.jsx # English / Hindi switcher
│   │   ├── Navigation.jsx     # Responsive navbar with mobile drawer
│   │   ├── Reviews.jsx        # Infinite circular testimonial marquee
│   │   ├── SectionHeading.jsx # Luxury jewelry-motif section divider
│   │   ├── Stats.jsx          # Key statistics banner
│   │   ├── ThemeToggle.jsx    # Dark / Light theme toggle
│   │   ├── TiltCard3D.jsx     # Interactive 3D micro-tilt effect
│   │   └── WhatsAppButton.jsx # Floating Red Call + Green WhatsApp CTAs
│   ├── config/
│   │   └── site.js            # Centralized site phone, map & developer config
│   ├── hooks/                 # Custom React hooks (theme, language)
│   ├── lib/
│   │   ├── translations.js    # Complete EN & HI translation dictionaries
│   │   └── utils.js           # ClassName helper utilities
│   ├── pages/
│   │   ├── Index.jsx          # Main landing page route
│   │   └── NotFound.jsx       # 404 error page
│   ├── App.jsx                # Application root & providers
│   ├── index.css              # Global styles, variables & Tailwind directives
│   └── main.jsx               # React DOM entry point
├── package.json               # Clean, minimal dependency manifest
└── vite.config.js             # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- [npm](https://www.npmjs.com/) (version 9.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aditya-kumar2004/NK-Sah-rental-house.git
   cd NK-Sah-rental-house/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal) to view the site.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📞 Property Information

- **Property**: NK Sah Rental House
- **Address**: Near City Montessori School, Chotkipatti, Bargaw, Bihar – 845401
- **Coordinates**: `27.096498° N, 84.154552° E`
- **Phone**: [+91 97712 33530](tel:+919771233530)
- **WhatsApp Support**: [+91 97712 33530](https://wa.me/919771233530) / [+91 70503 08555](https://wa.me/917050308555)

---

## 👨‍💻 Developer & Credits

- **Developer**: Aditya Kumar
- **Agency**: [Artifex Web](https://www.artifexweb.in/)
- **Email**: [aditykuma876@gmail.com](mailto:aditykuma876@gmail.com)

---

## 📄 License

© 2026 **NK Sah Rental House**. All rights reserved.
