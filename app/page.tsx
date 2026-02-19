import BirthForm from '@/components/input/BirthForm'
import Disclaimer from '@/components/ui/Disclaimer'
import MysticCard from '@/components/ui/MysticCard'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-trigram flex flex-col items-center justify-start px-4 pb-12">
      {/* 홍살문 (紅箭門) — 신당 입구 장식 */}
      <div className="hongsalmun-bar w-full" />

      {/* 배경 안개 레이어 */}
      <div className="mist-layer" />

      <div className="relative z-10 w-full max-w-md pt-10">
        {/* 헤더 */}
        <div className="text-center mb-8 space-y-3">
          {/* 신장기 + 命 로고 */}
          <div className="relative flex items-start justify-center gap-5 mb-2">
            {/* 왼쪽 신장기 */}
            <div className="spirit-flag flex flex-col items-center mt-1 opacity-55" style={{ animationDelay: '0s' }}>
              <div className="w-px h-7" style={{ background: 'var(--color-crimson)' }} />
              <div style={{
                width: 14, height: 44,
                background: 'linear-gradient(180deg, #B22222 0%, #8B1717 100%)',
                color: '#F0E2C4',
                fontSize: 8,
                fontFamily: 'var(--font-noto-serif, serif)',
                fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                writingMode: 'vertical-rl',
                letterSpacing: '0.1em',
                borderRadius: 1,
              }}>
                神將
              </div>
            </div>

            {/* 인장 로고 */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[var(--color-gold)]/60"
              style={{ boxShadow: '0 0 24px rgba(201,149,42,0.28), 0 0 60px rgba(178,34,34,0.12)' }}
            >
              <span
                className="text-2xl text-[var(--color-gold)]"
                style={{
                  fontFamily: 'var(--font-noto-serif, serif)',
                  textShadow: '0 0 14px rgba(201,149,42,0.7)',
                }}
              >
                命
              </span>
            </div>

            {/* 오른쪽 신장기 */}
            <div className="spirit-flag flex flex-col items-center mt-1 opacity-55" style={{ animationDelay: '0.6s' }}>
              <div className="w-px h-7" style={{ background: 'var(--color-crimson)' }} />
              <div style={{
                width: 14, height: 44,
                background: 'linear-gradient(180deg, #B22222 0%, #8B1717 100%)',
                color: '#F0E2C4',
                fontSize: 8,
                fontFamily: 'var(--font-noto-serif, serif)',
                fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                writingMode: 'vertical-rl',
                letterSpacing: '0.1em',
                borderRadius: 1,
              }}>
                明運
              </div>
            </div>
          </div>

          <h1
            className="text-3xl font-black tracking-widest text-gold-gradient"
            style={{ fontFamily: 'var(--font-noto-serif, serif)' }}
          >
            사주팔자
          </h1>
          <p className="text-[var(--color-mist)] text-sm tracking-wider">
            SaJu8ZA · 四柱八字
          </p>
          <p className="text-[var(--color-paper)]/70 text-sm leading-relaxed pt-1">
            생년월일과 태어난 시간으로<br />
            나의 사주와 타고난 기운을 알아보세요
          </p>
        </div>

        {/* 입력 폼 카드 */}
        <MysticCard glow>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-gold)]/30" />
            <span
              className="text-[var(--color-gold)] text-xs tracking-widest"
              style={{ fontFamily: 'var(--font-noto-serif, serif)' }}
            >
              태어난 날을 알려주세요
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-gold)]/30" />
          </div>

          <BirthForm />
        </MysticCard>

        {/* 구분선 */}
        <hr className="divider-thread my-5" />

        {/* 고지 문구 */}
        <Disclaimer />

        {/* 하단 링크 */}
        <div className="flex justify-center gap-6 mt-4 text-xs text-[var(--color-mist)]">
          <a href="/privacy" className="hover:text-[var(--color-paper)] transition-colors">개인정보처리방침</a>
          <span>·</span>
          <a href="/terms" className="hover:text-[var(--color-paper)] transition-colors">이용약관</a>
        </div>
      </div>
    </main>
  )
}
