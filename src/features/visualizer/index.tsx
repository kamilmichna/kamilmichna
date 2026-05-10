import { useState } from 'react'
import type { DesignTokens } from '../design-parser/types'

interface VisualizerProps {
  tokens: DesignTokens
}

type Preset = 'dashboard' | 'landing' | 'application'

function useTokenColors(tokens: DesignTokens) {
  return {
    primary: tokens.colors.primary || '#000000',
    secondary: tokens.colors.secondary || '#ffffff',
    surface: tokens.colors.surface || tokens.colors['surface-base'] || '#ffffff',
    onSurface: tokens.colors['on-surface'] || tokens.colors.primary || '#000000',
    outline: tokens.colors.outline || tokens.colors.tertiary || '#cccccc',
    surfaceContainer: tokens.colors['surface-container'] || tokens.colors['surface-container-low'] || '#f5f5f5',
    error: tokens.colors.error || '#dc2626',
  }
}

function useTokenFonts(tokens: DesignTokens) {
  return {
    body: tokens.typography['body-md'] || tokens.typography['text-body'] || {
      fontFamily: 'inherit', fontSize: '14px', fontWeight: 400, lineHeight: '20px'
    },
    headline: tokens.typography['headline-lg'] || tokens.typography['headline-md'] || tokens.typography['text-h1'] || {
      fontFamily: 'inherit', fontSize: '24px', fontWeight: 700, lineHeight: '32px'
    },
    label: tokens.typography['label-caps'] || tokens.typography['text-caption'] || {
      fontFamily: 'inherit', fontSize: '11px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.05em'
    },
    code: tokens.typography['code-sm'] || tokens.typography['text-mono'] || {
      fontFamily: 'monospace', fontSize: '12px', fontWeight: 400, lineHeight: '18px'
    },
  }
}

function DashboardPreset({ tokens }: { tokens: DesignTokens }) {
  const c = useTokenColors(tokens)
  const f = useTokenFonts(tokens)

  return (
    <div style={{ padding: 'var(--space-lg)', backgroundColor: c.surface, color: c.onSurface, fontFamily: f.body.fontFamily }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) 0', borderBottom: `1px solid ${c.outline}`, marginBottom: 'var(--space-lg)' }}>
        <div style={{ fontSize: f.headline.fontSize, fontWeight: f.headline.fontWeight, color: c.primary }}>Dashboard</div>
        <nav style={{ display: 'flex', gap: 'var(--space-md)' }}>
          {['Overview', 'Analytics', 'Settings'].map((item) => (
            <span key={item} style={{ color: item === 'Overview' ? c.primary : c.outline, cursor: 'pointer', fontSize: f.body.fontSize }}>{item}</span>
          ))}
        </nav>
      </header>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        {[
          { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%' },
          { label: 'Subscriptions', value: '+2,350', change: '+180.1%' },
          { label: 'Active Now', value: '+573', change: '+19%' },
        ].map((stat) => (
          <div key={stat.label} style={{ border: `1px solid ${c.outline}`, padding: 'var(--space-md)' }}>
            <div style={{ color: c.outline, fontSize: '12px', marginBottom: 'var(--space-xs)' }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{stat.value}</div>
            <div style={{ color: c.outline, fontSize: '12px', marginTop: 'var(--space-xs)' }}>{stat.change} from last month</div>
          </div>
        ))}
      </div>

      {/* Chart + Sales */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <div style={{ border: `1px solid ${c.outline}`, padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-md)' }}>Overview</div>
          <div style={{ height: '200px', backgroundColor: `${c.outline}20`, display: 'flex', alignItems: 'flex-end', padding: 'var(--space-md)', gap: 'var(--space-sm)' }}>
            {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: c.primary, opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div style={{ border: `1px solid ${c.outline}`, padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-md)' }}>Recent Sales</div>
          {[
            { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999.00' },
            { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39.00' },
            { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299.00' },
          ].map((sale) => (
            <div key={sale.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', borderBottom: `1px solid ${c.outline}` }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{sale.name}</div>
                <div style={{ color: c.outline, fontSize: '12px' }}>{sale.email}</div>
              </div>
              <div style={{ fontWeight: 500 }}>{sale.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${c.outline}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: `${c.outline}20` }}>
              {['Invoice', 'Status', 'Method', 'Amount'].map((h) => (
                <th key={h} style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'left', fontSize: f.label.fontSize, fontWeight: f.label.fontWeight, letterSpacing: f.label.letterSpacing, textTransform: 'uppercase', borderBottom: `1px solid ${c.outline}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
              { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
              { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
            ].map((row) => (
              <tr key={row.invoice} style={{ borderBottom: `1px solid ${c.outline}` }}>
                <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>{row.invoice}</td>
                <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>{row.status}</td>
                <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>{row.method}</td>
                <td style={{ padding: 'var(--space-sm) var(--space-md)', textAlign: 'right' }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LandingPreset({ tokens }: { tokens: DesignTokens }) {
  const c = useTokenColors(tokens)
  const f = useTokenFonts(tokens)

  return (
    <div style={{ backgroundColor: c.surface, color: c.onSurface, fontFamily: f.body.fontFamily }}>
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) var(--space-xl)', borderBottom: `1px solid ${c.outline}` }}>
        <div style={{ fontSize: '18px', fontWeight: 700 }}>Brand</div>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
          {['Features', 'Pricing', 'About'].map((item) => (
            <span key={item} style={{ color: c.outline, cursor: 'pointer', fontSize: '14px' }}>{item}</span>
          ))}
          <button style={{ backgroundColor: c.primary, color: c.secondary, border: 'none', padding: 'var(--space-sm) var(--space-md)', cursor: 'pointer', fontSize: '14px' }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: 'var(--space-xl) var(--space-xl)', textAlign: 'center', borderBottom: `1px solid ${c.outline}` }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.1, marginBottom: 'var(--space-md)', color: c.primary }}>
          Build something amazing
        </h1>
        <p style={{ fontSize: '18px', color: c.outline, maxWidth: '600px', margin: '0 auto var(--space-lg)', lineHeight: 1.6 }}>
          The modern platform for developers who want to ship fast without compromising on quality.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <button style={{ backgroundColor: c.primary, color: c.secondary, border: 'none', padding: 'var(--space-md) var(--space-xl)', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>Start Free Trial</button>
          <button style={{ backgroundColor: 'transparent', color: c.primary, border: `1px solid ${c.primary}`, padding: 'var(--space-md) var(--space-xl)', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>View Demo</button>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: 'var(--space-xl)', borderBottom: `1px solid ${c.outline}` }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
          {[
            { title: 'Fast Performance', desc: 'Optimized for speed with lazy loading and efficient caching strategies.' },
            { title: 'Secure by Default', desc: 'Enterprise-grade security with end-to-end encryption and SOC2 compliance.' },
            { title: 'Developer Experience', desc: 'Intuitive APIs, comprehensive docs, and first-class TypeScript support.' },
          ].map((feature) => (
            <div key={feature.title} style={{ border: `1px solid ${c.outline}`, padding: 'var(--space-lg)' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: c.primary, marginBottom: 'var(--space-md)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>{feature.title}</h3>
              <p style={{ color: c.outline, fontSize: '14px', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: 'var(--space-xl)', borderBottom: `1px solid ${c.outline}` }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: 'var(--space-lg)' }}>Pricing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { name: 'Starter', price: '$9', features: ['5 projects', '10GB storage', 'Email support'] },
            { name: 'Pro', price: '$29', features: ['Unlimited projects', '100GB storage', 'Priority support', 'Custom domains'], highlighted: true },
            { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Unlimited storage', '24/7 support', 'SLA guarantee'] },
          ].map((plan) => (
            <div key={plan.name} style={{ border: `1px solid ${plan.highlighted ? c.primary : c.outline}`, padding: 'var(--space-lg)', backgroundColor: plan.highlighted ? `${c.primary}10` : 'transparent' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>{plan.name}</div>
              <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: 'var(--space-md)' }}>{plan.price}<span style={{ fontSize: '14px', color: c.outline }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-lg)' }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ padding: 'var(--space-xs) 0', fontSize: '14px', color: c.outline }}>✓ {feat}</li>
                ))}
              </ul>
              <button style={{ width: '100%', backgroundColor: plan.highlighted ? c.primary : 'transparent', color: plan.highlighted ? c.secondary : c.primary, border: `1px solid ${c.primary}`, padding: 'var(--space-sm)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--space-lg) var(--space-xl)', textAlign: 'center', color: c.outline, fontSize: '14px' }}>
        © 2024 Brand. All rights reserved.
      </footer>
    </div>
  )
}

function ApplicationPreset({ tokens }: { tokens: DesignTokens }) {
  const c = useTokenColors(tokens)
  const f = useTokenFonts(tokens)

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: c.surface, color: c.onSurface, fontFamily: f.body.fontFamily }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', borderRight: `1px solid ${c.outline}`, padding: 'var(--space-md)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, padding: 'var(--space-sm) 0', marginBottom: 'var(--space-lg)', borderBottom: `1px solid ${c.outline}` }}>App Name</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { icon: '◉', label: 'Dashboard', active: true },
            { icon: '◎', label: 'Projects' },
            { icon: '◇', label: 'Team' },
            { icon: '△', label: 'Analytics' },
            { icon: '□', label: 'Settings' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
              padding: 'var(--space-sm) var(--space-md)', cursor: 'pointer', fontSize: '14px',
              backgroundColor: item.active ? c.primary : 'transparent',
              color: item.active ? c.secondary : c.onSurface
            }}>
              <span style={{ fontSize: '12px' }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{ height: '48px', borderBottom: `1px solid ${c.outline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-md)' }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Projects</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <input type="text" placeholder="Search..." style={{ padding: 'var(--space-xs) var(--space-sm)', border: `1px solid ${c.outline}`, backgroundColor: c.surface, color: c.onSurface, fontSize: '14px', width: '200px', outline: 'none' }} />
            <div style={{ width: '32px', height: '32px', backgroundColor: c.outline, borderRadius: '50%' }} />
          </div>
        </header>

        {/* Content */}
        <div style={{ flex: 1, padding: 'var(--space-lg)', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Recent Projects</h2>
            <button style={{ backgroundColor: c.primary, color: c.secondary, border: 'none', padding: 'var(--space-sm) var(--space-md)', cursor: 'pointer', fontSize: '14px' }}>+ New Project</button>
          </div>

          {/* Project Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
            {[
              { name: 'Website Redesign', status: 'In Progress', progress: 75, team: 4 },
              { name: 'Mobile App v2', status: 'Planning', progress: 20, team: 6 },
              { name: 'API Integration', status: 'Review', progress: 90, team: 3 },
              { name: 'Design System', status: 'In Progress', progress: 60, team: 2 },
            ].map((project) => (
              <div key={project.name} style={{ border: `1px solid ${c.outline}`, padding: 'var(--space-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-md)' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{project.name}</div>
                    <div style={{ fontSize: '12px', color: c.outline }}>{project.team} team members</div>
                  </div>
                  <span style={{ fontSize: '12px', padding: '2px 8px', border: `1px solid ${c.outline}` }}>{project.status}</span>
                </div>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: `${c.outline}30`, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${project.progress}%`, backgroundColor: c.primary }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: 'var(--space-md)' }}>Recent Activity</h3>
            <div style={{ border: `1px solid ${c.outline}` }}>
              {[
                { user: 'Sarah Chen', action: 'committed to', target: 'Website Redesign', time: '2 min ago' },
                { user: 'Marcus Johnson', action: 'commented on', target: 'Mobile App v2', time: '15 min ago' },
                { user: 'Emily Park', action: 'completed', target: 'Design System', time: '1 hour ago' },
              ].map((activity, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md)', borderBottom: `1px solid ${c.outline}` }}>
                  <div style={{ width: '24px', height: '24px', backgroundColor: c.outline, borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: '14px' }}>
                    <span style={{ fontWeight: 500 }}>{activity.user}</span> {activity.action} <span style={{ fontWeight: 500 }}>{activity.target}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: c.outline, flexShrink: 0 }}>{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Visualizer({ tokens }: VisualizerProps) {
  const [preset, setPreset] = useState<Preset>('dashboard')

  const presets: { id: Preset; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'landing', label: 'Landing Page' },
    { id: 'application', label: 'Application' },
  ]

  return (
    <div>
      {/* Preset Selector */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'var(--color-surface-container-lowest)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)'
      }}>
        <span className="label-caps" style={{ fontSize: 'var(--font-label-caps-size)', color: 'var(--color-outline)', marginRight: 'var(--space-sm)' }}>
          Preset:
        </span>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            className="label-caps"
            style={{
              padding: 'var(--space-xs) var(--space-md)',
              fontSize: 'var(--font-label-caps-size)',
              backgroundColor: preset === p.id ? 'var(--color-primary)' : 'transparent',
              color: preset === p.id ? 'var(--color-on-primary)' : 'var(--color-outline)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Preset Content */}
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {preset === 'dashboard' && <DashboardPreset tokens={tokens} />}
        {preset === 'landing' && <LandingPreset tokens={tokens} />}
        {preset === 'application' && <ApplicationPreset tokens={tokens} />}
      </div>
    </div>
  )
}
