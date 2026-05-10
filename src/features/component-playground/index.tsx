import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parseDesign } from '../design-parser'
import type { ParsedDesign } from '../design-parser'
import { useDesignRegistry } from '../design-registry/state'
import PlaygroundContainer from './PlaygroundContainer'
import PlaygroundButton from './PlaygroundButton'
import PlaygroundInput from './PlaygroundInput'
import PlaygroundChip from './PlaygroundChip'
import { PlaygroundCheckbox, PlaygroundRadio } from './PlaygroundCheckbox'
import PlaygroundTooltip from './PlaygroundTooltip'

export default function Playground() {
  const { id } = useParams<{ id: string }>()
  const { state } = useDesignRegistry()
  const [design, setDesign] = useState<ParsedDesign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDesign() {
      try {
        // First check context state (for uploaded designs)
        const existing = state.designs.find(d => d.id === id)
        if (existing) {
          const parsed = parseDesign(existing.content)
          setDesign(parsed)
          setLoading(false)
          return
        }

        // Fall back to fetching from server (for sample designs)
        const response = await fetch(`/designs/${id}.md`)
        if (!response.ok) {
          throw new Error('Design not found')
        }
        const content = await response.text()
        const parsed = parseDesign(content)
        setDesign(parsed)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load design')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadDesign()
    }
  }, [id, state.designs])

  if (loading) {
    return (
      <div className="sb-page">
        <div className="label-caps" style={{ color: 'var(--color-outline)' }}>
          Loading design...
        </div>
      </div>
    )
  }

  if (error || !design?.tokens) {
    return (
      <div className="sb-page">
        <div style={{
          color: 'var(--color-error)',
          marginBottom: 'var(--space-md)',
          fontSize: 'var(--font-body-md-size)'
        }}>
          {error || 'Design not found'}
        </div>
        <Link to="/" className="sb-nav-link" style={{ display: 'inline-block' }}>
          ← Back to Registry
        </Link>
      </div>
    )
  }

  return (
    <div className="sb-page">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <Link to="/" className="sb-nav-link" style={{ display: 'inline-block', marginBottom: 'var(--space-sm)' }}>
          ← Back to Registry
        </Link>
        <h1 className="label-caps" style={{
          fontSize: 'var(--font-headline-lg-size)',
          color: 'var(--color-on-surface)'
        }}>
          {design.tokens.name} — Playground
        </h1>
      </div>

      <PlaygroundContainer tokens={design.tokens}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Buttons */}
          <section>
            <h2 className="label-caps" style={{
              fontSize: 'var(--font-headline-md-size)',
              color: 'var(--color-on-surface)',
              marginBottom: 'var(--space-md)'
            }}>
              Buttons
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
              <PlaygroundButton variant="primary">Primary</PlaygroundButton>
              <PlaygroundButton variant="secondary">Secondary</PlaygroundButton>
              <PlaygroundButton variant="ghost">Ghost</PlaygroundButton>
              <PlaygroundButton variant="destructive">Destructive</PlaygroundButton>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <PlaygroundButton variant="primary" size="small">Small</PlaygroundButton>
              <PlaygroundButton variant="primary" size="medium">Medium</PlaygroundButton>
              <PlaygroundButton variant="primary" size="large">Large</PlaygroundButton>
            </div>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <PlaygroundButton variant="primary" disabled>Disabled</PlaygroundButton>
            </div>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="label-caps" style={{
              fontSize: 'var(--font-headline-md-size)',
              color: 'var(--color-on-surface)',
              marginBottom: 'var(--space-md)'
            }}>
              Inputs
            </h2>
            <div style={{ maxWidth: '448px', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <PlaygroundInput label="Default" placeholder="Enter text..." helperText="Helper text" />
              <PlaygroundInput label="Error" placeholder="Enter text..." error helperText="This field is required" />
            </div>
          </section>

          {/* Chips */}
          <section>
            <h2 className="label-caps" style={{
              fontSize: 'var(--font-headline-md-size)',
              color: 'var(--color-on-surface)',
              marginBottom: 'var(--space-md)'
            }}>
              Chips
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <PlaygroundChip variant="default">Default</PlaygroundChip>
              <PlaygroundChip variant="selected">Selected</PlaygroundChip>
              <PlaygroundChip variant="status" status="published">Published</PlaygroundChip>
              <PlaygroundChip variant="status" status="draft">Draft</PlaygroundChip>
              <PlaygroundChip variant="status" status="archived">Archived</PlaygroundChip>
              <PlaygroundChip variant="status" status="featured">Featured</PlaygroundChip>
            </div>
          </section>

          {/* Checkboxes & Radios */}
          <section>
            <h2 className="label-caps" style={{
              fontSize: 'var(--font-headline-md-size)',
              color: 'var(--color-on-surface)',
              marginBottom: 'var(--space-md)'
            }}>
              Checkboxes & Radios
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <PlaygroundCheckbox label="Option 1" defaultChecked />
                <PlaygroundCheckbox label="Option 2" />
                <PlaygroundCheckbox label="Disabled" disabled />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <PlaygroundRadio name="demo" label="Choice 1" defaultChecked />
                <PlaygroundRadio name="demo" label="Choice 2" />
                <PlaygroundRadio name="demo" label="Disabled" disabled />
              </div>
            </div>
          </section>

          {/* Tooltips */}
          <section>
            <h2 className="label-caps" style={{
              fontSize: 'var(--font-headline-md-size)',
              color: 'var(--color-on-surface)',
              marginBottom: 'var(--space-md)'
            }}>
              Tooltips
            </h2>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <PlaygroundTooltip content="This is a tooltip">
                <PlaygroundButton variant="primary">Hover me</PlaygroundButton>
              </PlaygroundTooltip>
            </div>
          </section>
        </div>
      </PlaygroundContainer>
    </div>
  )
}
