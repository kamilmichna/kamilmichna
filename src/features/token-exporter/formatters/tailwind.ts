import type { DesignTokens } from '../../design-parser/types'

interface TailwindConfig {
  theme: {
    extend: Record<string, unknown>
  }
}

export function toTailwindConfig(tokens: DesignTokens): string {
  const config: TailwindConfig = {
    theme: {
      extend: {},
    },
  }

  const extend = config.theme.extend

  // Colors
  if (Object.keys(tokens.colors).length > 0) {
    extend.colors = tokens.colors
  }

  // Typography
  if (Object.keys(tokens.typography).length > 0) {
    const fontFamily: Record<string, string[]> = {}
    const fontSize: Record<string, [string, Record<string, string>]> = {}

    for (const [name, token] of Object.entries(tokens.typography)) {
      const familyName = token.fontFamily.toLowerCase().replace(/\s+/g, '-')
      if (!fontFamily[familyName]) {
        fontFamily[familyName] = [token.fontFamily]
      }

      fontSize[name] = [
        token.fontSize,
        {
          lineHeight: String(token.lineHeight),
          fontWeight: String(token.fontWeight),
          ...(token.letterSpacing ? { letterSpacing: token.letterSpacing } : {}),
        },
      ]
    }

    extend.fontFamily = fontFamily
    extend.fontSize = fontSize
  }

  // Spacing
  if (tokens.spacing && Object.keys(tokens.spacing).length > 0) {
    extend.spacing = tokens.spacing
  }

  // Border radius
  if (tokens.rounded && Object.keys(tokens.rounded).length > 0) {
    extend.borderRadius = tokens.rounded
  }

  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(config, null, 2)}`
}
