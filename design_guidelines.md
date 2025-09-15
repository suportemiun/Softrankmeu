# Softrank Design Guidelines

## Design Approach
**Reference-Based Approach: Apple-Inspired**
Taking direct inspiration from Apple's design philosophy, focusing on minimalism, premium feel, and sophisticated interactions. The design emphasizes clean lines, generous whitespace, and subtle depth.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 0 0% 9% (deep charcoal, Apple-style dark)
- Secondary: 0 0% 25% (medium gray)
- Background: 0 0% 98% (off-white)
- Accent: 221 83% 53% (refined blue)

**Dark Mode:**
- Primary: 0 0% 98% (near white)
- Secondary: 0 0% 75% (light gray)
- Background: 0 0% 9% (deep charcoal)
- Accent: 221 83% 63% (brighter blue for dark mode)

### Typography
- **Primary Font:** SF Pro Display / Inter (Google Fonts CDN)
- **Secondary Font:** SF Pro Text / Inter for body text
- **Hierarchy:** Large, bold headlines (48px+), medium subheads (24px), clean body text (16px)
- **Weight Distribution:** Mix of light (300), regular (400), medium (500), and bold (700)

### Layout System
**Tailwind Spacing Primitives:** 4, 8, 12, 16, 24, 32
- Consistent use of p-8, m-12, gap-16 for major spacing
- Fine adjustments with p-4, m-4 for component-level spacing
- Large sectional spacing with py-24, py-32

### Component Library
**Navigation:** Clean header with subtle transparency effects
**Buttons:** Rounded corners (rounded-xl), solid primary and outline variants
**Cards:** Minimal borders, subtle shadows, rounded-2xl corners
**Calculator:** Clean input fields with focused states, real-time updates
**Forms:** Spacious inputs with clear labeling and validation states

## Visual Treatment

### Apple-Inspired Elements
- **Depth:** Subtle drop shadows and blur effects
- **Curves:** Consistent rounded corners throughout (8px, 12px, 24px)
- **Transparency:** Strategic use of backdrop blur on overlays
- **Spacing:** Generous whitespace following Apple's breathing room philosophy

### Content Strategy
**Landing Page Structure (4 sections max):**
1. **Hero Section:** Clean headline about professional League boosting with tier calculator preview
2. **Service Overview:** Three-column layout showcasing key benefits
3. **Calculator Demo:** Interactive pricing tool with live tier selection
4. **Trust Signals:** Booster profiles and success metrics

### Gradients
- **Hero Background:** Subtle gradient from 221 83% 53% to 240 100% 20% (blue to deep blue)
- **Card Accents:** Minimal gradients on calculator result displays
- **Button Treatments:** Subtle gradients on primary CTAs

## Images
**Hero Image:** Large background image showcasing League of Legends gameplay or abstract gaming elements, with blurred overlay for text readability

**Service Icons:** Clean, minimalist icons representing different tier levels and services

**Booster Profiles:** Professional headshots or gaming setup photos to build trust

**Calculator Visual:** Screenshot or illustration of the tier progression system

## Interaction Philosophy
Smooth, subtle animations following Apple's motion principles. Focus on purposeful micro-interactions that enhance usability without distraction. All hover states should be minimal and elegant.
