import type { DesignTokens } from '../../design-parser/types'

export function toCssVars(tokens: DesignTokens): string {
  const lines: string[] = [':root {']

  // Colors
  for (const [name, value] of Object.entries(tokens.colors)) {
    lines.push(`  --color-${name}: ${value};`)
  }

  // Typography
  for (const [name, token] of Object.entries(tokens.typography)) {
    lines.push(`  --font-${name}-family: ${token.fontFamily};`)
    lines.push(`  --font-${name}-size: ${token.fontSize};`)
    lines.push(`  --font-${name}-weight: ${token.fontWeight};`)
    lines.push(`  --font-${name}-line-height: ${token.lineHeight};`)
    if (token.letterSpacing) {
      lines.push(`  --font-${name}-letter-spacing: ${token.letterSpacing};`)
    }
  }

  // Spacing
  if (tokens.spacing) {
    for (const [name, value] of Object.entries(tokens.spacing)) {
      lines.push(`  --spacing-${name}: ${value};`)
    }
  }

  // Rounded
  if (tokens.rounded) {
    for (const [name, value] of Object.entries(tokens.rounded)) {
      lines.push(`  --rounded-${name}: ${value};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
