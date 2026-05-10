import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parseDesign } from '../design-parser'
import type { ParsedDesign } from '../design-parser'
import { useDesignRegistry } from '../design-registry/state'
import Visualizer from '../visualizer'
import ColorSwatch from './ColorSwatch'
import TypographySample from './TypographySample'
import SpacingScale from './SpacingScale'
import RoundedScale from './RoundedScale'
import ComponentSummary from './ComponentSummary'
import MarkdownSection from './MarkdownSection'

type ViewMode = 'inspector' | 'visualizer'

export default function Viewer() {
  const { id } = useParams<{ id: string }>()
  const { state } = useDesignRegistry()
  const [design, setDesign] = useState<ParsedDesign | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [viewMode, setViewMode] = useState<ViewMode>('visualizer')
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
          if (parsed.sections.length > 0) {
            setActiveSection(parsed.sections[0].heading)
          }
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
        if (parsed.sections.length > 0) {
          setActiveSection(parsed.sections[0].heading)
        }
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

  if (error || !design) {
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

  const { tokens, sections, errors } = design

  return (
    <div>
      {/* Mode Toggle Header */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'var(--color-surface-container-lowest)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-lg)'
      }}>
        <Link to="/" className="sb-nav-link" style={{ marginRight: 'auto' }}>
          ← Back
        </Link>
        <span className="label-caps" style={{
          fontSize: 'var(--font-body-md-size)',
          color: 'var(--color-on-surface)'
        }}>
          {tokens?.name || id}
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <button
            onClick={() => setViewMode('visualizer')}
            className="label-caps"
            style={{
              padding: 'var(--space-xs) var(--space-md)',
              fontSize: 'var(--font-label-caps-size)',
              backgroundColor: viewMode === 'visualizer' ? 'var(--color-primary)' : 'transparent',
              color: viewMode === 'visualizer' ? 'var(--color-on-primary)' : 'var(--color-outline)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Visualizer
          </button>
          <button
            onClick={() => setViewMode('inspector')}
            className="label-caps"
            style={{
              padding: 'var(--space-xs) var(--space-md)',
              fontSize: 'var(--font-label-caps-size)',
              backgroundColor: viewMode === 'inspector' ? 'var(--color-primary)' : 'transparent',
              color: viewMode === 'inspector' ? 'var(--color-on-primary)' : 'var(--color-outline)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Inspector
          </button>
        </div>
      </div>

      {/* Visualizer Mode */}
      {viewMode === 'visualizer' && tokens && (
        <Visualizer tokens={tokens} />
      )}

      {/* Inspector Mode */}
      {viewMode === 'inspector' && (
        <div className="sb-page">
          {errors.length > 0 && (
            <div style={{
              marginBottom: 'var(--space-lg)',
              padding: 'var(--space-md)',
              backgroundColor: 'var(--color-error-container)',
              border: '1px solid var(--color-error)'
            }}>
              <h3 className="label-caps" style={{
                fontSize: 'var(--font-code-sm-size)',
                color: 'var(--color-on-error-container)',
                marginBottom: 'var(--space-sm)'
              }}>
                Parse Errors
              </h3>
              <ul style={{
                fontSize: 'var(--font-code-sm-size)',
                color: 'var(--color-on-error-container)',
                listStyle: 'none',
                padding: 0
              }}>
                {errors.map((err, i) => (
                  <li key={i} style={{ marginBottom: 'var(--space-xs)' }}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
            {/* Sidebar Navigation */}
            <nav style={{ width: '192px', flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: 'var(--space-lg)' }}>
                <h3 className="label-caps" style={{
                  fontSize: 'var(--font-label-caps-size)',
                  color: 'var(--color-outline)',
                  marginBottom: 'var(--space-md)'
                }}>
                  Sections
                </h3>
                {tokens && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gutter)' }}>
                    {['colors', 'typography', 'spacing', 'rounded', 'components'].map((section) => {
                      if (section === 'spacing' && (!tokens.spacing || Object.keys(tokens.spacing).length === 0)) return null
                      if (section === 'rounded' && (!tokens.rounded || Object.keys(tokens.rounded).length === 0)) return null
                      if (section === 'components' && (!tokens.components || Object.keys(tokens.components).length === 0)) return null
                      return (
                        <button
                          key={section}
                          onClick={() => setActiveSection(section)}
                          className="label-caps"
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: 'var(--space-sm) var(--space-md)',
                            fontSize: 'var(--font-label-caps-size)',
                            backgroundColor: activeSection === section ? 'var(--color-primary)' : 'transparent',
                            color: activeSection === section ? 'var(--color-on-primary)' : 'var(--color-outline)',
                            border: 'none',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                          }}
                        >
                          {section}
                        </button>
                      )
                    })}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-gutter)', marginTop: 'var(--space-sm)' }}>
                  {sections.map((section) => (
                    <button
                      key={section.heading}
                      onClick={() => setActiveSection(section.heading)}
                      className="label-caps"
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: 'var(--space-sm) var(--space-md)',
                        fontSize: 'var(--font-label-caps-size)',
                        backgroundColor: activeSection === section.heading ? 'var(--color-primary)' : 'transparent',
                        color: activeSection === section.heading ? 'var(--color-on-primary)' : 'var(--color-outline)',
                        border: 'none',
                        borderRadius: 'var(--radius)',
                        cursor: 'pointer',
                        textTransform: 'uppercase'
                      }}
                    >
                      {section.heading}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, minWidth: 0 }}>
              {tokens && activeSection === 'colors' && (
                <div>
                  <h2 className="label-caps" style={{
                    fontSize: 'var(--font-headline-md-size)',
                    color: 'var(--color-on-surface)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    Colors
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: 'var(--space-md)'
                  }}>
                    {Object.entries(tokens.colors).map(([name, hex]) => (
                      <ColorSwatch key={name} name={name} hex={hex} />
                    ))}
                  </div>
                </div>
              )}

              {tokens && activeSection === 'typography' && (
                <div>
                  <h2 className="label-caps" style={{
                    fontSize: 'var(--font-headline-md-size)',
                    color: 'var(--color-on-surface)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    Typography
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    {Object.entries(tokens.typography).map(([name, token]) => (
                      <TypographySample key={name} name={name} token={token} />
                    ))}
                  </div>
                </div>
              )}

              {tokens?.spacing && activeSection === 'spacing' && (
                <div>
                  <h2 className="label-caps" style={{
                    fontSize: 'var(--font-headline-md-size)',
                    color: 'var(--color-on-surface)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    Spacing
                  </h2>
                  <SpacingScale tokens={tokens.spacing} />
                </div>
              )}

              {tokens?.rounded && activeSection === 'rounded' && (
                <div>
                  <h2 className="label-caps" style={{
                    fontSize: 'var(--font-headline-md-size)',
                    color: 'var(--color-on-surface)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    Rounded
                  </h2>
                  <RoundedScale tokens={tokens.rounded} />
                </div>
              )}

              {tokens?.components && activeSection === 'components' && (
                <div>
                  <h2 className="label-caps" style={{
                    fontSize: 'var(--font-headline-md-size)',
                    color: 'var(--color-on-surface)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    Components
                  </h2>
                  <ComponentSummary tokens={tokens.components} />
                </div>
              )}

              {sections
                .filter((s) => s.heading === activeSection)
                .map((section) => (
                  <MarkdownSection key={section.heading} section={section} />
                ))}
            </main>
          </div>
        </div>
      )}
    </div>
  )
}
