'use client'

function SmallCandle({ delay, height = 40 }: { delay: string; height?: number }) {
  return (
    <div className="flex flex-col items-center opacity-65">
      <div className="flame-flicker" style={{ animationDelay: delay }}>
        <svg width="13" height="22" viewBox="0 0 20 32" fill="none">
          <path
            d="M10 0 C10 0 0 8 0 18 C0 26 5 32 10 32 C15 32 20 26 20 18 C20 8 10 0 10 0Z"
            fill="#C9952A" opacity="0.85"
          />
          <path
            d="M10 10 C10 10 5 16 5 21 C5 25 7 30 10 30 C13 30 15 25 15 21 C15 16 10 10 10 10Z"
            fill="#F0E6D3" opacity="0.65"
          />
        </svg>
      </div>
      <div className="w-px bg-[#3A2A1A]" style={{ height: 6 }} />
      <div style={{
        width: 10, height,
        background: 'linear-gradient(90deg, #D4C090 0%, #F0E2C4 50%, #D4C090 100%)',
        borderRadius: 2,
      }} />
      <div style={{ width: 16, height: 3, background: '#8B1717', borderRadius: '0 0 2px 2px' }} />
    </div>
  )
}

export default function CandleLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      {/* 세 개의 촛불 */}
      <div className="relative flex items-end gap-7">
        {/* 촛불 후광 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 70% at 50% 25%, rgba(201,149,42,0.22) 0%, transparent 70%)',
            animation: 'shrine-breath 1.8s ease-in-out infinite alternate',
          }}
        />

        <SmallCandle delay="0.35s" height={38} />

        {/* 가운데 큰 촛불 */}
        <div className="flex flex-col items-center">
          <div className="flame-flicker">
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
              <path
                d="M10 0 C10 0 0 8 0 18 C0 26 5 32 10 32 C15 32 20 26 20 18 C20 8 10 0 10 0Z"
                fill="url(#outerF)" opacity="0.92"
              />
              <path
                d="M10 8 C10 8 4 14 4 20 C4 25 7 30 10 30 C13 30 16 25 16 20 C16 14 10 8 10 8Z"
                fill="url(#innerF)"
              />
              <ellipse cx="10" cy="22" rx="3" ry="5" fill="rgba(255,252,240,0.9)" />
              <defs>
                <linearGradient id="outerF" x1="10" y1="0" x2="10" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C9952A" />
                  <stop offset="55%" stopColor="#9B1B30" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="innerF" x1="10" y1="8" x2="10" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F8F0DC" />
                  <stop offset="65%" stopColor="#C9952A" />
                  <stop offset="100%" stopColor="#9B1B30" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="w-px h-2 bg-[#3A2A1A]" />
          {/* 촛농 포함 몸체 */}
          <div className="relative">
            <div style={{
              width: 14, height: 58,
              background: 'linear-gradient(90deg, #D0BB82 0%, #F8EED8 45%, #D0BB82 100%)',
              borderRadius: 2,
              boxShadow: '2px 0 6px rgba(0,0,0,0.25)',
            }} />
            {/* 왼쪽 촛농 */}
            <div className="absolute -left-1 top-3" style={{
              width: 5, height: 16,
              borderRadius: '0 0 50% 50%',
              background: 'linear-gradient(180deg, #F0E2C4 50%, transparent 100%)',
              opacity: 0.75,
            }} />
          </div>
          <div style={{ width: 22, height: 4, background: '#B22222', borderRadius: '0 0 2px 2px' }} />
        </div>

        <SmallCandle delay="0.7s" height={44} />
      </div>

      {/* 텍스트 */}
      <div className="text-center space-y-1.5">
        <p
          className="text-[var(--color-gold)] text-lg tracking-widest"
          style={{ fontFamily: 'var(--font-noto-serif, serif)' }}
        >
          점괘를 뽑는 중...
        </p>
        <p className="text-[var(--color-mist)] text-sm tracking-wider">
          사주팔자를 계산하고 있습니다
        </p>
      </div>

      {/* 점진 도트 */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]"
            style={{ animation: `shrine-breath 1.2s ease-in-out ${i * 0.4}s infinite alternate` }}
          />
        ))}
      </div>
    </div>
  )
}
