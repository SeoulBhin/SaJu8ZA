import { DAYMASTER_TEMPLATES } from '../templates/daymaster'
import { ELEMENT_DOMINANT, ELEMENT_WEAK } from '../templates/elements'
import type { SajuResult, InterpretCard, FiveElement } from './types'

type SajuBase = Omit<SajuResult, 'cards'>

export function interpret(base: SajuBase): InterpretCard[] {
  const cards: InterpretCard[] = []
  const dmTemplate = DAYMASTER_TEMPLATES[base.dayMaster]

  // 1. 일간 성향 카드
  cards.push(dmTemplate.personality)

  // 2. 오행 강세 카드
  const dominant = base.dominantElement
  const domInfo = ELEMENT_DOMINANT[dominant]
  cards.push({
    category: '성향',
    title: domInfo.title,
    body: domInfo.body,
    keywords: [dominant + ' 강세', '오행 분포'],
  })

  // 3. 일간 강점 카드
  cards.push(dmTemplate.strength)

  // 4. 일간 주의점 카드
  cards.push(dmTemplate.caution)

  // 5. 오행 부족 카드 (강세 오행과 다를 때만)
  const weakest = base.weakestElement
  if (weakest !== dominant) {
    const weakInfo = ELEMENT_WEAK[weakest]
    cards.push({
      category: '주의점',
      title: weakInfo.title,
      body: weakInfo.body,
      keywords: [weakest + ' 부족', '균형 필요'],
    })
  }

  // 6. 직업 카드
  cards.push(dmTemplate.career)

  // 7. 연애 카드
  cards.push(dmTemplate.love)

  return cards
}
