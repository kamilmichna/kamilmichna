import type { DesignSection } from '../design-parser/types'

interface MarkdownSectionProps {
  section: DesignSection
}

export default function MarkdownSection({ section }: MarkdownSectionProps) {
  return (
    <div style={{ marginBottom: 'var(--space-xl)' }}>
      <h2 className="label-caps" style={{
        fontSize: 'var(--font-headline-md-size)',
        color: 'var(--color-on-surface)',
        marginBottom: 'var(--space-md)'
      }}>
        {section.heading}
      </h2>
      <div
        style={{
          fontSize: 'var(--font-body-md-size)',
          fontWeight: 'var(--font-body-md-weight)',
          lineHeight: 'var(--font-body-md-line-height)',
          color: 'var(--color-on-surface-variant)'
        }}
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  )
}
