interface PlaygroundChipProps {
  variant?: 'default' | 'selected' | 'status'
  status?: 'published' | 'draft' | 'archived' | 'featured'
  onDelete?: () => void
  children: React.ReactNode
}

const chipStyles = {
  default: 'bg-transparent text-[var(--color-info)] border border-[var(--color-tertiary)]',
  selected: 'bg-[var(--color-primary)] text-[var(--color-secondary)] border border-[var(--color-primary)]',
  status: '',
}

const statusStyles = {
  published: 'bg-[var(--color-primary)] text-[var(--color-secondary)]',
  draft: 'bg-transparent text-[var(--color-info)] border border-[var(--color-tertiary)]',
  archived: 'bg-[var(--color-secondary)] text-[var(--color-tertiary)]',
  featured: 'bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)]',
}

export default function PlaygroundChip({
  variant = 'default',
  status,
  onDelete,
  children,
}: PlaygroundChipProps) {
  const baseStyle = 'inline-flex items-center h-7 px-3 text-xs font-medium uppercase tracking-wider'

  const style = variant === 'status' && status
    ? `${baseStyle} ${statusStyles[status]}`
    : `${baseStyle} ${chipStyles[variant]}`

  return (
    <span
      className={style}
      style={{ borderRadius: 'var(--rounded-none, 0px)' }}
    >
      {children}
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-2 hover:opacity-70"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  )
}
