'use client'

import { motion } from 'framer-motion'
import type { SajuPillar } from '@/lib/saju/types'
import { ELEMENT_COLOR } from '@/lib/saju/types'

interface FourPillarsProps {
  year: SajuPillar
  month: SajuPillar
  day: SajuPillar
  hour: SajuPillar | null
}

function PillarCard({ pillar, index }: { pillar: SajuPillar; index: number }) {
  const stemColor = ELEMENT_COLOR[pillar.stemElement]
  const branchColor = ELEMENT_COLOR[pillar.branchElement]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      {/* 기둥 레이블 */}
      <span className="text-xs text-[var(--color-mist)] mb-1.5 tracking-widest">
        {pillar.label}
      </span>

      {/* 위패 (位牌) 스타일 카드 */}
      <div className="pillar-tablet overflow-hidden" style={{ width: 68, minHeight: 132 }}>
        {/* 상단 단청 붉은 머리 */}
        <div className="pillar-tablet-cap" />

        {/* 한자 본체 */}
        <div className="flex flex-col items-center justify-center px-2 py-3 gap-0.5">
          {/* 천간 한자 */}
          <span
            className="text-[2rem] font-black leading-none"
            style={{
              fontFamily: 'var(--font-noto-serif, serif)',
              color: stemColor,
              textShadow: `0 1px 0 rgba(0,0,0,0.15)`,
            }}
          >
            {pillar.stemHanja}
          </span>
          <span
            className="text-[9px] leading-tight"
            style={{ color: '#8B6F4E', fontFamily: 'var(--font-noto-serif, serif)' }}
          >
            {pillar.stem} · {pillar.stemElement}
          </span>

          {/* 구분선 */}
          <div className="w-8 h-px bg-[#C8B888]/70 my-1.5" />

          {/* 지지 한자 */}
          <span
            className="text-[2rem] font-black leading-none"
            style={{
              fontFamily: 'var(--font-noto-serif, serif)',
              color: branchColor,
              textShadow: `0 1px 0 rgba(0,0,0,0.15)`,
            }}
          >
            {pillar.branchHanja}
          </span>
          <span
            className="text-[9px] leading-tight"
            style={{ color: '#8B6F4E', fontFamily: 'var(--font-noto-serif, serif)' }}
          >
            {pillar.branch} · {pillar.branchElement}
          </span>
        </div>
      </div>

      {/* 음양 */}
      <span className="text-[10px] text-[var(--color-mist)] mt-1.5">
        {pillar.stemYinYang}/{pillar.branchYinYang}
      </span>
    </motion.div>
  )
}

function UnknownPillarCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <span className="text-xs text-[var(--color-mist)] mb-1.5 tracking-widest">시주</span>
      <div
        className="overflow-hidden"
        style={{
          width: 68, minHeight: 132,
          background: 'linear-gradient(180deg, #F8EED8 0%, #EDD9B0 50%, #F8EED8 100%)',
          borderLeft: '1px dashed rgba(200,184,136,0.5)',
          borderRight: '1px dashed rgba(200,184,136,0.5)',
          borderBottom: '2px dashed rgba(139,23,23,0.4)',
          opacity: 0.45,
        }}
      >
        <div style={{
          height: 8,
          background: 'linear-gradient(135deg, #8B1717 0%, #B22222 50%, #8B1717 100%)',
          borderRadius: '2px 2px 0 0',
          opacity: 0.6,
        }} />
        <div className="flex flex-col items-center justify-center px-2 py-4 gap-1">
          <span
            className="text-2xl"
            style={{ fontFamily: 'var(--font-noto-serif, serif)', color: '#8B6F4E' }}
          >
            ?
          </span>
          <span
            className="text-[9px] text-center leading-snug"
            style={{ color: '#8B6F4E' }}
          >
            시간<br />미상
          </span>
        </div>
      </div>
      <span className="text-[10px] text-[var(--color-mist)]/40 mt-1.5">-/-</span>
    </motion.div>
  )
}

export default function FourPillars({ year, month, day, hour }: FourPillarsProps) {
  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-[var(--color-gold)] tracking-widest"
        style={{ fontFamily: 'var(--font-noto-serif, serif)' }}
      >
        사주팔자 (四柱八字)
      </motion.h2>

      <div className="flex justify-center gap-3 sm:gap-4">
        <PillarCard pillar={year} index={0} />
        <PillarCard pillar={month} index={1} />
        <PillarCard pillar={day} index={2} />
        {hour ? <PillarCard pillar={hour} index={3} /> : <UnknownPillarCard index={3} />}
      </div>
    </div>
  )
}
