import { useNavigate } from 'react-router-dom'
import type { DesignEntry } from './state'
import DesignCard from './DesignCard'

interface RegistryListProps {
  designs: DesignEntry[]
}

export default function RegistryList({ designs }: RegistryListProps) {
  const navigate = useNavigate()

  if (designs.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-xl) 0',
        color: 'var(--color-outline)',
        fontSize: 'var(--font-body-md-size)'
      }}>
        No designs found. Upload a design.md file to get started.
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 'var(--space-md)'
    }}>
      {designs.map((design) => (
        <DesignCard
          key={design.id}
          design={design}
          onClick={() => navigate(`/design/${design.id}`)}
        />
      ))}
    </div>
  )
}
