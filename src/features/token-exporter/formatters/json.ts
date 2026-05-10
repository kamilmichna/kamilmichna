import type { DesignTokens } from '../../design-parser/types'

export function toJson(tokens: DesignTokens): string {
  return JSON.stringify(tokens, null, 2)
}
