import Link from 'next/link'
import MysticCard from '@/components/ui/MysticCard'

export const metadata = { title: '이용약관 | SaJu8ZA' }

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-trigram py-12 px-4">
      <div className="mist-layer" />
      <div className="relative z-10 max-w-lg mx-auto">
        <Link href="/" className="text-xs text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors mb-6 inline-block">
          ← 홈으로
        </Link>
        <MysticCard>
          <h1 className="text-xl font-bold text-[var(--color-gold)] mb-6" style={{ fontFamily: 'var(--font-noto-serif, serif)' }}>
            이용약관
          </h1>
          <div className="space-y-4 text-sm text-[var(--color-paper)]/80 leading-relaxed">
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">1. 서비스 목적</h2>
              <p>SaJu8ZA는 전통 사주명리학을 기반으로 <strong className="text-[var(--color-paper)]">오락 및 참고 목적</strong>의 사주 정보를 제공합니다. 의료, 법률, 투자 등 중요한 결정의 근거로 사용하지 마십시오.</p>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">2. 타인 정보 입력</h2>
              <p>타인의 생년월일을 입력할 경우, 해당 정보 주체의 동의를 받은 후 사용하시기 바랍니다. 고인 또는 미성년자의 정보 입력 시 각별히 주의하십시오.</p>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">3. 결과의 한계</h2>
              <p>사주 결과는 전통적인 명리학 이론을 기반으로 하며, 개인의 실제 상황과 다를 수 있습니다. 결과에 대한 법적 책임은 지지 않습니다.</p>
            </section>
            <section>
              <h2 className="text-[var(--color-gold)] font-medium mb-2">4. 공유 주의</h2>
              <p>결과를 SNS 등에 공유할 때는 생년월일 마스킹 기능을 활용하여 개인정보가 노출되지 않도록 주의하십시오.</p>
            </section>
          </div>
        </MysticCard>
      </div>
    </main>
  )
}
