# Design Documentation - AgriAstra UI/UX

## 1. Design Philosophy: "Premium Nature"
The visual identity of AgriAstra combines the traditional roots of Indian agriculture with the precision of high-tech digital systems.

- **Color Palette:** 
  - *Forest Green (#064E3B):* Represents growth, heritage, and stability.
  - *Bharat Gold (#C29243):* Represents value, prosperity, and the harvest.
  - *Emerald Glow:* Soft light green accents for active AI processes.
- **Typography:**
  - *Fraunces (Serif):* Used for headings to provide a "sovereign" and trustworthy editorial feel.
  - *Outfit (Sans):* Used for technical data and interface elements for maximum readability.

## 2. Architectural Overview
The application is built as a single-page application (SPA) using **React 19** and **Tailwind CSS**.

### 2.1 The Intelligence Layer (Gemini Service)
- **Fast Mode:** Uses `gemini-3-flash-preview` for instant UI feedback.
- **Deep Thinking:** Uses `gemini-3-pro-preview` for complex agronomic reasoning.
- **Search Grounding:** Integrated `googleSearch` tool for real-time market discovery.

### 2.2 State Management
- **AgriStore:** A custom local-storage based persistence layer simulating a national registry.
- **LanguageContext:** A global provider for real-time vernacular localization.

## 3. UI Components Structure
- **Global Header:** Responsive navigation with a collapsible professional sidebar for mobile.
- **Premium Cards:** High-elevation containers with glassmorphism effects for data display.
- **Dashboard Modules:**
  - *Telemetry Tickers:* Real-time weather and market price widgets.
  - *Action Intelligence:* High-priority "Critical Decision" cards.
  - *Lifecycle Timeline:* Interactive SVG-based crop growth tracking.

## 4. Interaction Patterns
- **AI Sidebar:** A persistent chat widget that follows the user across the portal.
- **Animated Reveals:** Using intersection observers to reveal data smoothly as the user scrolls.
- **Interactive Modeling:** Real-time ROI calculation in the Munafa Estimator via reactive state.

## 5. Mobile Experience
A dedicated "Drawer" style sidebar replaces traditional menus, providing a clear "Operating Mode" indicator (Farmer vs. Business) and easy access to localized settings.
