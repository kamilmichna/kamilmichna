import { type InputHTMLAttributes } from 'react'

interface PlaygroundCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function PlaygroundCheckbox({ label, className = '', ...props }: PlaygroundCheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={`w-[18px] h-[18px] border appearance-none checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:bg-[var(--color-secondary)] disabled:border-[var(--color-tertiary)] ${className}`}
        style={{ borderRadius: 'var(--rounded-none, 0px)' }}
        {...props}
      />
      {label && <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{label}</span>}
    </label>
  )
}

interface PlaygroundRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function PlaygroundRadio({ label, name, className = '', ...props }: PlaygroundRadioProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        className={`w-[18px] h-[18px] border appearance-none checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:bg-[var(--color-secondary)] disabled:border-[var(--color-tertiary)] ${className}`}
        style={{ borderRadius: 'var(--rounded-none, 0px)' }}
        {...props}
      />
      {label && <span className="text-sm" style={{ color: 'var(--color-primary)' }}>{label}</span>}
    </label>
  )
}
