'use client'

import type { Gender } from '@/lib/saju/types'

interface GenderSelectorProps {
  value: Gender
  onChange: (g: Gender) => void
}

const OPTIONS: { label: string; value: Gender }[] = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
  { label: '선택 안함', value: 'unknown' },
]

export default function GenderSelector({ value, onChange }: GenderSelectorProps) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-[var(--color-gold)]/30">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 ${
            value === opt.value
              ? 'bg-[var(--color-crimson)] text-[var(--color-paper)]'
              : 'bg-transparent text-[var(--color-mist)] hover:text-[var(--color-paper)]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
