'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CalendarToggle from './CalendarToggle'
import TimeSelector from './TimeSelector'
import GenderSelector from './GenderSelector'
import CandleLoader from '@/components/ui/CandleLoader'
import type { SajuInput, Gender } from '@/lib/saju/types'

/** SajuInput을 URL-safe base64로 인코딩 (한글 포함 가능) */
export function encodeInput(input: SajuInput): string {
  return btoa(encodeURIComponent(JSON.stringify(input)))
}

export default function BirthForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState(11) // 오시 기본값
  const [isLunar, setIsLunar] = useState(false)
  const [isLeapMonth, setIsLeapMonth] = useState(false)
  const [gender, setGender] = useState<Gender>('unknown')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('이름을 입력해주세요.')
      return
    }

    const y = parseInt(year)
    const m = parseInt(month)
    const d = parseInt(day)

    if (!y || !m || !d) {
      setError('생년월일을 모두 입력해주세요.')
      return
    }
    if (y < 1900 || y > 2100) {
      setError('지원되는 연도 범위(1900~2100)를 입력해주세요.')
      return
    }
    if (m < 1 || m > 12) {
      setError('올바른 월(1~12)을 입력해주세요.')
      return
    }
    if (d < 1 || d > 31) {
      setError('올바른 일(1~31)을 입력해주세요.')
      return
    }

    setLoading(true)

    const input: SajuInput = {
      year: y,
      month: m,
      day: d,
      hour,
      minute: 0,
      isLunar,
      isLeapMonth,
      gender,
      name: trimmedName,
    }

    try {
      const { calculate } = await import('@/lib/saju/calculator')
      const { interpret } = await import('@/lib/saju/interpreter')

      const base = calculate(input)
      const cards = interpret(base)
      const result = { ...base, cards }

      // 결과를 sessionStorage에 저장
      sessionStorage.setItem('saju_result', JSON.stringify(result))

      // 입력값을 URL param으로 인코딩해 결과 페이지로 이동 (공유 가능한 URL)
      const encoded = encodeInput(input)
      router.push(`/result?d=${encodeURIComponent(encoded)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  if (loading) return <CandleLoader />

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 이름 (필수) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-gold)]">
          이름 <span className="text-[var(--color-crimson)]">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="예) 홍길동"
          required
          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-4 py-3 text-[var(--color-paper)] text-sm placeholder:text-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors"
        />
      </div>

      {/* 양/음력 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-gold)]">달력 기준</label>
        <CalendarToggle
          isLunar={isLunar}
          isLeapMonth={isLeapMonth}
          onChange={(lunar, leap) => { setIsLunar(lunar); setIsLeapMonth(leap) }}
        />
      </div>

      {/* 생년월일 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-gold)]">
          생년월일 <span className="text-[var(--color-crimson)]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="년 (예: 1990)"
            min={1900}
            max={2100}
            required
            className="col-span-3 sm:col-span-1 bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-4 py-3 text-[var(--color-paper)] text-sm placeholder:text-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="월 (1~12)"
            min={1}
            max={12}
            required
            className="bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-4 py-3 text-[var(--color-paper)] text-sm placeholder:text-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="일 (1~31)"
            min={1}
            max={31}
            required
            className="bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-4 py-3 text-[var(--color-paper)] text-sm placeholder:text-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* 태어난 시간 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-gold)]">태어난 시간</label>
        <TimeSelector hour={hour} onChange={setHour} />
      </div>

      {/* 성별 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-gold)]">
          성별 <span className="text-[var(--color-mist)] font-normal">(선택)</span>
        </label>
        <GenderSelector value={gender} onChange={setGender} />
      </div>

      {/* 오류 메시지 */}
      {error && (
        <p className="text-[var(--color-crimson-light)] text-sm text-center bg-[var(--color-crimson)]/10 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-[var(--color-paper)] text-base tracking-widest transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #9B1B30 0%, #6B1020 100%)',
          boxShadow: '0 4px 20px rgba(155,27,48,0.4), 0 1px 0 rgba(201,149,42,0.3) inset',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(155,27,48,0.6), 0 1px 0 rgba(201,149,42,0.4) inset'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,27,48,0.4), 0 1px 0 rgba(201,149,42,0.3) inset'
        }}
      >
        내 사주 보기 ✦
      </button>
    </form>
  )
}
