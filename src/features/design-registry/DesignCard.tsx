import type { DesignEntry } from './state'

interface DesignCardProps {
  design: DesignEntry
  onClick: () => void
}

export default function DesignCard({ design, onClick }: DesignCardProps) {
  const primaryColor = design.tokens?.colors?.primary || '#ffffff'

  return (
    <div
      className="sb-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        transition: 'border-color 0.1s ease'
      }}
    >
      <div style={{
        height: '120px',
        backgroundColor: primaryColor,
        borderBottom: '1px solid var(--color-border)'
      }} />
      <div style={{ padding: 'var(--space-md)' }}>
        <h3 className="label-caps" style={{
          fontSize: 'var(--font-body-md-size)',
          color: 'var(--color-on-surface)',
          marginBottom: 'var(--space-xs)'
        }}>
          {design.name}
        </h3>
        {design.tokens?.description && (
          <p style={{
            fontSize: 'var(--font-code-sm-size)',
            color: 'var(--color-outline)',
            lineHeight: 'var(--font-code-sm-line-height)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {design.tokens.description}
          </p>
        )}
        <div style={{
          display: 'flex',
          gap: 'var(--space-xs)',
          marginTop: 'var(--space-sm)',
          flexWrap: 'wrap'
        }}>
          {Object.entries(design.tokens?.colors || {}).slice(0, 6).map(([name, hex]) => (
            <div
              key={name}
              title={`${name}: ${hex}`}
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: hex,
                border: '1px solid var(--color-border)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
