import { diffWords } from 'diff'
import type { DesignTokens, DesignSection } from '../design-parser/types'

export type ComparisonStatus = 'added' | 'removed' | 'changed' | 'unchanged'

export interface TokenComparison<T> {
  status: ComparisonStatus
  key: string
  oldValue?: T
  newValue?: T
}

export interface ComparisonResult {
  colors: TokenComparison<string>[]
  typography: TokenComparison<Record<string, string>>[]
  spacing: TokenComparison<string | number>[]
  summary: {
    total: number
    added: number
    removed: number
    changed: number
    unchanged: number
  }
}

export function compareTokens(a: DesignTokens, b: DesignTokens): ComparisonResult {
  const colors = compareMap(a.colors, b.colors)
  const typography = compareTypography(a.typography, b.typography)
  const spacing = compareMap(a.spacing || {}, b.spacing || {})

  const allItems = [...colors, ...typography, ...spacing]
  const summary = {
    total: allItems.length,
    added: allItems.filter((i) => i.status === 'added').length,
    removed: allItems.filter((i) => i.status === 'removed').length,
    changed: allItems.filter((i) => i.status === 'changed').length,
    unchanged: allItems.filter((i) => i.status === 'unchanged').length,
  }

  return { colors, typography, spacing, summary }
}

function compareMap<T>(a: Record<string, T>, b: Record<string, T>): TokenComparison<T>[] {
  const result: TokenComparison<T>[] = []
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])

  for (const key of allKeys) {
    const oldValue = a[key]
    const newValue = b[key]

    if (oldValue === undefined) {
      result.push({ status: 'added', key, newValue })
    } else if (newValue === undefined) {
      result.push({ status: 'removed', key, oldValue })
    } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      result.push({ status: 'changed', key, oldValue, newValue })
    } else {
      result.push({ status: 'unchanged', key, oldValue, newValue })
    }
  }

  return result
}

function compareTypography(
  a: Record<string, { fontFamily: string; fontSize: string; fontWeight: number | string; lineHeight: number | string }>,
  b: Record<string, { fontFamily: string; fontSize: string; fontWeight: number | string; lineHeight: number | string }>
): TokenComparison<Record<string, string>>[] {
  const result: TokenComparison<Record<string, string>>[] = []
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])

  for (const key of allKeys) {
    const oldToken = a[key]
    const newToken = b[key]

    const oldValues = oldToken
      ? { fontFamily: oldToken.fontFamily, fontSize: oldToken.fontSize, fontWeight: String(oldToken.fontWeight), lineHeight: String(oldToken.lineHeight) }
      : undefined
    const newValues = newToken
      ? { fontFamily: newToken.fontFamily, fontSize: newToken.fontSize, fontWeight: String(newToken.fontWeight), lineHeight: String(newToken.lineHeight) }
      : undefined

    if (!oldToken) {
      result.push({ status: 'added', key, newValue: newValues })
    } else if (!newToken) {
      result.push({ status: 'removed', key, oldValue: oldValues })
    } else if (JSON.stringify(oldValues) !== JSON.stringify(newValues)) {
      result.push({ status: 'changed', key, oldValue: oldValues, newValue: newValues })
    } else {
      result.push({ status: 'unchanged', key, oldValue: oldValues, newValue: newValues })
    }
  }

  return result
}

export interface SectionDiff {
  heading: string
  parts: { value: string; added?: boolean; removed?: boolean }[]
}

export function diffSections(a: DesignSection[], b: DesignSection[]): SectionDiff[] {
  const result: SectionDiff[] = []
  const bMap = new Map(b.map((s) => [s.heading, s]))

  for (const sectionA of a) {
    const sectionB = bMap.get(sectionA.heading)
    if (sectionB) {
      const parts = diffWords(sectionA.content, sectionB.content)
      result.push({ heading: sectionA.heading, parts })
    } else {
      result.push({
        heading: sectionA.heading,
        parts: [{ value: sectionA.content, removed: true }],
      })
    }
  }

  // Add sections only in B
  const aHeadings = new Set(a.map((s) => s.heading))
  for (const sectionB of b) {
    if (!aHeadings.has(sectionB.heading)) {
      result.push({
        heading: sectionB.heading,
        parts: [{ value: sectionB.content, added: true }],
      })
    }
  }

  return result
}
