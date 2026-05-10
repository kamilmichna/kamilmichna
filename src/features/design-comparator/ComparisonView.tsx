import type { ComparisonResult, TokenComparison } from './compare'

interface ComparisonViewProps {
  result: ComparisonResult
}

const statusColors = {
  added: { bg: '#0D2818', border: '#22C55E', text: '#4ADE80' },
  removed: { bg: '#2D0D0D', border: '#EF4444', text: '#F87171' },
  changed: { bg: '#2D240D', border: '#F59E0B', text: '#FBBF24' },
  unchanged: { bg: 'var(--color-surface-container)', border: 'var(--color-border)', text: 'var(--color-outline)' },
}

const statusLabels = {
  added: '+ Added',
  removed: '- Removed',
  changed: '~ Changed',
  unchanged: '= Unchanged',
}

function ComparisonRow<T>({ item }: { item: TokenComparison<T> }) {
  const colors = statusColors[item.status]
  return (
    <div style={{
      padding: 'var(--space-sm) var(--space-md)',
      fontSize: 'var(--font-code-sm-size)',
      backgroundColor: colors.bg,
      borderLeft: `2px solid ${colors.border}`
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        color: 'var(--color-on-surface)'
      }}>
        {item.key}
      </span>
      <span style={{
        marginLeft: 'var(--space-sm)',
        fontSize: 'var(--font-code-sm-size)',
        color: colors.text
      }}>
        {statusLabels[item.status]}
      </span>
      {item.oldValue !== undefined && (
        <span style={{
          marginLeft: 'var(--space-sm)',
          color: 'var(--color-on-surface-variant)'
        }}>
          {typeof item.oldValue === 'object' ? JSON.stringify(item.oldValue) : String(item.oldValue)}
        </span>
      )}
      {item.status === 'changed' && item.newValue !== undefined && (
        <span style={{
          marginLeft: 'var(--space-sm)',
          color: colors.text
        }}>
          → {typeof item.newValue === 'object' ? JSON.stringify(item.newValue) : String(item.newValue)}
        </span>
      )}
    </div>
  )
}

export default function ComparisonView({ result }: ComparisonViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {result.colors.length > 0 && (
        <div>
          <h3 className="label-caps" style={{
            fontSize: 'var(--font-label-caps-size)',
            color: 'var(--color-on-surface)',
            marginBottom: 'var(--space-sm)'
          }}>
            Colors
          </h3>
          <div style={{
            border: '1px solid var(--color-border)'
          }}>
            {result.colors.map((item) => (
              <ComparisonRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      )}

      {result.typography.length > 0 && (
        <div>
          <h3 className="label-caps" style={{
            fontSize: 'var(--font-label-caps-size)',
            color: 'var(--color-on-surface)',
            marginBottom: 'var(--space-sm)'
          }}>
            Typography
          </h3>
          <div style={{
            border: '1px solid var(--color-border)'
          }}>
            {result.typography.map((item) => (
              <ComparisonRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      )}

      {result.spacing.length > 0 && (
        <div>
          <h3 className="label-caps" style={{
            fontSize: 'var(--font-label-caps-size)',
            color: 'var(--color-on-surface)',
            marginBottom: 'var(--space-sm)'
          }}>
            Spacing
          </h3>
          <div style={{
            border: '1px solid var(--color-border)'
          }}>
            {result.spacing.map((item) => (
              <ComparisonRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
