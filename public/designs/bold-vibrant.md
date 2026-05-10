---
version: alpha
name: Bold Vibrant
description: Energetic design system with bright colors and playful typography
colors:
  primary: "#6366F1"
  secondary: "#EC4899"
  tertiary: "#14B8A6"
  surface-base: "#FFFFFF"
  surface-inverse: "#1F2937"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
  info: "#3B82F6"
typography:
  text-hero:
    fontFamily: Poppins
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
  text-h1:
    fontFamily: Poppins
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
  text-h2:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  text-body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  text-caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 16px
  space-4: 24px
  space-5: 32px
  space-6: 48px
  space-8: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    rounded: "{rounded.md}"
---

## Overview

Bold Vibrant is an energetic design system for creative applications. It uses bright, saturated colors and playful typography to create engaging user experiences. The system embraces rounded corners, gradients, and bold visual statements.

## Colors

The palette features three bold primary colors that create visual excitement:

- **Primary (#6366F1):** Electric indigo for main actions and focal points.
- **Secondary (#EC4899):** Hot pink for secondary actions and highlights.
- **Tertiary (#14B8A6):** Teal for success states and accents.
- **Surface Base (#FFFFFF):** Clean white backgrounds.
- **Surface Inverse (#1F2937):** Dark mode backgrounds.

## Typography

Poppins brings personality with its geometric forms, while Inter ensures readability.

- **Hero:** Poppins 56px Bold — Statement headlines.
- **H1:** Poppins 36px Semibold — Page titles.
- **H2:** Poppins 24px Semibold — Section headers.
- **Body:** Inter 16px Regular — Long-form text.
- **Caption:** Inter 12px Medium — Metadata.

## Spacing

A consistent 8px base unit with generous spacing between elements.

## Do's and Don'ts

1. **Do** use bold colors to create visual hierarchy and guide attention.
2. **Don't** use more than 3 primary colors in a single view.
3. **Do** embrace rounded corners for a friendly, approachable feel.
4. **Don't** use sharp edges unless for specific emphasis.
