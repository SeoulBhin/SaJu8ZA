'use client'

// 십이시진 (시간 범위 → 시주 기준 시각)
const HOUR_OPTIONS = [
  { label: '자시 (子) 23:00~01:00', hour: 23 },
  { label: '축시 (丑) 01:00~03:00', hour: 1 },
  { label: '인시 (寅) 03:00~05:00', hour: 3 },
  { label: '묘시 (卯) 05:00~07:00', hour: 5 },
  { label: '진시 (辰) 07:00~09:00', hour: 7 },
  { label: '사시 (巳) 09:00~11:00', hour: 9 },
  { label: '오시 (午) 11:00~13:00', hour: 11 },
  { label: '미시 (未) 13:00~15:00', hour: 13 },
  { label: '신시 (申) 15:00~17:00', hour: 15 },
  { label: '유시 (酉) 17:00~19:00', hour: 17 },
  { label: '술시 (戌) 19:00~21:00', hour: 19 },
  { label: '해시 (亥) 21:00~23:00', hour: 21 },
]

interface TimeSelectorProps {
  hour: number
  onChange: (hour: number) => void
}

export default function TimeSelector({ hour, onChange }: TimeSelectorProps) {
  const isUnknown = hour === -1

  return (
    <div className="space-y-3">
      {/* 시간 모름 체크 */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isUnknown}
            onChange={(e) => onChange(e.target.checked ? -1 : 11)}
          />
          <div
            className={`w-10 h-5 rounded-full transition-colors duration-200 ${
              isUnknown ? 'bg-[var(--color-crimson)]' : 'bg-[var(--color-surface-2)]'
            } border border-[var(--color-gold)]/20`}
          />
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[var(--color-paper)] transition-transform duration-200 ${
              isUnknown ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
        <span className="text-sm text-[var(--color-mist)] group-hover:text-[var(--color-paper)] transition-colors">
          태어난 시간을 모릅니다
        </span>
      </label>

      {/* 시간 선택 (모름이 아닐 때) */}
      {!isUnknown && (
        <div className="relative">
          <select
            value={hour}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-4 py-3 text-[var(--color-paper)] text-sm appearance-none cursor-pointer focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors"
          >
            {HOUR_OPTIONS.map((opt) => (
              <option key={opt.hour} value={opt.hour} className="bg-[var(--color-surface)]">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-gold)] text-xs">
            ▼
          </div>
        </div>
      )}

      {isUnknown && (
        <p className="text-xs text-[var(--color-mist)] pl-1">
          * 시주(時柱)는 표시되지 않으며, 일부 해석에 제한이 있을 수 있습니다.
        </p>
      )}
    </div>
  )
}
