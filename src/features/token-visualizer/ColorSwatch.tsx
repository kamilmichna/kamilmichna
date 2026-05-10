interface ColorSwatchProps {
  name: string
  hex: string
}

function getContrastColor(hex: string): string {
  const cleanHex = hex.replace('#', '')
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(c => c + c).join('')
    : cleanHex

  const r = parseInt(fullHex.substring(0, 2), 16)
  const g = parseInt(fullHex.substring(2, 4), 16)
  const b = parseInt(fullHex.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export default function ColorSwatch({ name, hex }: ColorSwatchProps) {
  const textColor = getContrastColor(hex)

  return (
    <div>
      <div style={{
        width: '100%',
        height: '96px',
        backgroundColor: hex,
        color: textColor,
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'var(--space-sm)',
        border: '1px solid var(--color-border)'
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-code-sm-size)',
          opacity: 0.8
        }}>
          {hex}
        </span>
      </div>
      <div style={{ marginTop: 'var(--space-sm)' }}>
        <div className="label-caps" style={{
          fontSize: 'var(--font-label-caps-size)',
          color: 'var(--color-on-surface)'
        }}>
          {name}
        </div>
      </div>
    </div>
  )
}
