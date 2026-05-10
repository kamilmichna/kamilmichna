interface SpacingScaleProps {
  tokens: Record<string, string | number>
}

function parsePixelValue(value: string | number): number {
  if (typeof value === 'number') return value
  const match = value.match(/^(\d+(?:\.\d+)?)(px|rem|em)?$/)
  if (!match) return 0
  const num = parseFloat(match[1])
  const unit = match[2] || 'px'
  if (unit === 'rem' || unit === 'em') return num * 16
  return num
}

export default function SpacingScale({ tokens }: SpacingScaleProps) {
  const maxValue = Math.max(...Object.values(tokens).map(parsePixelValue))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {Object.entries(tokens).map(([name, value]) => {
        const px = parsePixelValue(value)
        const percentage = maxValue > 0 ? (px / maxValue) * 100 : 0
        const label = typeof value === 'number' ? `${value} (unitless)` : value

        return (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="label-caps" style={{
              width: '96px',
              fontSize: 'var(--font-label-caps-size)',
              color: 'var(--color-outline)'
            }}>
              {name}
            </div>
            <div style={{
              flex: 1,
              height: '24px',
              backgroundColor: 'var(--color-surface-container-high)',
              border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: 'var(--color-primary)'
                }}
              />
            </div>
            <div style={{
              width: '80px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-code-sm-size)',
              color: 'var(--color-outline)',
              textAlign: 'right'
            }}>
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
