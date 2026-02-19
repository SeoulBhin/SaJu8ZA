import type { SajuResult } from './saju/types'

const STORAGE_KEY = 'saju8za_saved'
const MAX_SAVED = 5

export function saveResult(result: SajuResult): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const saved: SajuResult[] = raw ? JSON.parse(raw) : []
    // 중복 제거 (같은 생년월일+시간)
    const filtered = saved.filter(
      (r) =>
        !(
          r.input.year === result.input.year &&
          r.input.month === result.input.month &&
          r.input.day === result.input.day &&
          r.input.hour === result.input.hour
        )
    )
    const updated = [result, ...filtered].slice(0, MAX_SAVED)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // 저장 실패 시 무시
  }
}

export function loadSaved(): SajuResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function clearSaved(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
