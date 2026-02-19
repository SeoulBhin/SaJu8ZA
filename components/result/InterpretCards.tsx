'use client'

import { motion } from 'framer-motion'
import type { InterpretCard, InterpretCategory } from '@/lib/saju/types'

const CATEGORY_STYLE: Record<InterpretCategory, { color: string; bg: string; icon: string }> = {
  성향: { color: '#C9952A', bg: 'rgba(201,149,42,0.08)', icon: '☯' },
  강점: { color: '#2D6B5A', bg: 'rgba(45,107,90,0.08)', icon: '✦' },
  주의점: { color: '#B22222', bg: 'rgba(178,34,34,0.08)', icon: '⚡' },
  직업: { color: '#9BA8B4', bg: 'rgba(155,168,180,0.08)', icon: '⚙' },
  연애: { color: '#C9952A', bg: 'rgba(201,149,42,0.06)', icon: '♥' },
}

interface InterpretCardsProps {
  cards: InterpretCard[]
  filter?: InterpretCategory | null
}

export default function InterpretCards({ cards, filter }: InterpretCardsProps) {
  const filtered = filter ? cards.filter((c) => c.category === filter) : cards

  return (
    <div className="space-y-4">
      {filtered.map((card, i) => {
        const style = CATEGORY_STYLE[card.category]
        return (
          <motion.div
            key={`${card.category}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="card-gold rounded-xl p-5 space-y-3"
            style={{ background: style.bg, borderColor: `${style.color}30` }}
          >
            {/* 헤더 */}
            <div className="flex items-start gap-3">
              <span
                className="text-lg mt-0.5 leading-none"
                style={{ color: style.color }}
              >
                {style.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ color: style.color, background: `${style.color}18` }}
                  >
                    {card.category}
                  </span>
                </div>
                <h3
                  className="text-base font-bold leading-snug"
                  style={{ color: style.color, fontFamily: 'var(--font-noto-serif, serif)' }}
                >
                  {card.title}
                </h3>
              </div>
            </div>

            {/* 본문 */}
            <p className="text-sm text-[var(--color-paper)]/80 leading-relaxed">
              {card.body}
            </p>

            {/* 키워드 태그 */}
            <div className="flex flex-wrap gap-2 pt-1">
              {card.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] px-2.5 py-1 rounded-full border"
                  style={{
                    color: style.color,
                    borderColor: `${style.color}30`,
                    background: `${style.color}08`,
                  }}
                >
                  # {kw}
                </span>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
