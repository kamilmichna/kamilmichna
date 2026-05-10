interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchInput({ value, onChange, placeholder = 'Search designs...' }: SearchInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="sb-input"
        style={{ paddingLeft: 'var(--space-lg)' }}
      />
      <svg
        style={{
          position: 'absolute',
          left: 'var(--space-sm)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          color: 'var(--color-outline)'
        }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}
