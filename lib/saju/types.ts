// ── 기본 오행/간지 타입 ──────────────────────────────────────────────
export type FiveElement = '목' | '화' | '토' | '금' | '수'
export type HeavenlyStem = '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계'
export type EarthlyBranch = '자' | '축' | '인' | '묘' | '진' | '사' | '오' | '미' | '신' | '유' | '술' | '해'
export type YinYang = '양' | '음'
export type PillarLabel = '년주' | '월주' | '일주' | '시주'
export type Gender = 'male' | 'female' | 'unknown'
export type InterpretCategory = '성향' | '강점' | '주의점' | '직업' | '연애'

// ── 사주 입력 ──────────────────────────────────────────────────────
export interface SajuInput {
  year: number
  month: number
  day: number
  /** -1 이면 시간 모름 */
  hour: number
  minute: number
  isLunar: boolean
  isLeapMonth: boolean
  gender: Gender
  /** 이름 (필수, 공유 카드에 표시됨) */
  name: string
}

// ── 한 기둥 ────────────────────────────────────────────────────────
export interface SajuPillar {
  label: PillarLabel
  stem: HeavenlyStem
  branch: EarthlyBranch
  stemHanja: string
  branchHanja: string
  stemElement: FiveElement
  branchElement: FiveElement
  stemYinYang: YinYang
  branchYinYang: YinYang
  korean: string  // "갑자" 형식
  hanja: string   // "甲子" 형식
}

// ── 오행 분포 ──────────────────────────────────────────────────────
export interface ElementDistribution {
  목: number
  화: number
  토: number
  금: number
  수: number
}

// ── 해석 카드 ──────────────────────────────────────────────────────
export interface InterpretCard {
  category: InterpretCategory
  title: string
  body: string
  keywords: string[]
}

// ── 사주 최종 결과 ─────────────────────────────────────────────────
export interface SajuResult {
  input: SajuInput
  year: SajuPillar
  month: SajuPillar
  day: SajuPillar
  /** 시간 모름이면 null */
  hour: SajuPillar | null
  elements: ElementDistribution
  /** 일간 (일주 천간) */
  dayMaster: HeavenlyStem
  dayMasterElement: FiveElement
  dayMasterYinYang: YinYang
  dominantElement: FiveElement
  weakestElement: FiveElement
  cards: InterpretCard[]
}

// ── 십성 맵 ───────────────────────────────────────────────────────
export const HANJA_STEM: Record<HeavenlyStem, string> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊',
  기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
}

export const HANJA_BRANCH: Record<EarthlyBranch, string> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
}

export const ELEMENT_COLOR: Record<FiveElement, string> = {
  목: '#2D6B5A',   // 녹청 — 단청 목(木)
  화: '#B22222',   // 주홍 — 단청 화(火)
  토: '#C9952A',   // 황토 — 단청 토(土)
  금: '#9BA8B4',   // 백청 — 단청 금(金)
  수: '#1B4F8A',   // 군청 — 단청 수(水)
}

export const ELEMENT_LABEL_KR: Record<FiveElement, string> = {
  목: '木(목)',
  화: '火(화)',
  토: '土(토)',
  금: '金(금)',
  수: '水(수)',
}
