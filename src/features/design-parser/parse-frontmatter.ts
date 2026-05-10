import matter from 'gray-matter'
import type { DesignTokens, ValidationError } from './types'
import { DesignTokensSchema } from './types'

interface ParseFrontmatterResult {
  tokens: DesignTokens | null
  errors: ValidationError[]
  body: string
}

export function parseFrontmatter(content: string): ParseFrontmatterResult {
  const errors: ValidationError[] = []

  try {
    const { data, content: body } = matter(content)

    // If no frontmatter was found (empty object), return empty tokens
    if (Object.keys(data).length === 0) {
      return {
        tokens: null,
        errors: [],
        body,
      }
    }

    // Validate with Zod schema
    const result = DesignTokensSchema.safeParse(data)

    if (result.success) {
      return {
        tokens: result.data as DesignTokens,
        errors,
        body,
      }
    } else {
      // Map Zod errors to validation errors
      for (const issue of result.error.issues) {
        errors.push({
          type: 'error',
          message: issue.message,
          path: issue.path.join('.'),
        })
      }
      return {
        tokens: null,
        errors,
        body,
      }
    }
  } catch (err) {
    errors.push({
      type: 'error',
      message: err instanceof Error ? err.message : 'Failed to parse frontmatter',
    })
    return {
      tokens: null,
      errors,
      body: content,
    }
  }
}
