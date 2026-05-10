import { describe, it, expect } from 'vitest'
import { parseDesign } from '../index'
import { validateColor, validateTypography, validateSections, validateTokens } from '../validate'
import type { DesignSection } from '../types'

describe('parseDesign', () => {
  it('should parse a valid design.md with all token types', () => {
    const content = `---
name: Test Design
colors:
  primary: "#0A0A0A"
  secondary: "#FAFAFA"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
rounded:
  none: 0px
spacing:
  sm: 8px
---

## Overview

This is a test design.

## Colors

The palette is monochromatic.
`

    const result = parseDesign(content)

    expect(result.tokens).not.toBeNull()
    expect(result.tokens?.name).toBe('Test Design')
    expect(result.tokens?.colors.primary).toBe('#0A0A0A')
    expect(result.tokens?.typography.h1.fontFamily).toBe('Inter')
    expect(result.sections).toHaveLength(2)
    expect(result.errors).toHaveLength(0)
  })

  it('should handle design.md with only name and colors', () => {
    const content = `---
name: Minimal
colors:
  primary: "#000"
---

## Overview

Minimal design.
`

    const result = parseDesign(content)

    expect(result.tokens).not.toBeNull()
    expect(result.tokens?.name).toBe('Minimal')
    expect(result.tokens?.colors.primary).toBe('#000')
    expect(result.tokens?.typography).toEqual({})
    expect(result.errors).toHaveLength(0)
  })

  it('should handle missing frontmatter delimiters', () => {
    const content = `# No Frontmatter

This file has no frontmatter.

## Overview

Some content.
`

    const result = parseDesign(content)

    expect(result.tokens).toBeNull()
    expect(result.sections).toHaveLength(1)
    expect(result.errors).toHaveLength(0)
  })

  it('should report invalid YAML', () => {
    const content = `---
name: Broken
colors:
  primary: [invalid yaml
---

## Overview

Content.
`

    const result = parseDesign(content)

    expect(result.tokens).toBeNull()
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('should detect duplicate section headings', () => {
    const content = `---
name: Dupes
colors:
  primary: "#000"
---

## Colors

First colors section.

## Colors

Second colors section.
`

    const result = parseDesign(content)

    expect(result.errors.some((e) => e.message.includes('Duplicate section'))).toBe(true)
  })
})

describe('validateColor', () => {
  it('should accept valid hex colors', () => {
    expect(validateColor('#0A0A0A')).toBe(true)
    expect(validateColor('#fff')).toBe(true)
    expect(validateColor('#F7F5F2')).toBe(true)
    expect(validateColor('#12345678')).toBe(true)
  })

  it('should reject invalid colors', () => {
    expect(validateColor('rgb(0,0,0)')).toBe(false)
    expect(validateColor('red')).toBe(false)
    expect(validateColor('1A1C1E')).toBe(false)
    expect(validateColor('#GGG')).toBe(false)
  })
})

describe('validateTypography', () => {
  it('should accept valid typography token', () => {
    const token = {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    }
    expect(validateTypography(token)).toHaveLength(0)
  })

  it('should reject missing required fields', () => {
    const token = {
      fontFamily: 'Inter',
    }
    const errors = validateTypography(token)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors.some((e) => e.includes('fontSize'))).toBe(true)
  })

  it('should reject non-object tokens', () => {
    expect(validateTypography(null)).toHaveLength(1)
    expect(validateTypography('string')).toHaveLength(1)
  })
})

describe('validateSections', () => {
  it('should accept unique headings', () => {
    const sections: DesignSection[] = [
      { heading: 'Overview', content: '<p>Overview</p>' },
      { heading: 'Colors', content: '<p>Colors</p>' },
    ]
    expect(validateSections(sections)).toHaveLength(0)
  })

  it('should detect duplicate headings', () => {
    const sections: DesignSection[] = [
      { heading: 'Colors', content: '<p>First</p>' },
      { heading: 'Colors', content: '<p>Second</p>' },
    ]
    const errors = validateSections(sections)
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toContain('Colors')
  })
})

describe('validateTokens', () => {
  it('should validate color tokens', () => {
    const tokens = {
      name: 'Test',
      colors: { primary: '#000' },
      typography: {},
    }
    expect(validateTokens(tokens)).toHaveLength(0)
  })

  it('should report invalid color values', () => {
    const tokens = {
      name: 'Test',
      colors: { primary: 'not-a-color' },
      typography: {},
    }
    const errors = validateTokens(tokens)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('should report invalid typography tokens', () => {
    const tokens = {
      name: 'Test',
      colors: { primary: '#000' },
      typography: { h1: { fontFamily: 'Inter' } as any },
    }
    const errors = validateTokens(tokens)
    expect(errors.length).toBeGreaterThan(0)
  })
})
