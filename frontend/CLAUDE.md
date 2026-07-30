# Front-end Rules

Figma 디자인을 코드로 옮길 때 지켜야 하는 규칙. 이 프로젝트 스택/구조에 맞춰 작성됨.

## Stack

- **React 19** + **Vite** (SPA) — Next.js / App Router 아님
- **react-router-dom v7** — 라우팅은 `app/routes`
- **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme` in `src/shared/styles/global.css`)
- **TypeScript**
- 아이콘: `lucide-react`
- 마크다운: `react-markdown` + `remark-gfm` / `remark-breaks`

모바일 우선(이벤트 체크인/설문 앱). 컨텐츠 폭은 CSS 변수로 고정 — `--maxWidth: 600px`, `--pcContentWidth: 680px`.

## 아키텍처 (Feature-Sliced Design)

레이어 위→아래로만 의존. 새 UI는 성격에 맞는 슬라이스에 둔다.

```
app/       프로바이더, 라우트, 전역 레이아웃
pages/     라우트 단위 화면 (home, check-in, promotion)
widgets/   페이지를 구성하는 독립 블록 (header, survey, qr-scanner, privacy)
features/  사용자 액션 단위 (submit-survey)
entities/  도메인 모델·API (survey)
shared/    범용 UI/유틸/설정 (ui, lib, api, styles)
```

- import는 alias 사용: `shared/*`, `entities/*`, `features/*`, `widgets/*`, `pages/*`, `app/*` (`vite.config.ts`에 정의).
- 슬라이스는 `index.ts` 배럴로 공개 API만 export. 내부 파일 직접 import 금지.

## 스타일

- **인라인 CSS 금지.** Tailwind 유틸 + 디자인 토큰만 사용.
- 색상은 **하드코딩 hex 금지** — `global.css`의 토큰만 사용:
  - 브랜드: `lg-red`, `lg-ai-pink`, `lg-ai-pink-purple`, `lg-ai-purple`
  - 그레이스케일: `lg-gray-1`~`lg-gray-7`
  - 시맨틱: `primary`, `foreground`, `background`, `border`, `ring`, `destructive` 등
  - 예: `bg-lg-red`, `text-lg-gray-3`, `border-border`
- 그라데이션은 브랜드 패턴 재사용: `bg-gradient-to-r from-lg-red via-lg-ai-pink to-lg-ai-purple`.
- 간격: Tailwind 기본 스케일(4px 배수) 사용 — `p-4`, `gap-2`, `mt-6`.
- 라운드: 토큰 기반 — `rounded-md/lg/xl`(→ `--radius` 0.65rem 파생). 버튼·pill은 `rounded-full`.
- Figma에 새 색/폰트/radius 토큰이 있으면 **먼저 `global.css`의 `@theme`/`:root`에 변수로 추가**한 뒤 유틸로 참조. 일회성 값 인라인 금지.

## 타이포그래피

- Figma 폰트 스펙 그대로. 폰트는 토큰: `--font-fz-da-hei-b02s`, `--font-fz-lan-ting-hei-s-r-gb`, `--font-fz-lan-ting-hei-s-db-gb` (`font-fz-*` 유틸).
- 크기/두께는 Tailwind 유틸(`text-lg`, `font-medium`)로 매핑.

## 컴포넌트

- 버튼은 항상 `shared/ui`의 `Button` 사용 (shadcn 아님). variant `primary|outline|ghost`, size `sm|md|lg`, `active` prop 있음.
- 기존 `shared/ui` 재사용: `Button`, `Input`, `Checkbox`, `Select`, `OtpInput`, `MarkupRenderer`. 새로 만들기 전에 여기부터 확인.
- className 병합은 `cn` 유틸(`shared/lib/cn`, clsx + tailwind-merge) 사용.
- 중복 JSX 금지 — 반복되면 컴포넌트/맵으로 추출.
- 새 공용 컴포넌트는 `shared/ui/<name>/<name>.tsx` + `index.ts` 배럴, `forwardRef` 패턴은 `button.tsx` 참고.

## 반응형

모바일 우선. 컨테이너 폭은 위 CSS 변수 기준. breakpoint 순서: mobile → tablet(`md:`) → desktop(`lg:`).

## 이미지

- `next/image` **사용 금지** (Next.js 아님).
- 정적 에셋은 `public/`에 두고 절대경로(`/img/foo.png`)로, 또는 `src`에서 import.
- 표준 `<img>` 사용, `alt` 필수.

## 접근성

- 인터랙티브 요소에 `aria-label` 등 접근 가능한 이름 부여.
- 아이콘 전용 버튼은 반드시 `aria-label`.

## Figma → 코드 체크리스트

1. 디자인의 변수/토큰 먼저 읽고 `global.css`와 대조 — 없는 토큰은 추가.
2. 화면이면 `pages/`, 재사용 블록이면 `widgets/`, 범용이면 `shared/ui/`에 배치.
3. `shared/ui` 기존 컴포넌트로 커버되는지 확인 후 신규 작성.
4. 색/폰트/간격/radius는 토큰·유틸로만. 인라인·하드코딩 없음.
