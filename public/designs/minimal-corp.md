---
version: alpha
name: Minimal Corp
description: Professional corporate design system with clean lines and muted tones
colors:
  primary: "#1E40AF"
  secondary: "#6B7280"
  tertiary: "#D1D5DB"
  surface-base: "#F9FAFB"
  surface-inverse: "#111827"
  success: "#059669"
  warning: "#D97706"
  error: "#DC2626"
  info: "#2563EB"
typography:
  text-hero:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
  text-h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
  text-h2:
    fontFamily: Inter
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
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 2px
  md: 4px
  lg: 8px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 16px
  space-4: 24px
  space-5: 32px
  space-6: 48px
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

Minimal Corp is a professional design system for enterprise applications. It uses a restrained color palette, clean typography, and subtle rounded corners to create trustworthy, efficient interfaces. The system prioritizes clarity and usability over visual flair.

## Colors

A professional blue-based palette with neutral grays:

- **Primary (#1E40AF):** Deep blue for primary actions and brand identity.
- **Secondary (#6B7280):** Neutral gray for secondary text and borders.
- **Tertiary (#D1D5DB):** Light gray for subtle dividers.
- **Surface Base (#F9FAFB):** Off-white backgrounds.
- **Surface Inverse (#111827):** Dark mode backgrounds.

## Typography

Inter provides excellent readability with a professional tone.

- **Hero:** Inter 48px Bold — Statement headlines.
- **H1:** Inter 32px Semibold — Page titles.
- **H2:** Inter 24px Semibold — Section headers.
- **Body:** Inter 16px Regular — Long-form text.
- **Caption:** Inter 12px Regular — Metadata.

## Spacing

A tight 4px base unit with controlled spacing for dense information layouts.

## Do's and Don'ts

1. **Do** use consistent spacing to create visual rhythm and hierarchy.
2. **Don't** use more than 2 font weights on a single screen.
3. **Do** maintain high contrast ratios for accessibility.
4. **Don't** use decorative elements that distract from content.
