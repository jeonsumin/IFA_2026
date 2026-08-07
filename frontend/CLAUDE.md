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

### 레이어 책임 (엄수 — 페이지에 로직 몰빵 금지)

**pages는 조립 + 네비게이션만 한다.** API 호출·폼 검증·비즈니스 상태를 페이지 컴포넌트 안에 인라인으로 넣지 마라. 아래로 뺀다:

- **API 호출** → `entities/<name>/api` (조회) 또는 `features/<action>/api` (액션). 페이지에서 `request.post(...)` 직접 호출 금지.
- **도메인 타입** → `entities/<name>/model/types.ts` (여러 슬라이스가 공유하는 단일 출처).
- **사용자 액션 + 상태(loading/error)** → `features/<action>/model/use-*.ts` 훅으로.
- **폼 상태·검증** → 해당 슬라이스의 `model/use-*.ts` 훅으로 분리 (페이지 UI 파일에 `errors`/검증 로직 인라인 금지).
- 페이지의 이벤트 핸들러(`handleX`)는 위 훅들을 **조합**하고 `navigate`만 호출한다.

참고 패턴: `features/submit-check-in`(api+훅) + `entities/user`(타입) + `pages/check-in/model/use-check-in-form.ts`(폼/검증 훅) → `pages/check-in/ui/check-in.tsx`는 조립만. `features/submit-survey` + `entities/survey`도 동일.

새 화면 구현 시: 제출/검증/API가 있으면 **먼저 features/entities/model 훅부터 만들고** 페이지는 그걸 쓰기만 하라. 인라인으로 시작해서 나중에 빼지 말 것.

### 슬라이스 내부 구조 & 액션 배치 (FSD 정석)

참조 표준: `jeonsumin/nukeapp` (전형적 FSD 레이아웃).

- **슬라이스 내부 폴더**: `api/`(요청 함수), `model/`(타입·store·`use-*` 훅), `lib/`(순수 유틸), `ui/`(컴포넌트), `index.ts`(배럴). 파일명은 **kebab-case** (`get-experience-status.ts`, `use-save-situation.ts`).
- **read는 entities, write 액션은 features** — 같은 도메인이라도 나눈다. 조회 함수는 `entities/<domain>/api`, 사용자 액션(생성/수정/삭제)은 `features/`로. 한 파일에 조회+액션 섞지 말 것.
  - 예: `entities/experience`(`getExperienceStatus` 조회) ↔ `features/experience/save-situation`·`features/experience/complete-qr`(저장·완료 액션).
- **여러 액션이 한 도메인에 속하면 도메인 그룹**: `features/<domain>/<action>/{api,model,ui}` (예: `features/experience/save-situation`). 도메인에 독립적인 단일 액션은 플랫 `features/<action>`도 허용 (예: `features/submit-check-in`).
- **각 액션 = api 함수 + `use-*` 훅(loading/error)**. 컴포넌트는 훅만 쓰고 `request`/api 함수를 직접 부르지 않는다. (참조: `features/submit-check-in` = `api/submit-check-in.ts` + `model/use-submit-check-in.ts`)
- **feature `ui/`는 트리거가 재사용될 때만 추출.** 여러 화면에서 공용으로 쓰는 버튼(예: nukeapp `AddToCartButton`) → `ui/`로 컴포넌트화. 호출처 1곳 + 위젯 로컬 상태·모달 플로우에 결합된 트리거 → **훅(model)만 노출**하고 UI는 호출처(위젯/페이지)에 둔다. 단일·결합 트리거를 UI로 빼면 상위 상태를 그대로 넘기는 얇은 래퍼만 생김(과추상 금지).

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
