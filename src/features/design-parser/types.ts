import { z } from 'zod'

// Zod schemas for runtime validation

export const TypographyTokenSchema = z.object({
  fontFamily: z.string(),
  fontSize: z.string(),
  fontWeight: z.union([z.number(), z.string()]),
  lineHeight: z.union([z.number(), z.string()]),
  letterSpacing: z.string().optional(),
  fontFeature: z.string().optional(),
  fontVariation: z.string().optional(),
})

export const DesignTokensSchema = z.object({
  version: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  colors: z.record(z.string(), z.string()),
  typography: z.record(z.string(), TypographyTokenSchema).optional().default({}),
  rounded: z.record(z.string(), z.string()).optional(),
  spacing: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  components: z.record(z.string(), z.record(z.string(), z.string())).optional(),
})

// TypeScript interfaces

export interface TypographyToken {
  fontFamily: string
  fontSize: string
  fontWeight: number | string
  lineHeight: number | string
  letterSpacing?: string
  fontFeature?: string
  fontVariation?: string
}

export interface DesignTokens {
  version?: string
  name: string
  description?: string
  colors: Record<string, string>
  typography: Record<string, TypographyToken>
  rounded?: Record<string, string>
  spacing?: Record<string, string | number>
  components?: Record<string, Record<string, string>>
}

export interface DesignSection {
  heading: string
  content: string // HTML
}

export interface ValidationError {
  type: 'error' | 'warning'
  message: string
  path?: string
}

export interface ParsedDesign {
  tokens: DesignTokens | null
  sections: DesignSection[]
  errors: ValidationError[]
}
