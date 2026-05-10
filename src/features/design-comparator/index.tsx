import { useState, useEffect } from 'react'
import { parseDesign } from '../design-parser'
import { compareTokens } from './compare'
import type { ComparisonResult } from './compare'
import DesignSelector from './DesignSelector'
import ComparisonView from './ComparisonView'
import SummaryBar from './SummaryBar'

interface DesignFile {
  id: string
  name: string
  content: string
}

export default function Comparator() {
  const [designs, setDesigns] = useState<DesignFile[]>([])
  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)
  const [comparison, setComparison] = useState<ComparisonResult | null>(null)

  useEffect(() => {
    async function loadDesigns() {
      const response = await fetch('/designs/index.json')
      if (!response.ok) return
      const files: string[] = await response.json()
      const loaded: DesignFile[] = []
      for (const file of files) {
        const res = await fetch(`/designs/${file}`)
        if (!res.ok) continue
        const content = await res.text()
        loaded.push({ id: file.replace('.md', ''), name: file.replace('.md', ''), content })
      }
      setDesigns(loaded)
    }

    loadDesigns().catch(console.error)
  }, [])

  useEffect(() => {
    if (!selectedA || !selectedB) {
      setComparison(null)
      return
    }

    const designA = designs.find((d) => d.id === selectedA)
    const designB = designs.find((d) => d.id === selectedB)

    if (!designA || !designB) return

    const parsedA = parseDesign(designA.content)
    const parsedB = parseDesign(designB.content)

    if (parsedA.tokens && parsedB.tokens) {
      const result = compareTokens(parsedA.tokens, parsedB.tokens)
      setComparison(result)
    }
  }, [selectedA, selectedB, designs])

  return (
    <div className="sb-page">
      <h1 className="label-caps" style={{
        fontSize: 'var(--font-headline-lg-size)',
        color: 'var(--color-on-surface)',
        marginBottom: 'var(--space-lg)'
      }}>
        Design Comparator
      </h1>

      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <DesignSelector
          designs={designs}
          value={selectedA}
          onChange={setSelectedA}
          label="Design A"
        />
        <DesignSelector
          designs={designs}
          value={selectedB}
          onChange={setSelectedB}
          label="Design B"
        />
      </div>

      {selectedA && selectedB && selectedA === selectedB && (
        <div style={{
          marginBottom: 'var(--space-md)',
          padding: 'var(--space-md)',
          backgroundColor: 'var(--color-surface-container-high)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--font-code-sm-size)',
          color: 'var(--color-on-surface)'
        }}>
          Same design selected for both slots. Please select different designs.
        </div>
      )}

      {comparison && (
        <>
          <SummaryBar summary={comparison.summary} />
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <ComparisonView result={comparison} />
          </div>
        </>
      )}

      {!comparison && selectedA && selectedB && selectedA !== selectedB && (
        <div style={{
          color: 'var(--color-outline)',
          textAlign: 'center',
          padding: 'var(--space-xl) 0',
          fontSize: 'var(--font-body-md-size)'
        }}>
          Loading comparison...
        </div>
      )}

      {!selectedA && !selectedB && (
        <div style={{
          color: 'var(--color-outline)',
          textAlign: 'center',
          padding: 'var(--space-xl) 0',
          fontSize: 'var(--font-body-md-size)'
        }}>
          Select two designs to compare them side by side.
        </div>
      )}
    </div>
  )
}
