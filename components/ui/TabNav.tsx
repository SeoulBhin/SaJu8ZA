'use client'

interface Tab {
  id: string
  label: string
}

interface TabNavProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export default function TabNav({ tabs, active, onChange }: TabNavProps) {
  return (
    <div className="flex border-b border-[var(--color-gold)]/20 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 min-w-max py-3 px-4 text-sm font-medium transition-all duration-200 whitespace-nowrap relative ${
            active === tab.id
              ? 'text-[var(--color-gold)]'
              : 'text-[var(--color-mist)] hover:text-[var(--color-paper)]'
          }`}
        >
          {tab.label}
          {active === tab.id && (
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
