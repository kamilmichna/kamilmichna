---
version: alpha
name: StudioBlank
description: Ultra-minimal design system for photographer and visual artist portfolios
colors:
  primary: "#0A0A0A"
  secondary: "#FAFAFA"
  tertiary: "#D4D4D8"
  surface-base: "#FAFAFA"
  surface-inverse: "#0A0A0A"
  success: "#16A34A"
  warning: "#CA8A04"
  error: "#DC2626"
  info: "#71717A"
typography:
  text-hero:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
  text-h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
  text-h2:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
  text-h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  text-body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.65
  text-body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  text-caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  text-mono:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 16px
  space-4: 32px
  space-5: 48px
  space-6: 64px
  space-8: 96px
  space-10: 128px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.none}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    rounded: "{rounded.none}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.none}"
---

## Overview

StudioBlank is an ultra-minimal design system where whitespace is the primary design feature. Built for photographer and visual artist portfolios, every UI element recedes so the work itself commands attention. The system uses no shadows, no border radius, and a monochromatic palette with weight contrast in a single type family. Geometry is pure, grids are strict, and ornamentation is entirely absent.

## Colors

The palette is strictly monochromatic with functional accent colors for status only.

- **Primary (#0A0A0A):** Near-black used for all primary text, actions, and interactive elements. The anchor of the entire system.
- **Secondary (#FAFAFA):** Off-white for backgrounds and inverse surfaces. Provides the canvas for imagery.
- **Tertiary (#D4D4D8):** Mid-gray for subtle dividers, borders, and de-emphasized elements.
- **Surface Base (#FAFAFA):** Page background — the gallery canvas.
- **Surface Inverse (#0A0A0A):** Dark sections, footers, and overlay backgrounds.
- **Success (#16A34A):** Upload complete states only.
- **Warning (#CA8A04):** Storage warnings only.
- **Error (#DC2626):** Validation errors only.
- **Info (#71717A):** Informational notes and helper text.

## Typography

The system uses a single type family — Inter — with weight contrast (300 light vs 700 bold) to establish hierarchy. IBM Plex Mono is reserved for technical metadata.

- **Hero:** Inter 64px Bold, 1.05 line height — Statement headlines only.
- **H1:** Inter 40px Bold, 1.1 line height — Page titles.
- **H2:** Inter 28px Semibold, 1.2 line height — Section headers.
- **H3:** Inter 20px Semibold, 1.3 line height — Subsection headers.
- **Body:** Inter 16px Light, 1.65 line height — Long-form text, descriptions.
- **Body Small:** Inter 14px Regular, 1.6 line height — Secondary text, form labels.
- **Caption:** Inter 12px Regular, 1.5 line height — Metadata, timestamps.
- **Mono:** IBM Plex Mono 13px Regular, 1.5 line height — File names, technical data.

## Spacing

Base unit: 16px. Very generous spacing creates openness and directs focus to imagery.

- **space-1 (4px):** Tight inline gaps.
- **space-2 (8px):** Icon-to-label spacing.
- **space-3 (16px):** Standard element gap.
- **space-4 (32px):** Between grouped elements.
- **space-5 (48px):** Section inner padding.
- **space-6 (64px):** Between sections.
- **space-8 (96px):** Major page-level divisions.
- **space-10 (128px):** Hero top/bottom margins.

## Elevation

No shadows are used in StudioBlank. The system is completely flat. Depth is communicated exclusively through layering, spacing, and border contrast. Focus states use a 2px border offset rather than a box-shadow ring.

## Shapes

All components use 0px corners. No rounding is applied anywhere. Pure geometric edges define every surface, button, card, and input. The shape language is architectural rigidity — rectangles within rectangles, no curves, no softness.

## Components

### Buttons

All buttons are sharp-edged rectangles with no border-radius. Hover is communicated through background inversion.

- **Primary:** #0A0A0A fill, #FAFAFA text, no border.
- **Secondary:** transparent fill, #0A0A0A text, 1px #0A0A0A border.
- **Ghost:** transparent fill, #0A0A0A text, no border.
- **Destructive:** #DC2626 fill, #FAFAFA text, no border.

Sizes: Small (32px height, 16px padding, 12px font, 64px min-width), Medium (40px, 24px, 14px, 96px), Large (48px, 32px, 16px, 128px). Disabled state: 0.3 opacity, disabled cursor. No hover transitions.

### Cards

#FFFFFF fill, 1px #E5E5E5 border, square, 0px padding, no shadow. Hover: Border shifts to #0A0A0A. Image cards have zero padding; the image is the card. Caption metadata sits below with space-3 gap.

### Inputs

Default: #D4D4D8 border, #FFFFFF fill, no shadow. Hover: #A1A1AA border. Focus: #0A0A0A border. Error: #DC2626 border. Disabled: #E5E5E5 border, #F4F4F5 fill. 1px border (bottom border only variant available), 0px border radius, 40px tall, 14px Inter 400. Focus: 2px #0A0A0A border.

### Chips

**Filter Chips:** Default: transparent fill, #71717A text, 1px #D4D4D8 border. Selected: #0A0A0A fill, #FAFAFA text, 1px #0A0A0A border. Hover: #F4F4F5 fill, #0A0A0A text, 1px #A1A1AA border.

**Status Chips:** Published: #0A0A0A fill, #FAFAFA text. Draft: transparent fill, #71717A text, 1px #D4D4D8 border. Archived: #F4F4F5 fill, #A1A1AA text. Featured: transparent fill, #0A0A0A text, 1px #0A0A0A border.

All chips: 0px border radius, 12px Inter 400 uppercase tracking 0.05em, 28px tall.

### Lists

48px row height, 16px horizontal padding, 1px #F4F4F5 divider, #F4F4F5 hover background, #0A0A0A with white text active background, square, 14px Inter 400.

### Checkboxes

Unchecked: #FFFFFF fill, 1px #D4D4D8 border. Checked: #0A0A0A fill, 1px #0A0A0A border, #FAFAFA checkmark. Disabled: #F4F4F5 fill, 1px #E5E5E5 border, #A1A1AA checkmark. 18px, 0px border radius. Focus: 2px #0A0A0A offset 2px.

### Radio Buttons

Unselected: #FFFFFF fill, 1px #D4D4D8 border. Selected: #FFFFFF fill, 1px #0A0A0A border, #0A0A0A dot. Disabled: #F4F4F5 fill, 1px #E5E5E5 border, #A1A1AA dot. 18px, 8px dot diameter. Focus: 2px #0A0A0A offset 2px.

### Tooltips

#0A0A0A fill, #FAFAFA text, 12px Inter 400, 8px 12px padding, square, 200px max width, 6px triangle arrow, 200ms show, 0ms hide delay, no shadow.

## Do's and Don'ts

1. **Do** let images speak — the portfolio work is the design, not the interface.
2. **Don't** add decorative elements such as gradients, patterns, or ornamental shapes.
3. **Do** use generous margins (minimum 64px between major sections) to create visual breathing room.
4. **Don't** introduce more than one accent color across the entire site. Monochrome is the identity.
5. **Do** keep UI chrome to an absolute minimum — navigation should nearly disappear.
6. **Don't** use rounded corners, shadows, or any depth effect. The system is strictly flat and geometric.
7. **Do** use weight contrast within Inter (300 vs 700) to establish hierarchy instead of size alone.
8. **Don't** overlay text on images unless absolutely necessary — image integrity is paramount.
9. **Do** prioritize loading performance; lazy-load gallery images with simple fade-in transitions.
10. **Don't** use animations or transitions longer than 200ms. Movement should be barely perceptible.
