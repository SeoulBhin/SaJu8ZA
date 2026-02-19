'use client'

import { useRef, useState } from 'react'
import type { SajuResult } from '@/lib/saju/types'
import { ELEMENT_COLOR } from '@/lib/saju/types'
import { saveResult } from '@/lib/storage'
import { encodeInput } from '@/components/input/BirthForm'

interface ShareCardProps {
  result: SajuResult
}

/** canvas → Blob Promise */
function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('canvas.toBlob 실패'))
    }, 'image/png')
  })
}

/** 현재 URL 기반 공유 링크 생성 */
function buildShareUrl(result: SajuResult): string {
  if (typeof window === 'undefined') return ''
  const encoded = encodeInput(result.input)
  return `${window.location.origin}/result?d=${encodeURIComponent(encoded)}`
}

export default function ShareCard({ result }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [maskName, setMaskName] = useState(false)
  const [maskDate, setMaskDate] = useState(true)
  const [saved, setSaved] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [shareStatus, setShareStatus] = useState('')
  const [showUrlBox, setShowUrlBox] = useState(false)

  const dmColor = ELEMENT_COLOR[result.dayMasterElement]
  const displayName = maskName ? '***' : result.input.name
  const { year, month, day, hour } = result.input
  const dateStr = maskDate
    ? `${year.toString().slice(0, 2)}**년 **월 **일`
    : `${year}년 ${month}월 ${day}일${hour === -1 ? '' : ` (${hour}시)`}`

  /** html2canvas로 PNG 생성 */
  async function generateImage() {
    const { default: html2canvas } = await import('html2canvas')
    if (!cardRef.current) throw new Error('카드 DOM 없음')

    return html2canvas(cardRef.current, {
      backgroundColor: '#0D0A0E',
      scale: 2,
      useCORS: true,
      // 폰트가 로드되기 전 렌더링 방지
      onclone: (doc) => {
        const card = doc.querySelector('[data-share-card]') as HTMLElement
        if (card) {
          // 시스템 serif 폰트 강제 적용 (한자 렌더링 보장)
          card.style.fontFamily = '"Noto Serif KR", "Apple SD Gothic Neo", "Malgun Gothic", serif'
        }
      },
    })
  }

  /** 이미지 다운로드 (데스크탑 폴백) */
  async function handleDownload() {
    setSharing(true)
    setShareStatus('')
    try {
      const canvas = await generateImage()
      const link = document.createElement('a')
      link.download = `saju8za_${result.input.name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setShareStatus('이미지가 저장되었습니다.')
    } catch (err) {
      console.error('다운로드 실패:', err)
      setShareStatus('이미지 저장에 실패했습니다.')
    } finally {
      setSharing(false)
    }
  }

  /** Web Share API — 모바일 시스템 공유 시트 */
  async function handleNativeShare() {
    setSharing(true)
    setShareStatus('')
    const shareUrl = buildShareUrl(result)
    const title = `${displayName}의 사주팔자`
    const text = `${displayName}의 사주를 확인해보세요! (${result.dayMaster}일간 · ${result.dominantElement} 강세)`

    try {
      const canvas = await generateImage()
      const blob = await canvasToBlob(canvas)
      const file = new File([blob], `saju8za_${result.input.name}.png`, { type: 'image/png' })

      // 이미지 파일 공유 (인스타그램 DM, 디스코드 등)
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title, text, url: shareUrl })
        setShareStatus('공유가 완료되었습니다.')
      } else if (navigator.share) {
        // 이미지 미지원 브라우저 — URL만 공유
        await navigator.share({ title, text, url: shareUrl })
        setShareStatus('링크가 공유되었습니다.')
      } else {
        // 데스크탑 폴백 — 이미지 다운로드
        const link = document.createElement('a')
        link.download = `saju8za_${result.input.name}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        setShareStatus('데스크탑에서는 이미지를 저장 후 직접 공유해주세요.')
      }
    } catch (err: unknown) {
      // 사용자가 공유를 취소한 경우 무시
      if (err instanceof Error && err.name !== 'AbortError') {
        setShareStatus('공유 중 오류가 발생했습니다.')
        console.error(err)
      }
    } finally {
      setSharing(false)
    }
  }

  /** 링크 클립보드 복사 — navigator.clipboard 실패 시 textarea 폴백 */
  async function handleCopyLink() {
    const shareUrl = buildShareUrl(result)

    // 1) Modern clipboard API
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl)
        setShareStatus('✓ 링크가 복사되었습니다. DM에 붙여넣기 하세요!')
        setTimeout(() => setShareStatus(''), 3000)
        return
      } catch { /* fall through */ }
    }

    // 2) execCommand 폴백 (구형 브라우저 / HTTP 환경)
    try {
      const ta = document.createElement('textarea')
      ta.value = shareUrl
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setShareStatus('✓ 링크가 복사되었습니다. DM에 붙여넣기 하세요!')
      setTimeout(() => setShareStatus(''), 3000)
    } catch {
      // 3) 최후 폴백: URL 직접 노출
      setShowUrlBox(true)
      setShareStatus('아래 URL을 직접 선택해 복사하세요.')
    }
  }

  function handleSave() {
    saveResult(result)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* 마스킹 토글 */}
      <div className="space-y-2.5">
        {[
          { label: '이름 가리기', value: maskName, onChange: setMaskName },
          { label: '생년월일 가리기 (개인정보 보호)', value: maskDate, onChange: setMaskDate },
        ].map(({ label, value, onChange }) => (
          <label key={label} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input type="checkbox" className="sr-only" checked={value} onChange={(e) => onChange(e.target.checked)} />
              <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-[var(--color-crimson)]' : 'bg-[var(--color-surface-2)]'} border border-[var(--color-gold)]/20`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[var(--color-paper)] transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm text-[var(--color-mist)] group-hover:text-[var(--color-paper)] transition-colors">{label}</span>
          </label>
        ))}
      </div>

      {/* 공유 카드 미리보기 */}
      <div
        ref={cardRef}
        data-share-card
        className="rounded-2xl p-6 space-y-4 mx-auto"
        style={{
          background: 'linear-gradient(135deg, #1A1220 0%, #0D0A0E 100%)',
          border: '1px solid rgba(201,149,42,0.45)',
          boxShadow: '0 0 40px rgba(201,149,42,0.12)',
          maxWidth: 320,
          fontFamily: '"Noto Serif KR", serif',
        }}
      >
        {/* 헤더 */}
        <div className="text-center space-y-0.5">
          <p style={{ fontSize: 10, color: '#5A4F5E', letterSpacing: '0.15em' }}>SaJu8ZA · 四柱八字</p>
          <p style={{ fontSize: 13, color: '#C9952A', fontWeight: 700 }}>{displayName}</p>
          <p style={{ fontSize: 10, color: '#5A4F5E60' }}>{dateStr}</p>
        </div>

        {/* 일간 원 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${dmColor}`,
              color: dmColor,
              fontSize: 32, fontWeight: 900,
              boxShadow: `0 0 24px ${dmColor}50`,
              background: `${dmColor}15`,
            }}
          >
            {result.day.stemHanja}
          </div>
        </div>

        {/* 4기둥 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {[result.year, result.month, result.day, result.hour].map((pillar, i) => {
            const labels = ['년주', '월주', '일주', '시주']
            if (!pillar) {
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 64 }}>
                  <span style={{ fontSize: 9, color: '#5A4F5E', marginBottom: 4 }}>{labels[i]}</span>
                  <div style={{
                    width: 64, height: 60,
                    border: '1px dashed rgba(90,79,94,0.4)',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: 'rgba(90,79,94,0.4)', fontSize: 20 }}>?</span>
                  </div>
                </div>
              )
            }
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 64 }}>
                <span style={{ fontSize: 9, color: '#5A4F5E', marginBottom: 4 }}>{labels[i]}</span>
                <div style={{
                  width: 64, height: 60,
                  border: `1px solid ${ELEMENT_COLOR[pillar.stemElement]}50`,
                  borderRadius: 8,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 2,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: ELEMENT_COLOR[pillar.stemElement], lineHeight: 1 }}>{pillar.stemHanja}</span>
                  <span style={{ fontSize: 18, fontWeight: 900, color: ELEMENT_COLOR[pillar.branchElement], lineHeight: 1 }}>{pillar.branchHanja}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* 키워드 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
          {result.cards.slice(0, 2).flatMap((c) => c.keywords).slice(0, 5).map((kw, i) => (
            <span key={i} style={{
              fontSize: 10, padding: '3px 8px', borderRadius: 9999,
              color: dmColor, background: `${dmColor}18`,
              border: `1px solid ${dmColor}30`,
            }}>
              # {kw}
            </span>
          ))}
        </div>

        {/* 인장 + 일간 정보 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ fontSize: 10, color: '#5A4F5E' }}>
            {result.dayMaster}일간 · {result.dominantElement} 강세
          </p>
          <div style={{
            border: `2px solid #9B1B30`,
            color: '#9B1B30', padding: '2px 6px',
            borderRadius: 4, fontSize: 12, fontWeight: 700,
            transform: 'rotate(-8deg)', opacity: 0.8,
          }}>
            命
          </div>
        </div>
      </div>

      {/* 상태 메시지 */}
      {shareStatus && (
        <p className="text-center text-sm text-[var(--color-gold)]">{shareStatus}</p>
      )}

      {/* 버튼 그룹 */}
      <div className="space-y-3">
        {/* 메인: 공유하기 (Web Share API / 다운로드 폴백) */}
        <button
          onClick={handleNativeShare}
          disabled={sharing}
          className="w-full py-4 rounded-xl font-bold text-[var(--color-paper)] text-sm tracking-wider transition-all duration-300 disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, #9B1B30 0%, #6B1020 100%)',
            boxShadow: '0 4px 20px rgba(155,27,48,0.4)',
          }}
        >
          {sharing ? '준비 중...' : '📤 이미지로 공유하기'}
        </button>

        <div className="grid grid-cols-2 gap-3">
          {/* 링크 복사 */}
          <button
            onClick={handleCopyLink}
            className="py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
          >
            🔗 링크 복사
          </button>

          {/* 이미지만 저장 */}
          <button
            onClick={handleDownload}
            disabled={sharing}
            className="py-3 rounded-xl text-sm font-medium transition-all duration-200 border border-[var(--color-jade)]/40 text-[var(--color-jade)] hover:bg-[var(--color-jade)]/10 disabled:opacity-50"
          >
            ⬇ 이미지 저장
          </button>
        </div>

        {/* 결과 로컬 저장 */}
        <button
          onClick={handleSave}
          className="w-full py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-[var(--color-mist)] hover:text-[var(--color-paper)] border border-[var(--color-mist)]/20 hover:border-[var(--color-mist)]/40"
        >
          {saved ? '저장됨 ✓' : '이 기기에 결과 저장 (재방문 시 로드)'}
        </button>
      </div>

      {/* URL 직접 복사 박스 (폴백) */}
      {showUrlBox && (
        <div className="space-y-1.5">
          <p className="text-xs text-[var(--color-gold)]">아래 URL을 드래그해서 복사하세요:</p>
          <input
            readOnly
            value={buildShareUrl(result)}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="w-full bg-[var(--color-surface-2)] border border-[var(--color-gold)]/30 rounded-lg px-3 py-2 text-[var(--color-mist)] text-xs focus:outline-none focus:border-[var(--color-gold)]/60 cursor-text"
          />
        </div>
      )}

      {/* 공유 안내 */}
      <p className="text-xs text-[var(--color-mist)] text-center leading-relaxed">
        📱 모바일: &quot;이미지로 공유&quot; 탭 시 인스타그램 DM, 디스코드, 카카오톡 등으로 바로 전송 가능
        <br />
        💻 데스크탑: 이미지 저장 후 DM에 첨부하거나, 링크를 복사해 공유하세요
      </p>
    </div>
  )
}
