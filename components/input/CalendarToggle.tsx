'use client'

interface CalendarToggleProps {
  isLunar: boolean
  isLeapMonth: boolean
  onChange: (isLunar: boolean, isLeapMonth: boolean) => void
}

export default function CalendarToggle({ isLunar, isLeapMonth, onChange }: CalendarToggleProps) {
  return (
    <div className="space-y-3">
      {/* 양/음력 토글 */}
      <div className="flex rounded-lg overflow-hidden border border-[var(--color-gold)]/30">
        {[
          { label: '양력', value: false },
          { label: '음력', value: true },
        ].map(({ label, value }) => (
          <button
            key={label}
            type="button"
            onClick={() => onChange(value, value ? isLeapMonth : false)}
            className={`flex-1 py-2.5 text-sm font-medium transition-all duration-200 ${
              isLunar === value
                ? 'bg-[var(--color-crimson)] text-[var(--color-paper)]'
                : 'bg-transparent text-[var(--color-mist)] hover:text-[var(--color-paper)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 윤달 토글 (음력 선택 시만 노출) */}
      {isLunar && (
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isLeapMonth}
              onChange={(e) => onChange(true, e.target.checked)}
            />
            <div
              className={`w-10 h-5 rounded-full transition-colors duration-200 ${
                isLeapMonth ? 'bg-[var(--color-crimson)]' : 'bg-[var(--color-surface-2)]'
              } border border-[var(--color-gold)]/20`}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[var(--color-paper)] transition-transform duration-200 ${
                isLeapMonth ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-sm text-[var(--color-mist)] group-hover:text-[var(--color-paper)] transition-colors">
            윤달 (閏月)
          </span>
        </label>
      )}
    </div>
  )
}
