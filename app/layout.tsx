import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "사주팔자 | SaJu8ZA",
  description: "나의 사주팔자를 확인해보세요. 생년월일과 태어난 시간으로 사주를 계산하고 오행 분포와 성향을 알아볼 수 있습니다.",
  keywords: ["사주", "사주팔자", "운세", "만세력", "오행", "사주보기"],
  openGraph: {
    title: "사주팔자 | SaJu8ZA",
    description: "나의 사주팔자를 무료로 확인해보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
      <body style={{ fontFamily: "var(--font-noto-sans), var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
