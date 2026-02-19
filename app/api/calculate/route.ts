import { NextRequest, NextResponse } from 'next/server'
import { calculate } from '@/lib/saju/calculator'
import { interpret } from '@/lib/saju/interpreter'
import type { SajuInput } from '@/lib/saju/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as SajuInput

    // 기본 유효성 검사
    const { year, month, day } = body
    if (!year || !month || !day) {
      return NextResponse.json({ error: '생년월일을 입력해주세요.' }, { status: 400 })
    }
    if (year < 1900 || year > 2100) {
      return NextResponse.json({ error: '지원되는 연도 범위(1900~2100)를 벗어났습니다.' }, { status: 400 })
    }

    const base = calculate(body)
    const cards = interpret(base)
    const result = { ...base, cards }

    return NextResponse.json(result)
  } catch (err) {
    console.error('[calculate] error:', err)
    return NextResponse.json(
      { error: '사주 계산 중 오류가 발생했습니다. 입력값을 확인해주세요.' },
      { status: 500 },
    )
  }
}
