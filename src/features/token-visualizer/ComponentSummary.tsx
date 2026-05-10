interface ComponentSummaryProps {
  tokens: Record<string, Record<string, string>>
}

export default function ComponentSummary({ tokens }: ComponentSummaryProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {Object.entries(tokens).map(([componentName, properties]) => (
        <div key={componentName} className="sb-card" style={{ padding: 'var(--space-md)' }}>
          <h4 className="label-caps" style={{
            fontSize: 'var(--font-label-caps-size)',
            color: 'var(--color-on-surface)',
            marginBottom: 'var(--space-md)'
          }}>
            {componentName}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {Object.entries(properties).map(([prop, value]) => (
              <div key={prop} style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 'var(--font-code-sm-size)'
              }}>
                <span style={{
                  width: '128px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-outline)'
                }}>
                  {prop}
                </span>
                <span style={{ color: 'var(--color-on-surface)' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
