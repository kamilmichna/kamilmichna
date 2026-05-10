import type { ParsedDesign, ValidationError } from './types'
import { parseFrontmatter } from './parse-frontmatter'
import { parseBody } from './parse-body'
import { validateTokens, validateSections } from './validate'

export function parseDesign(content: string): ParsedDesign {
  const errors: ValidationError[] = []

  // Parse frontmatter
  const { tokens, errors: frontmatterErrors, body } = parseFrontmatter(content)
  errors.push(...frontmatterErrors)

  // Parse body sections
  const sections = parseBody(body)

  // Validate sections for duplicates
  const sectionErrors = validateSections(sections)
  errors.push(...sectionErrors)

  // Validate tokens if present
  if (tokens) {
    const tokenErrors = validateTokens(tokens)
    errors.push(...tokenErrors)
  }

  return {
    tokens,
    sections,
    errors,
  }
}

export type { DesignTokens, TypographyToken, DesignSection, ValidationError, ParsedDesign } from './types'
export { DesignTokensSchema, TypographyTokenSchema } from './types'
