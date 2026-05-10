import { useState } from 'react'
import type { ReactNode } from 'react'

interface PlaygroundTooltipProps {
  content: string
  children: ReactNode
}

export default function PlaygroundTooltip({ content, children }: PlaygroundTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute z-50 px-3 py-2 text-xs max-w-[200px] pointer-events-none"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-secondary)',
            borderRadius: 'var(--rounded-none, 0px)',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
          }}
        >
          {content}
          <div
            className="absolute w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--color-primary)',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}
    </div>
  )
}
