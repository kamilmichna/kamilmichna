import { useState, useEffect } from 'react'
import { parseDesign } from '../design-parser'
import { useDesignRegistry } from './state'
import SearchInput from './SearchInput'
import UploadZone from './UploadZone'
import RegistryList from './RegistryList'

export default function Registry() {
  const { state, dispatch } = useDesignRegistry()
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadSampleDesigns() {
      const response = await fetch('/designs/index.json')
      if (!response.ok) return
      const files: string[] = await response.json()

      for (const file of files) {
        const res = await fetch(`/designs/${file}`)
        if (!res.ok) continue
        const content = await res.text()
        const parsed = parseDesign(content)
        if (parsed.tokens) {
          dispatch({
            type: 'ADD_DESIGN',
            payload: {
              id: file.replace('.md', ''),
              name: parsed.tokens.name || file.replace('.md', ''),
              content,
              tokens: parsed.tokens,
              sections: parsed.sections,
            },
          })
        }
      }
    }

    loadSampleDesigns().catch(console.error)
  }, [dispatch])

  const filteredDesigns = state.designs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="sb-page">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h1 className="label-caps" style={{
          fontSize: 'var(--font-headline-lg-size)',
          color: 'var(--color-on-surface)',
          marginBottom: 'var(--space-sm)'
        }}>
          Design Registry
        </h1>
        <p style={{
          fontSize: 'var(--font-body-md-size)',
          color: 'var(--color-outline)'
        }}>
          Browse and manage design system files
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <UploadZone />
      </div>

      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <RegistryList designs={filteredDesigns} />
    </div>
  )
}
