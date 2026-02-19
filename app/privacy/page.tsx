import Link from 'next/link'
import MysticCard from '@/components/ui/MysticCard'

export const metadata = { title: '개인정보처리방침 | SaJu8ZA' }

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-trigram py-12 px-4">
      <div className="mist-layer" />
      <div className="relative z-10 max-w-lg mx-auto">
        <Link href="/" className="text-xs text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors mb-6 inline-block">
          ← 홈으로
        </Link>
        <MysticCard>
          <h1 className="text-xl font-bold text-[var(--color-gold)] mb-6" style={{ fontFamily: 'var(--font-noto-serif, serif)' }}>
            개인정보처리방침
          </h1>
          <div className="space-y-4 text-sm text-[var(--color-paper)]/80 leading-relaxed">
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">1. 수집하는 정보</h2>
              <p>SaJu8ZA는 사주 계산에 필요한 최소한의 정보만 사용합니다.</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[var(--color-mist)]">
                <li>생년월일 및 태어난 시간 (계산 목적)</li>
                <li>성별 (선택, 해석 참고용)</li>
                <li>별명 (선택, 화면 표시용)</li>
              </ul>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">2. 정보 보관</h2>
              <p>입력하신 정보는 <strong className="text-[var(--color-paper)]">서버에 저장되지 않습니다.</strong> 결과 저장 기능 사용 시 귀하의 기기(브라우저 로컬 스토리지)에만 저장됩니다.</p>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">3. 정보 삭제</h2>
              <p>결과 화면에서 '결과 삭제' 버튼을 누르거나, 브라우저 캐시를 초기화하시면 모든 저장 데이터가 즉시 삭제됩니다.</p>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">4. 금지 사항</h2>
              <p>주민등록번호를 포함한 민감한 개인정보는 수집하지 않으며, 수집할 수 없습니다.</p>
            </section>
          </div>
        </MysticCard>
      </div>
    </main>
  )
}
