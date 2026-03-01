'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import FourPillars from '@/components/result/FourPillars'
import ElementRadar from '@/components/result/ElementRadar'
import InterpretCards from '@/components/result/InterpretCards'
import TabNav from '@/components/ui/TabNav'
import MysticCard from '@/components/ui/MysticCard'
import CandleLoader from '@/components/ui/CandleLoader'
import ShareCard from '@/components/result/ShareCard'
import type { SajuResult, SajuInput, InterpretCategory } from '@/lib/saju/types'
import { ELEMENT_COLOR } from '@/lib/saju/types'

const TABS = [
  { id: 'pillars', label: '① 사주표' },
  { id: 'elements', label: '② 오행' },
  { id: 'interpret', label: '③ 해석' },
  { id: 'share', label: '④ 공유' },
]

const FILTER_TABS: { id: InterpretCategory | 'all'; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: '성향', label: '성향' },
  { id: '강점', label: '강점' },
  { id: '주의점', label: '주의점' },
  { id: '직업', label: '직업' },
  { id: '연애', label: '연애' },
]

/** base64 URL param → SajuInput 디코딩 (한글 지원) */
function decodeInput(encoded: string): SajuInput {
  const json = decodeURIComponent(atob(decodeURIComponent(encoded)))
  return JSON.parse(json)
}

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<SajuResult | null>(null)
  const [tab, setTab] = useState('pillars')
  const [interpretFilter, setInterpretFilter] = useState<InterpretCategory | 'all'>('all')
  const [linkError, setLinkError] = useState('')

  useEffect(() => {
    async function loadResult() {
      // 1. sessionStorage 우선 (본인 세션)
      const raw = sessionStorage.getItem('saju_result')
      if (raw) {
        try {
          setResult(JSON.parse(raw))
          return
        } catch { /* 손상된 데이터 무시 */ }
      }

      // 2. URL param 에서 입력값 디코딩 → 클라이언트 사이드 계산 (공유 링크 수신 시)
      const d = searchParams.get('d')
      if (d) {
        try {
          const input = decodeInput(d)
          const { calculate } = await import('@/lib/saju/calculator')
          const { interpret } = await import('@/lib/saju/interpreter')
          const base = calculate(input)
          const cards = interpret(base)
          const data = { ...base, cards }
          sessionStorage.setItem('saju_result', JSON.stringify(data))
          setResult(data as SajuResult)
        } catch {
          setLinkError('공유 링크가 올바르지 않습니다. 홈으로 이동합니다.')
          setTimeout(() => router.replace('/'), 2500)
        }
        return
      }

      // 3. 데이터 없음 → 홈으로
      router.replace('/')
    }

    loadResult()
  }, [router, searchParams])

  if (linkError) {
    return (
      <main className="min-h-screen bg-trigram flex items-center justify-center px-4">
        <div className="mist-layer" />
        <p className="relative z-10 text-[var(--color-crimson-light)] text-center">{linkError}</p>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-trigram flex items-center justify-center">
        <div className="mist-layer" />
        <CandleLoader />
      </main>
    )
  }

  const dmColor = ELEMENT_COLOR[result.dayMasterElement]

  return (
    <main className="relative min-h-screen bg-trigram py-8 px-4">
      <div className="mist-layer" />

      <div className="relative z-10 w-full max-w-md mx-auto space-y-6">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <button
            onClick={() => router.push('/')}
            className="text-xs text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors mb-2 inline-flex items-center gap-1"
          >
            ← 다시 보기
          </button>

          <p className="text-[var(--color-mist)] text-sm">
            <span className="text-[var(--color-gold)]">{result.input.name}</span>님의 사주
          </p>

          {/* 일간 강조 */}
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 text-2xl font-black"
              style={{
                fontFamily: 'var(--font-noto-serif, serif)',
                borderColor: dmColor,
                color: dmColor,
                boxShadow: `0 0 20px ${dmColor}40`,
                background: `${dmColor}10`,
              }}
            >
              {result.day.stemHanja}
            </div>
            <div>
              <p
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-noto-serif, serif)', color: dmColor }}
              >
                {result.dayMaster}일간 ({result.dayMasterYinYang} {result.dayMasterElement})
              </p>
              <p className="text-xs text-[var(--color-mist)]">
                강한 기운: <span style={{ color: ELEMENT_COLOR[result.dominantElement] }}>{result.dominantElement}</span>
                {'  '}
                부족한 기운: <span style={{ color: ELEMENT_COLOR[result.weakestElement] }}>{result.weakestElement}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* 탭 */}
        <MysticCard className="overflow-hidden !p-0">
          <TabNav tabs={TABS} active={tab} onChange={setTab} />

          <div className="p-5">
            {tab === 'pillars' && (
              <FourPillars
                year={result.year}
                month={result.month}
                day={result.day}
                hour={result.hour}
              />
            )}

            {tab === 'elements' && (
              <ElementRadar
                elements={result.elements}
                dominant={result.dominantElement}
                weakest={result.weakestElement}
              />
            )}

            {tab === 'interpret' && (
              <div className="space-y-4">
                <div className="flex gap-1.5 flex-wrap">
                  {FILTER_TABS.map((ft) => (
                    <button
                      key={ft.id}
                      onClick={() => setInterpretFilter(ft.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        interpretFilter === ft.id
                          ? 'bg-[var(--color-crimson)] text-[var(--color-paper)]'
                          : 'bg-[var(--color-surface-2)] text-[var(--color-mist)] hover:text-[var(--color-paper)]'
                      }`}
                    >
                      {ft.label}
                    </button>
                  ))}
                </div>
                <InterpretCards
                  cards={result.cards}
                  filter={interpretFilter === 'all' ? null : interpretFilter}
                />
              </div>
            )}

            {tab === 'share' && <ShareCard result={result} />}
          </div>
        </MysticCard>

        <div className="text-center text-xs text-[var(--color-mist)] pb-4">
          본 결과는 오락·참고 목적이며, 중요한 결정의 근거로 삼지 마세요.
        </div>
      </div>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-trigram flex items-center justify-center">
          <div className="mist-layer" />
          <CandleLoader />
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
