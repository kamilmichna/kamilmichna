interface DesignOption {
  id: string
  name: string
}

interface DesignSelectorProps {
  designs: DesignOption[]
  value: string | null
  onChange: (id: string | null) => void
  label: string
}

export default function DesignSelector({ designs, value, onChange, label }: DesignSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
      <label className="label-caps" style={{
        fontSize: 'var(--font-label-caps-size)',
        color: 'var(--color-outline)'
      }}>
        {label}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="sb-input"
        style={{ width: '240px' }}
      >
        <option value="">Select a design...</option>
        {designs.map((design) => (
          <option key={design.id} value={design.id}>
            {design.name}
          </option>
        ))}
      </select>
    </div>
  )
}
