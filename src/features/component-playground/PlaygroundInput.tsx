import { type InputHTMLAttributes } from 'react'

interface PlaygroundInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: boolean
}

export default function PlaygroundInput({
  label,
  helperText,
  error = false,
  className = '',
  ...props
}: PlaygroundInputProps) {
  const borderColor = error
    ? 'var(--color-error)'
    : 'var(--color-tertiary)'

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
          {label}
        </label>
      )}
      <input
        className={`h-10 px-3 text-sm border bg-white outline-none transition-colors ${
          error ? 'border-[var(--color-error)]' : 'border-[var(--color-tertiary)] focus:border-[var(--color-primary)]'
        } ${className}`}
        style={{
          borderRadius: 'var(--rounded-none, 0px)',
          borderColor: borderColor,
        }}
        {...props}
      />
      {helperText && (
        <span
          className="text-xs"
          style={{ color: error ? 'var(--color-error)' : 'var(--color-info)' }}
        >
          {helperText}
        </span>
      )}
    </div>
  )
}
