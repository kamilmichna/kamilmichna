import type { ReactNode } from 'react'
import type { DesignTokens } from '../design-parser/types'

interface PlaygroundContainerProps {
  tokens: DesignTokens
  children: ReactNode
}

function tokensToCssVars(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {}

  // Colors
  for (const [name, value] of Object.entries(tokens.colors)) {
    vars[`--color-${name}`] = value
  }

  // Typography
  for (const [name, token] of Object.entries(tokens.typography)) {
    vars[`--font-${name}-family`] = token.fontFamily
    vars[`--font-${name}-size`] = token.fontSize
    vars[`--font-${name}-weight`] = String(token.fontWeight)
    vars[`--font-${name}-line-height`] = String(token.lineHeight)
    if (token.letterSpacing) {
      vars[`--font-${name}-letter-spacing`] = token.letterSpacing
    }
  }

  // Spacing
  if (tokens.spacing) {
    for (const [name, value] of Object.entries(tokens.spacing)) {
      vars[`--spacing-${name}`] = String(value)
    }
  }

  // Rounded
  if (tokens.rounded) {
    for (const [name, value] of Object.entries(tokens.rounded)) {
      vars[`--rounded-${name}`] = value
    }
  }

  return vars
}

export default function PlaygroundContainer({ tokens, children }: PlaygroundContainerProps) {
  const cssVars = tokensToCssVars(tokens)

  return (
    <div
      className="playground-scope"
      style={cssVars as React.CSSProperties}
    >
      {children}
    </div>
  )
}
