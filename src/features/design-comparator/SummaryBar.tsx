interface SummaryBarProps {
  summary: {
    total: number
    added: number
    removed: number
    changed: number
    unchanged: number
  }
}

export default function SummaryBar({ summary }: SummaryBarProps) {
  return (
    <div className="label-caps" style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      padding: 'var(--space-sm) var(--space-md)',
      backgroundColor: 'var(--color-surface-container)',
      border: '1px solid var(--color-border)',
      fontSize: 'var(--font-label-caps-size)'
    }}>
      <span style={{
        color: 'var(--color-on-surface)'
      }}>
        {summary.total} tokens compared
      </span>
      {summary.added > 0 && (
        <span style={{ color: '#4ADE80' }}>+{summary.added} added</span>
      )}
      {summary.removed > 0 && (
        <span style={{ color: '#F87171' }}>-{summary.removed} removed</span>
      )}
      {summary.changed > 0 && (
        <span style={{ color: '#FBBF24' }}>~{summary.changed} changed</span>
      )}
      {summary.unchanged > 0 && (
        <span style={{ color: 'var(--color-outline)' }}>={summary.unchanged} unchanged</span>
      )}
    </div>
  )
}
