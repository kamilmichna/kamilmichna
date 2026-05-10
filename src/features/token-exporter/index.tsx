import { useState } from 'react'
import type { DesignTokens } from '../design-parser/types'
import { toJson } from './formatters/json'
import { toCssVars } from './formatters/css'
import { toTailwindConfig } from './formatters/tailwind'
import { download } from './download'

interface TokenExporterProps {
  tokens: DesignTokens
}

type ExportFormat = 'json' | 'css' | 'tailwind'

const formatOptions: { value: ExportFormat; label: string; extension: string; mimeType: string }[] = [
  { value: 'json', label: 'JSON', extension: '.json', mimeType: 'application/json' },
  { value: 'css', label: 'CSS Variables', extension: '.css', mimeType: 'text/css' },
  { value: 'tailwind', label: 'Tailwind Config', extension: '.js', mimeType: 'text/javascript' },
]

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function TokenExporter({ tokens }: TokenExporterProps) {
  const [format, setFormat] = useState<ExportFormat>('json')

  const selectedFormat = formatOptions.find((f) => f.value === format)!

  function getContent(): string {
    switch (format) {
      case 'json':
        return toJson(tokens)
      case 'css':
        return toCssVars(tokens)
      case 'tailwind':
        return toTailwindConfig(tokens)
    }
  }

  function handleDownload() {
    const content = getContent()
    const baseName = tokens.name ? slugify(tokens.name) : 'design-tokens'
    const filename = `${baseName}${selectedFormat.extension}`
    download(content, filename, selectedFormat.mimeType)
  }

  return (
    <div className="border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Export Tokens</h3>
      <div className="flex gap-2 mb-4">
        {formatOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFormat(option.value)}
            className={`px-3 py-1.5 text-sm border ${
              format === option.value
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            style={{ borderRadius: 'var(--rounded-none, 0px)' }}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        onClick={handleDownload}
        className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:opacity-90"
        style={{ borderRadius: 'var(--rounded-none, 0px)' }}
      >
        Download {selectedFormat.label}
      </button>
    </div>
  )
}
