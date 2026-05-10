import { marked } from 'marked'
import type { DesignSection } from './types'

export function parseBody(body: string): DesignSection[] {
  const sections: DesignSection[] = []

  // Split by ## headings
  const lines = body.split('\n')
  let currentHeading = ''
  let currentContent: string[] = []

  for (const line of lines) {
    const headingMatch = line.match(/^## (.+)$/)

    if (headingMatch) {
      // Save previous section if exists
      if (currentHeading) {
        const html = marked.parse(currentContent.join('\n')) as string
        sections.push({
          heading: currentHeading,
          content: html,
        })
      }
      currentHeading = headingMatch[1]
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }

  // Save last section
  if (currentHeading) {
    const html = marked.parse(currentContent.join('\n')) as string
    sections.push({
      heading: currentHeading,
      content: html,
    })
  }

  return sections
}
