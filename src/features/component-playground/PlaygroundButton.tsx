import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'small' | 'medium' | 'large'

interface PlaygroundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary)] text-[var(--color-secondary)]',
  secondary: 'bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)]',
  ghost: 'bg-transparent text-[var(--color-primary)]',
  destructive: 'bg-[var(--color-error)] text-[var(--color-secondary)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  small: 'h-8 px-4 text-xs min-w-16',
  medium: 'h-10 px-6 text-sm min-w-24',
  large: 'h-12 px-8 text-base min-w-32',
}

export default function PlaygroundButton({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  ...props
}: PlaygroundButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ borderRadius: 'var(--rounded-none, 0px)' }}
      {...props}
    >
      {children}
    </button>
  )
}
