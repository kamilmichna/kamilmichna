import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { DesignTokens, DesignSection } from '../design-parser/types'

export interface DesignEntry {
  id: string
  name: string
  content: string
  tokens: DesignTokens
  sections: DesignSection[]
}

interface DesignRegistryState {
  designs: DesignEntry[]
  selectedId: string | null
  comparisonPair: [string, string] | null
}

type DesignRegistryAction =
  | { type: 'ADD_DESIGN'; payload: DesignEntry }
  | { type: 'REMOVE_DESIGN'; payload: string }
  | { type: 'SELECT_DESIGN'; payload: string | null }
  | { type: 'SET_DESIGNS'; payload: DesignEntry[] }
  | { type: 'SET_COMPARISON'; payload: [string, string] | null }

const initialState: DesignRegistryState = {
  designs: [],
  selectedId: null,
  comparisonPair: null,
}

function designRegistryReducer(
  state: DesignRegistryState,
  action: DesignRegistryAction
): DesignRegistryState {
  switch (action.type) {
    case 'ADD_DESIGN':
      // Skip if design with same id already exists
      if (state.designs.some((d) => d.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        designs: [...state.designs, action.payload],
      }
    case 'REMOVE_DESIGN':
      return {
        ...state,
        designs: state.designs.filter((d) => d.id !== action.payload),
        selectedId: state.selectedId === action.payload ? null : state.selectedId,
      }
    case 'SELECT_DESIGN':
      return {
        ...state,
        selectedId: action.payload,
      }
    case 'SET_DESIGNS':
      return {
        ...state,
        designs: action.payload,
      }
    case 'SET_COMPARISON':
      return {
        ...state,
        comparisonPair: action.payload,
      }
    default:
      return state
  }
}

interface DesignRegistryContextValue {
  state: DesignRegistryState
  dispatch: React.Dispatch<DesignRegistryAction>
}

const DesignRegistryContext = createContext<DesignRegistryContextValue | null>(null)

export function DesignRegistryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(designRegistryReducer, initialState)

  return (
    <DesignRegistryContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignRegistryContext.Provider>
  )
}

export function useDesignRegistry() {
  const context = useContext(DesignRegistryContext)
  if (!context) {
    throw new Error('useDesignRegistry must be used within a DesignRegistryProvider')
  }
  return context
}
