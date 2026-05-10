import { Buffer } from 'buffer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './index.css'
import App from './App.tsx'
import { DesignRegistryProvider } from './features/design-registry/state'

// Polyfill Buffer for gray-matter (uses Node.js buffer)
;(window as any).Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignRegistryProvider>
      <App />
    </DesignRegistryProvider>
  </StrictMode>,
)
