import type { TypographyToken } from '../design-parser/types'

interface TypographySampleProps {
  name: string
  token: TypographyToken
}

export default function TypographySample({ name, token }: TypographySampleProps) {
  return (
    <div style={{
      padding: 'var(--space-md) 0',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="label-caps" style={{
        fontSize: 'var(--font-label-caps-size)',
        color: 'var(--color-outline)',
        marginBottom: 'var(--space-sm)'
      }}>
        {name} — {token.fontFamily} {token.fontSize}/{token.fontWeight}
      </div>
      <div
        style={{
          fontFamily: token.fontFamily,
          fontSize: token.fontSize,
          fontWeight: token.fontWeight,
          lineHeight: token.lineHeight,
          letterSpacing: token.letterSpacing,
          color: 'var(--color-on-surface)'
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  )
}
