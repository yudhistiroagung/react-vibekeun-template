---
name: Monolithic Focus
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  stats-mono:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1'
spacing:
  unit: 8px
  container-padding: 32px
  element-gap: 16px
  section-gap: 64px
  gutter: 24px
---

## Brand & Style

The design system is rooted in **Strict Minimalism**, prioritizing utility and cognitive clarity for distraction-free goal tracking. The aesthetic is "Monolithic"—defined by high-contrast monochrome values, architectural lines, and an uncompromising rejection of decorative flourish. 

The target audience consists of high-performers and minimalists who value an offline-first, private environment. The UI evokes a sense of **authority, precision, and permanence**, treating user goals as sacred data points within a clean, digital ledger. There are no gradients, no soft blurs, and no organic shapes; every element is intentional, sharp, and functional.

## Colors

The palette is strictly limited to five values to ensure maximum contrast and zero visual noise. 

- **Pure Black (#000000):** Used for primary text, borders, and high-emphasis button states.
- **Pure White (#FFFFFF):** The primary surface color, providing a clean slate for focus.
- **Off-White (#F5F5F5):** Used for subtle section nesting and secondary backgrounds to differentiate from the primary canvas.
- **Light Gray (#E5E5E5):** Reserved for disabled states and non-interactive decorative lines.
- **Deep Gray (#737373):** Used for secondary metadata and supportive text.

Interactive elements only use Black and White. State changes are communicated through color inversion (e.g., White text on Black background) rather than hue shifts.

## Typography

This design system utilizes **Geist** for its technical precision and humanist clarity. The typographic hierarchy is aggressive to ensure information density remains readable.

- **Headings:** Set in bold weights with tight letter-spacing to create a "blocky," structural feel.
- **Body Text:** Optimized for legibility with generous line-height.
- **Stats:** All numerical goal tracking must use the `stats-mono` role, which employs **tabular numbers** to ensure columns of figures align perfectly, aiding in quick scanning.
- **Labels:** Small-caps are used for auxiliary information to distinguish it from interactive body text without needing color.

## Layout & Spacing

The layout follows a **Strict Fixed Grid** philosophy. On desktop, content is centered within a 12-column grid with a maximum width of 1200px. On mobile, it collapses to a single column with rigorous 24px side margins.

Spacing is based on an **8px linear scale**.
- **Generous Whitespace:** Sections are separated by large gaps (64px+) to prevent the high-contrast borders from feeling cluttered.
- **Alignment:** All elements must align to the outer stroke of the 1px border.
- **Information Density:** While whitespace is generous between sections, internal component padding is tight (12px to 16px) to maintain a functional, "tool-like" feel.

## Elevation & Depth

This design system is **entirely flat**. Visual hierarchy is achieved through structural layering and linework rather than shadows or blurs.

- **Borders:** A universal 1px solid black border defines all containers.
- **Tonal Layers:** Depth is suggested by placing #FFFFFF cards on a #F5F5F5 background.
- **Hard Inversion:** Active or focused states are indicated by "punching out" the element—flipping a white container with black text to a black container with white text.
- **Zero Shadows:** No box-shadows or ambient occlusions are permitted. If a floating element (like a modal) is required, it is bounded by a heavy 2px black border to separate it from the content below.

## Shapes

The shape language is **Sharp**. All corners are set to 0px radius. This reinforces the "strict" and "monolithic" nature of the design. 

The use of 90-degree angles ensures that the 1px borders align perfectly with the pixel grid, preventing any anti-aliasing blur and maintaining the highest possible visual crispness. Every button, card, and input field is a perfect rectangle.

## Components

### Buttons
- **Primary:** Black background, White text, 0px radius, 1px black border.
- **Secondary:** White background, Black text, 1px black border.
- **Interaction:** On hover, the Primary button's border thickens to 2px; the Secondary button inverts its colors.

### Cards
- White background, 1px black border, 0px radius.
- Headers within cards are separated by a 1px black horizontal rule.
- No internal shadows or rounded corners.

### Input Fields & Checkboxes
- **Inputs:** White background, 1px black border. Text is Geist 14px. Focus state is indicated by a 2px black border.
- **Checkboxes:** 16px x 16px sharp squares. When checked, the square is filled solid black with a white "X" or checkmark.

### Sliders
- **Track:** 1px solid black horizontal line.
- **Thumb:** A solid 12px x 12px black square.
- **Progress:** A 4px black bar overlaying the 1px track to show the filled portion.

### Lists
- Items are separated by 1px gray (#E5E5E5) lines.
- Active items use a 1px black border and a small black rectangle indicator on the left margin.

### Progress Trackers
- Grid-based "Commitment Maps" (similar to GitHub contribution graphs) using grayscale blocks: White (0%), Light Gray (25%), Medium Gray (50%), Dark Gray (75%), and Black (100%).