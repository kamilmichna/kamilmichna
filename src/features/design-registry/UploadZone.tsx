import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { parseDesign } from '../design-parser'
import { useDesignRegistry } from './state'

export default function UploadZone() {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { dispatch } = useDesignRegistry()

  async function processFile(file: File) {
    try {
      const content = await file.text()
      const parsed = parseDesign(content)

      if (parsed.errors.some((e) => e.type === 'error')) {
        setError(parsed.errors.map((e) => e.message).join(', '))
        return
      }

      if (!parsed.tokens) {
        setError('No design tokens found. Ensure the file has YAML frontmatter with "name" and "colors".')
        return
      }

      const id = file.name.replace('.md', '')
      dispatch({
        type: 'ADD_DESIGN',
        payload: {
          id,
          name: parsed.tokens.name || id,
          content,
          tokens: parsed.tokens,
          sections: parsed.sections,
        },
      })
      setError(null)

      // Navigate to viewer immediately
      navigate(`/design/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file')
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter((f) => f.name.endsWith('.md'))
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).filter((f) => f.name.endsWith('.md'))
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `1px dashed ${isDragging ? 'var(--color-primary)' : 'var(--color-border)'}`,
          backgroundColor: isDragging ? 'var(--color-surface-container)' : 'transparent',
          padding: 'var(--space-lg)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.1s ease, background-color 0.1s ease'
        }}
      >
        <div className="label-caps" style={{ color: 'var(--color-outline)' }}>
          <p style={{
            fontSize: 'var(--font-body-md-size)',
            marginBottom: 'var(--space-xs)'
          }}>
            Drag and drop .md files here
          </p>
          <p style={{ fontSize: 'var(--font-code-sm-size)' }}>
            or click to browse
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".md"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {error && (
        <div style={{
          marginTop: 'var(--space-sm)',
          fontSize: 'var(--font-code-sm-size)',
          color: 'var(--color-error)'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}
