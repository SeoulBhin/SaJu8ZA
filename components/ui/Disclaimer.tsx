export default function Disclaimer() {
  return (
    <div className="text-center text-xs text-[var(--color-mist)] px-4 py-3 border border-[var(--color-mist)]/20 rounded-lg bg-[var(--color-surface)]/50 mt-6">
      본 서비스는 <strong className="text-[var(--color-paper)]/70">오락 및 참고 목적</strong>으로 제공됩니다.
      의료·법률·투자 조언이 아니며, 중요한 결정의 근거로 사용하지 마세요.
      <br />
      생년월일 정보는 사주 계산에만 사용되며 서버에 저장되지 않습니다.
    </div>
  )
}
