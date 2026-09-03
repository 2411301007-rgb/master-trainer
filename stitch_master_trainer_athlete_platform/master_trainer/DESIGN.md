---
name: Master Trainer
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#8c90a1'
  outline-variant: '#424656'
  surface-tint: '#b3c5ff'
  primary: '#b3c5ff'
  on-primary: '#002b75'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#0054d6'
  secondary: '#d7ffc5'
  on-secondary: '#053900'
  secondary-container: '#2ff801'
  on-secondary-container: '#0f6d00'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#707272'
  on-tertiary-container: '#f8f8f8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#79ff5b'
  secondary-fixed-dim: '#2ae500'
  on-secondary-fixed: '#022100'
  on-secondary-fixed-variant: '#095300'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
---

## Brand & Style
The design system is engineered for elite performance, blending a "Dark Mode" aesthetic with high-energy accents to evoke the atmosphere of a premium, high-tech training facility. The style is **Corporate Modern** with **High-Contrast** elements, focusing on clarity, speed, and precision.

The target audience ranges from professional athletes to dedicated beginners who value a structured, data-driven approach to fitness. The UI should feel "fast" and responsive, utilizing deep backgrounds to make metrics and progress data pop with cinematic intensity.

## Colors
The palette is centered on a high-performance **Dark Navy/Black base (#0A0A0F)** to reduce visual fatigue and emphasize data. 

- **Primary (Electric Blue):** Used for primary actions, active states, and critical brand moments.
- **Secondary (Bright Green):** Specifically reserved for success states, progress rings, "Start" buttons, and positive performance deltas.
- **Surface:** A slightly lighter charcoal-navy is used for cards and containers to create depth against the pure black background.
- **Typography:** Pure white is used for headlines to maximize contrast, while a muted grey (#A0A0AB) is used for secondary body text.

## Typography
The system uses a dual-font strategy to balance character with utility. 

**Montserrat** is used for headings, utilizing its geometric, bold weights to command attention and convey strength. For display sizes, tight letter spacing and heavy weights are preferred.

**Inter** is used for all functional text, body copy, and UI labels. Its high x-height ensures legibility when tracking complex workout metrics or reading instructional text in low-light environments. Uppercase labels with slight tracking are used for metadata to create a "technical" feel.

## Layout & Spacing
This design system utilizes a **Fluid Grid** model with an 8px spacing rhythm. 

- **Desktop:** 12-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px gutters and 20px side margins.

Content should feel airy yet structured. Use large vertical padding (40px+) between major sections to emphasize the premium nature of the content. Cards should utilize consistent internal padding of 24px to maintain a spacious, high-end feel.

## Elevation & Depth
In this dark UI, elevation is communicated through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Level 0 (Background):** #0A0A0F.
- **Level 1 (Cards/Containers):** #16161E with a 1px solid border of #272732.
- **Level 2 (Hover/Active states):** A subtle outer glow using the Primary Electric Blue (low opacity) can be used to signify interactivity.

Avoid traditional drop shadows; instead, use background blurs for modals and overlays to maintain the "Glassmorphism" influence while keeping the interface grounded and professional.

## Shapes
A **Rounded** shape language is used to make the "elite" aesthetic feel accessible. All primary containers and cards use a 16px (1rem) corner radius.

Buttons and progress chips use a fully rounded (Pill-shaped) style to contrast against the structured rectangular grid of the dashboard. This mix of sharp grid alignment and rounded internal elements creates a modern, athletic look.

## Components
- **Buttons:** Primary buttons are pill-shaped, using the Electric Blue background with white bold text. Secondary buttons should be "Ghost" style with white outlines.
- **Cards:** Utilize a subtle linear gradient (Top-Left to Bottom-Right) from #1C1C26 to #16161E to add a premium sheen.
- **Inputs:** Dark backgrounds (#0A0A0F) with a 1px border. On focus, the border transitions to Electric Blue with a subtle outer glow.
- **Progress Bars:** Use a thick 8px stroke. The background track is dark (#272732), and the indicator is the Bright Green (#39FF14).
- **Data Visualizations:** Charts should use semi-transparent area fills beneath Electric Blue lines to create a "glowing" effect on the dark canvas.
- **Chips:** Small, pill-shaped tags used for workout categories (e.g., "HIIT", "STRENGTH") with a low-opacity background tint of the primary color.