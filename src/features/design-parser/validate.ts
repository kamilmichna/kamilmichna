import type { DesignTokens, DesignSection, ValidationError } from './types'

const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{3,8}$/

export function validateColor(hex: string): boolean {
  return HEX_COLOR_REGEX.test(hex)
}

export function validateTypography(token: unknown): string[] {
  const errors: string[] = []
  const requiredFields = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']

  if (typeof token !== 'object' || token === null) {
    errors.push('Typography token must be an object')
    return errors
  }

  for (const field of requiredFields) {
    if (!(field in token)) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  return errors
}

export function validateSections(sections: DesignSection[]): ValidationError[] {
  const errors: ValidationError[] = []
  const headings = new Map<string, number>()

  for (const section of sections) {
    const count = headings.get(section.heading) || 0
    headings.set(section.heading, count + 1)
  }

  for (const [heading, count] of headings) {
    if (count > 1) {
      errors.push({
        type: 'error',
        message: `Duplicate section heading: "${heading}"`,
      })
    }
  }

  return errors
}

export function validateTokens(tokens: DesignTokens): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate colors
  for (const [name, value] of Object.entries(tokens.colors)) {
    if (!validateColor(value)) {
      errors.push({
        type: 'error',
        message: `Invalid color value for "${name}": ${value}`,
        path: `colors.${name}`,
      })
    }
  }

  // Validate typography
  for (const [name, token] of Object.entries(tokens.typography)) {
    const typoErrors = validateTypography(token)
    for (const msg of typoErrors) {
      errors.push({
        type: 'error',
        message: `Typography "${name}": ${msg}`,
        path: `typography.${name}`,
      })
    }
  }

  return errors
}
