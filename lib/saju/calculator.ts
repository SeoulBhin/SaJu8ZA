import {
  calculateFourPillars,
  lunarToSolar,
  type BirthInfo,
  type FourPillarsDetail,
} from 'manseryeok'
import type {
  SajuInput,
  SajuResult,
  SajuPillar,
  ElementDistribution,
  FiveElement,
  HeavenlyStem,
  EarthlyBranch,
  YinYang,
  PillarLabel,
} from './types'

// 시간 모름일 때 정오(12시)를 기본값으로 사용
const UNKNOWN_HOUR_PLACEHOLDER = 12

function buildPillar(
  label: PillarLabel,
  korean: string,
  hanja: string,
  stemElement: FiveElement,
  branchElement: FiveElement,
  stemYinYang: YinYang,
  branchYinYang: YinYang,
): SajuPillar {
  const [stem, branch] = korean.split('') as [HeavenlyStem, EarthlyBranch]
  const [stemHanja, branchHanja] = hanja.split('') as [string, string]
  return {
    label,
    stem,
    branch,
    stemHanja,
    branchHanja,
    stemElement,
    branchElement,
    stemYinYang,
    branchYinYang,
    korean,
    hanja,
  }
}

function calcElementDistribution(
  detail: FourPillarsDetail,
  includeHour: boolean,
): ElementDistribution {
  const dist: ElementDistribution = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 }
  const pillars = includeHour
    ? [detail.yearElement, detail.monthElement, detail.dayElement, detail.hourElement]
    : [detail.yearElement, detail.monthElement, detail.dayElement]

  for (const p of pillars) {
    dist[p.stem as FiveElement]++
    dist[p.branch as FiveElement]++
  }
  return dist
}

function dominantAndWeakest(dist: ElementDistribution): {
  dominant: FiveElement
  weakest: FiveElement
} {
  const entries = Object.entries(dist) as [FiveElement, number][]
  entries.sort((a, b) => b[1] - a[1])
  return {
    dominant: entries[0][0],
    weakest: entries[entries.length - 1][0],
  }
}

export function calculate(input: SajuInput): Omit<SajuResult, 'cards'> {
  let { year, month, day } = input
  const hourUnknown = input.hour === -1

  // 음력 → 양력 변환
  if (input.isLunar) {
    const solar = lunarToSolar(year, month, day, input.isLeapMonth)
    year = solar.year
    month = solar.month
    day = solar.day
  }

  const hour = hourUnknown ? UNKNOWN_HOUR_PLACEHOLDER : input.hour
  const minute = hourUnknown ? 0 : input.minute

  const birthInfo: BirthInfo = { year, month, day, hour, minute }
  const detail: FourPillarsDetail = calculateFourPillars(birthInfo)

  const hanjaObj = detail.toHanjaObject()

  const yearPillar = buildPillar(
    '년주',
    detail.yearString,
    detail.yearHanja,
    detail.yearElement.stem as FiveElement,
    detail.yearElement.branch as FiveElement,
    detail.yearYinYang.stem as YinYang,
    detail.yearYinYang.branch as YinYang,
  )

  const monthPillar = buildPillar(
    '월주',
    detail.monthString,
    detail.monthHanja,
    detail.monthElement.stem as FiveElement,
    detail.monthElement.branch as FiveElement,
    detail.monthYinYang.stem as YinYang,
    detail.monthYinYang.branch as YinYang,
  )

  const dayPillar = buildPillar(
    '일주',
    detail.dayString,
    detail.dayHanja,
    detail.dayElement.stem as FiveElement,
    detail.dayElement.branch as FiveElement,
    detail.dayYinYang.stem as YinYang,
    detail.dayYinYang.branch as YinYang,
  )

  let hourPillar: SajuPillar | null = null
  if (!hourUnknown) {
    hourPillar = buildPillar(
      '시주',
      detail.hourString,
      detail.hourHanja,
      detail.hourElement.stem as FiveElement,
      detail.hourElement.branch as FiveElement,
      detail.hourYinYang.stem as YinYang,
      detail.hourYinYang.branch as YinYang,
    )
  }

  const elements = calcElementDistribution(detail, !hourUnknown)
  const { dominant, weakest } = dominantAndWeakest(elements)

  return {
    input,
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    elements,
    dayMaster: dayPillar.stem,
    dayMasterElement: dayPillar.stemElement,
    dayMasterYinYang: dayPillar.stemYinYang,
    dominantElement: dominant,
    weakestElement: weakest,
  }
}
