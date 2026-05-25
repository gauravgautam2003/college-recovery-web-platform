---
name: College Discovery Engine
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is engineered for a premium, AI-native educational platform. The brand personality is **reliable**, **visionary**, and **highly structured**, bridging the gap between a prestigious academic institution and a cutting-edge technology startup.

The visual style follows a **Corporate / Modern** aesthetic with subtle **Glassmorphism** accents. It prioritizes clarity and data density while maintaining an inviting atmosphere through generous whitespace and soft architectural depth. The user experience should feel intelligent and effortless, evoking a sense of confidence in the AI-driven recommendations.

## Colors

The color palette is anchored by a deep **Indigo** primary for core brand actions and a **Blue** secondary for secondary UI elements, creating a trustworthy, professional foundation. **Cyan** serves as a high-energy accent color, reserved for AI-enhanced features and special highlights.

The neutral scale utilizes **Slate** tones to ensure text remains legible and borders appear crisp without being harsh. Surfaces should primarily use the light neutral gray (#F9FAFB) to reduce eye strain during long research sessions. For the dark mode implementation, the system shifts to a deep navy foundation (#020617) to maintain the premium, tech-forward feel.

## Typography

This design system utilizes **Geist** for its technical precision and modern, minimal character. The typographic scale is designed for high-information environments, emphasizing a strong hierarchy.

- **Headlines:** Use heavy weights (600+) with tight letter-spacing to command attention.
- **Body Copy:** Set at 16px for optimal readability. Use the `body-sm` (14px) for denser data-heavy tables and metadata.
- **Labels:** Uppercase labels with increased letter-spacing should be used for category tags and small headers above input groups.
- **AI Interactions:** Use `body-lg` for AI-generated summaries to give them a distinct, readable prominence.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. All spatial relationships are governed by a **4px/8px base increments**, ensuring mathematical harmony across the UI.

- **Margins & Gutters:** Desktop uses 32px margins and 24px gutters. On mobile, margins reduce to 16px to maximize content area.
- **Sectioning:** Use `2xl` (48px) or `3xl` (64px) vertical spacing to separate major content blocks like "University Overview" from "Admissions Data."
- **Data Grouping:** Use `sm` (8px) for related elements (e.g., an icon and its text label) and `md` (16px) for distinct items within a list.

## Elevation & Depth

Visual hierarchy is established through a combination of **tonal layering** and **soft, multi-layered shadows**.

- **Surface Levels:** The background sits at `z-0`. Cards and primary containers sit at `z-10` with a subtle Slate-200 border. Floating elements (modals, dropdowns) sit at `z-20+`.
- **Shadow Character:** Shadows are extremely diffused with low opacity (4-8%), using a slight Indigo tint in the dark mode to maintain depth. 
- **Glassmorphism:** Navigation bars and sticky headers utilize a 12px backdrop blur with a 60% opacity white fill (or 60% Slate-900 in dark mode) to maintain context of the content scrolling beneath.

## Shapes

The shape language is sophisticated and approachable, characterized by significant corner rounding that balances the technical nature of the Geist typeface.

- **Main Cards:** Use `2xl` (24px) for university profile cards and major dashboard widgets.
- **Modals/Overlays:** Use `3xl` (32px) to give large surfaces a soft, premium feel.
- **Buttons & Inputs:** Use `lg` (12px) for a modern, slightly rounded but professional appearance.
- **Chips/Badges:** Use a full "pill" radius for status indicators and filter tags.

## Components

### Buttons
- **Primary:** Solid Indigo (#4F46E5) with white text. 12px radius. 
- **Secondary:** Outline Blue (#3B82F6) with 1px border.
- **Ghost:** Cyan (#06B6D4) text with no background, turning into a subtle cyan tint on hover. Reserved for AI-suggested actions.

### Cards
- White background, Slate-200 1px border, and "Medium" elevation shadow. 
- Padding: 24px internal spacing (lg).

### Input Fields
- Slate-50 background with a 1px Slate-200 border. On focus, border transitions to Indigo with a soft Indigo outer glow (4px spread).

### Navigation Bar
- Glassmorphic finish (60% opacity) with a 1px bottom border in Slate-100. Height fixed at 72px.

### Data Tables
- Header row uses `label-md` typography with a subtle Slate-50 background. 
- Rows use 1px horizontal dividers only; no vertical lines.

### Chips & Badges
- Small, uppercase text. Success, Warning, and Error variants use "Subtle" background styles (10% opacity of the base color) for a sophisticated look.