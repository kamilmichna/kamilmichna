---

name: Terminal Monolith
colors:
surface: '#131314'
surface-dim: '#131314'
surface-bright: '#393939'
surface-container-lowest: '#0d0e0e'
surface-container-low: '#1b1c1c'
surface-container: '#1f2020'
surface-container-high: '#292a2a'
surface-container-highest: '#343535'
on-surface: '#e4e2e2'
on-surface-variant: '#c4c7c8'
inverse-surface: '#e4e2e2'
inverse-on-surface: '#303031'
outline: '#8e9192'
outline-variant: '#444748'
surface-tint: '#c6c6c7'
primary: '#ffffff'
on-primary: '#2f3131'
primary-container: '#e2e2e2'
on-primary-container: '#636565'
inverse-primary: '#5d5f5f'
secondary: '#c9c6c5'
on-secondary: '#313030'
secondary-container: '#4a4949'
on-secondary-container: '#bab8b7'
tertiary: '#ffffff'
on-tertiary: '#313030'
tertiary-container: '#e5e2e1'
on-tertiary-container: '#656464'
error: '#ffb4ab'
on-error: '#690005'
error-container: '#93000a'
on-error-container: '#ffdad6'
primary-fixed: '#e2e2e2'
primary-fixed-dim: '#c6c6c7'
on-primary-fixed: '#1a1c1c'
on-primary-fixed-variant: '#454747'
secondary-fixed: '#e5e2e1'
secondary-fixed-dim: '#c9c6c5'
on-secondary-fixed: '#1c1b1b'
on-secondary-fixed-variant: '#474646'
tertiary-fixed: '#e5e2e1'
tertiary-fixed-dim: '#c8c6c5'
on-tertiary-fixed: '#1c1b1b'
on-tertiary-fixed-variant: '#474746'
background: '#131314'
on-background: '#e4e2e2'
surface-variant: '#343535'
typography:
headline-lg:
fontFamily: JetBrains Mono
fontSize: 24px
fontWeight: '700'
lineHeight: 32px
letterSpacing: -0.02em
headline-md:
fontFamily: JetBrains Mono
fontSize: 20px
fontWeight: '700'
lineHeight: 28px
letterSpacing: -0.01em
body-lg:
fontFamily: JetBrains Mono
fontSize: 16px
fontWeight: '400'
lineHeight: 24px
letterSpacing: 0em
body-md:
fontFamily: JetBrains Mono
fontSize: 14px
fontWeight: '400'
lineHeight: 20px
letterSpacing: 0em
code-sm:
fontFamily: JetBrains Mono
fontSize: 12px
fontWeight: '400'
lineHeight: 18px
letterSpacing: 0em
label-caps:
fontFamily: JetBrains Mono
fontSize: 11px
fontWeight: '700'
lineHeight: 16px
letterSpacing: 0.05em
spacing:
unit: 4px
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
gutter: 1px
Brand & Style
The design system is rooted in Neo-Brutalism and technical minimalism. It is designed for high-performance developer environments where clarity, speed, and focus are paramount. The aesthetic rejects decorative softness in favor of a rigid, grid-based structure that mirrors the logic of source code.
The personality is uncompromisingly industrial and precise. By utilizing a binary color palette and sharp geometric boundaries, the design system creates a low-distraction environment that emphasizes content over container. It evokes the feeling of a high-end command-line interface, providing a sense of authority and technical depth.
Colors
The palette is strictly achromatic. The foundation is built on Pure Black (#000000) for the primary canvas to maximize OLED efficiency and contrast.
Deep Charcoal (#0D0D0D) and Obsidian (#1A1A1A) provide structural layering. Interaction logic follows a binary state: Stark White (#FFFFFF) represents action, focus, and presence, while a scale of Slate Grays handles secondary information and inactive states. No blue, green, or red accents are permitted for branding; semantic colors for errors or warnings should rely on high-contrast patterns or inverted monochrome blocks before introducing hue.
Typography
This design system utilizes JetBrains Mono exclusively across all levels. This maintains a consistent mathematical rhythm and honors the developer-centric nature of the tool.
Hierarchy is established through weight and case rather than complex size scaling. Use `label-caps` for table headers and section titles to create a distinctive mechanical feel. All text must maintain a minimum contrast ratio of 7:1 against its immediate background.
Layout & Spacing
The layout follows a strict 4px baseline grid. Elements are separated by 1px borders rather than wide gutters to maximize information density.
The system uses a fixed-fluid hybrid grid: Sidebars and inspector panels occupy fixed widths (typically 240px or 320px) while the primary code/content editor expands to fill the remaining viewport. Spacing between interactive elements is kept tight (8px to 16px) to emulate the compact nature of a professional IDE.
Elevation & Depth
Elevation is conveyed through Obsidian (#1A1A1A) surfaces and 1px solid white borders. Shadow effects are prohibited.
Higher elevation is indicated by increased border weight or a shift from `background_base` to `surface_obsidian`. When a modal or popover is required, it should be rendered with a 1px white border and a 100% opaque black background to physically "cut" through the underlying UI layers.
Shapes
All UI elements—including buttons, inputs, cards, and windows—feature a 0px border-radius. Sharp corners reinforce the precision-tooled aesthetic and allow for seamless tiling of components without visual gaps.
Components
Buttons
Primary: Solid White background with Pure Black text. 0px radius.
Secondary: Transparent background, 1px White border, White text.
Ghost: Transparent background, Slate Gray text. Turns White on hover.
Inputs
Field: Obsidian background, 1px border (#333333). When focused, the border becomes 1px Solid White.
Caret: Always White, non-blinking or high-frequency blink.
Data Tables
Header cells use `label-caps` typography with a bottom 1px white border.
Row hover states use a Deep Charcoal (#0D0D0D) background fill.
Vertical dividers are 1px and Slate Gray (#333333).
Status Indicators
Use glyphs (symbols) instead of colors where possible.
Active state: Inverted block (White background, Black icon).
Inactive state: Slate Gray stroke.
Scrollbars
Minimalist 4px wide bars. Track is Pure Black, thumb is Slate Gray. No rounded ends.
