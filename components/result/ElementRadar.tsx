'use client'

import { motion } from 'framer-motion'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { ElementDistribution, FiveElement } from '@/lib/saju/types'
import { ELEMENT_COLOR, ELEMENT_LABEL_KR } from '@/lib/saju/types'

interface ElementRadarProps {
  elements: ElementDistribution
  dominant: FiveElement
  weakest: FiveElement
}

const ORDER: FiveElement[] = ['목', '화', '토', '금', '수']

export default function ElementRadar({ elements, dominant, weakest }: ElementRadarProps) {
  const data = ORDER.map((el) => ({
    element: el,
    label: el === '목' ? '木' : el === '화' ? '火' : el === '토' ? '土' : el === '금' ? '金' : '水',
    value: elements[el],
    fullMark: 8,
  }))

  const total = ORDER.reduce((s, el) => s + elements[el], 0)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="space-y-4"
    >
      <h2
        className="text-center text-sm text-[var(--color-gold)] tracking-widest"
        style={{ fontFamily: 'var(--font-noto-serif, serif)' }}
      >
        오행 분포 (五行分布)
      </h2>

      {/* 레이더 차트 */}
      <div className="relative w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <PolarGrid
              stroke="rgba(201,149,42,0.15)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="label"
              tick={{
                fill: 'var(--color-paper)',
                fontSize: 16,
                fontFamily: 'var(--font-noto-serif, serif)',
              }}
            />
            <Radar
              name="오행"
              dataKey="value"
              stroke="#C9952A"
              fill="#C9952A"
              fillOpacity={0.25}
              strokeWidth={1.5}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-surface)',
                border: '1px solid rgba(201,149,42,0.3)',
                borderRadius: 8,
                color: 'var(--color-paper)',
                fontSize: 12,
              }}
              formatter={(value, _name, props) => [
                `${value ?? 0}개`,
                ELEMENT_LABEL_KR[(props as { payload: { element: FiveElement } }).payload.element],
              ]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 오행 막대 수치 */}
      <div className="space-y-2">
        {ORDER.map((el) => {
          const count = elements[el]
          const pct = total > 0 ? (count / total) * 100 : 0
          const color = ELEMENT_COLOR[el]
          const isDominant = el === dominant
          const isWeakest = el === weakest

          return (
            <div key={el} className="flex items-center gap-3">
              <span
                className="w-6 text-center text-sm font-bold"
                style={{ fontFamily: 'var(--font-noto-serif, serif)', color }}
              >
                {el === '목' ? '木' : el === '화' ? '火' : el === '토' ? '土' : el === '금' ? '金' : '水'}
              </span>
              <div className="flex-1 h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: color }}
                />
              </div>
              <span className="text-xs w-6 text-right" style={{ color }}>
                {count}
              </span>
              {isDominant && (
                <span className="text-[10px] text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-1.5 py-0.5 rounded-full">
                  강
                </span>
              )}
              {isWeakest && count === 0 && (
                <span className="text-[10px] text-[var(--color-crimson)] bg-[var(--color-crimson)]/10 px-1.5 py-0.5 rounded-full">
                  무
                </span>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
