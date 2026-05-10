interface RoundedScaleProps {
  tokens: Record<string, string>
}

export default function RoundedScale({ tokens }: RoundedScaleProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xl)' }}>
      {Object.entries(tokens).map(([name, value]) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: value,
              marginBottom: 'var(--space-sm)',
              border: '1px solid var(--color-border)'
            }}
          />
          <div className="label-caps" style={{
            fontSize: 'var(--font-label-caps-size)',
            color: 'var(--color-on-surface)'
          }}>
            {name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--font-code-sm-size)',
            color: 'var(--color-outline)'
          }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}
