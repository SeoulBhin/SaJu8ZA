# SaJu8ZA · 사주팔자

> 생년월일과 태어난 시간으로 나의 사주팔자와 오행 기운을 알아보는 한국 전통 사주 서비스
>
> https://seoulbhin.github.io/SaJu8ZA/

## 주요 기능

- **사주팔자 계산** — 양력/음력 생년월일, 태어난 시간 기반으로 년·월·일·시 사주 산출
- **오행 분포 분석** — 목·화·토·금·수 레이더 차트로 시각화
- **개인 해석 카드** — 일간(日干) 기반 성향·강점·주의점·직업·연애 해석
- **공유 기능** — 이미지 저장, 링크 복사, Web Share API (인스타그램 DM, 카카오톡, 디스코드 등)
- **개인정보 최소화** — 서버에 데이터를 저장하지 않음 (URL 파라미터 방식)

## 로컬 개발

### 요구 사항

- Node.js 18 이상
- pnpm (`npm install -g pnpm`)

# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:3000)
pnpm dev
```

### 주요 명령어

```bash
pnpm dev        # 개발 서버
pnpm build      # 프로덕션 빌드
pnpm lint       # ESLint 검사
pnpm type-check # TypeScript 타입 검사
```

---

## 기술 스택

| 항목 | 사용 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript 5 |
| 스타일링 | Tailwind CSS v4 |
| 사주 계산 | [manseryeok](https://www.npmjs.com/package/manseryeok) |
| 애니메이션 | Framer Motion |
| 차트 | Recharts |
| 이미지 생성 | html2canvas |
| 배포 | Vercel |

## 데이터 흐름

1. 입력값 → `/api/calculate` POST → 사주 계산 결과 반환
2. 결과를 `sessionStorage`에 저장 + URL 파라미터(`?d=...`)로 인코딩
3. 공유 링크 수신 시: URL 파라미터 디코딩 → API 재호출 (서버 DB 없음)
