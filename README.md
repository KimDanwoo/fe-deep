<div align="center">

# 프딥 — 프론트엔드, 딥하게 알자

해당 프로젝트는 https://github.com/KimDanwoo/labs로 이관되었습니다.
프론트엔드 기술면접의 핵심 개념을 **레퍼런스 · 플래시카드 · 데일리 학습**으로 익히는 학습 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20RLS-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

</div>

<br>

## Overview

프론트엔드 기술면접에 필요한 개념을 여러 학습 방식으로 제공합니다. **대규모 트래픽 · SEO · 장기 유지보수**를 전제로,
"빠르게 동작하는 코드"보다 **의도가 명확하고 되돌리기 쉬운 코드**를 목표로 설계했습니다.

- 📚 **레퍼런스** — 카테고리별 면접 질문/답변, SSG + ISR로 정적 서빙
- 🃏 **플래시카드** — SM-2 간격 반복 알고리즘 기반 복습
- 🔥 **데일리 학습** — 학습 스트릭 트래킹
- 🔍 **검색** — 질문 전문 검색
- 👤 **마이페이지** — 학습 진도 · 북마크
- 🛠 **어드민** — 질문 CRUD, Gemini 기반 질문 후보 자동 생성

<br>

## Screenshots

> _데모 화면 캡처 자리 (`docs/` 또는 `public/`에 이미지 추가 후 링크)_
>
> | 홈 | 레퍼런스 | 플래시카드 |
> | :-: | :-: | :-: |
> | _(추가 예정)_ | _(추가 예정)_ | _(추가 예정)_ |

<br>

## Tech Stack

| 영역      | 기술                                          |
| --------- | --------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19)             |
| Language  | TypeScript                                    |
| Styling   | Tailwind CSS 4, shadcn/ui, Radix UI           |
| Data      | React Query (client), Server Components (SSR) |
| Database  | Supabase (PostgreSQL + Auth + RLS)            |
| Animation | Framer Motion                                 |
| Markdown  | react-markdown, rehype-highlight, remark-gfm  |
| AI        | Google Gemini (질문 후보 자동 생성 — CLI)     |
| Deploy    | Vercel                                        |

<br>

## Architecture — FSD 2.1 (views-first)

Feature-Sliced Design 기반. **views(pages)에서 시작하고 재사용 압력이 생길 때만 하위 레이어로 분리**하는 원칙을 따릅니다.

```
src/
├── app/                  # 라우팅 진입점 (얇게 유지) + 전역 설정
│   ├── (main)/           # 사용자 페이지
│   │   ├── reference/        # 레퍼런스 (카테고리별 Q&A, ISR)
│   │   ├── learn/            # 플래시카드 · 데일리
│   │   ├── search/           # 검색
│   │   ├── mypage/           # 진도 · 북마크
│   │   └── auth/             # 인증 (Google OAuth)
│   ├── admin/            # 어드민 (질문 CRUD, AI 생성)
│   ├── sitemap.ts        # 동적 사이트맵 (카테고리 자동 포함)
│   └── robots.ts         # 크롤링 규칙
│
├── views/                # 페이지 단위 조립 (화면 로직)
├── widgets/              # 조합된 독립 UI 블록 (헤더, 푸터)
├── features/             # 사용자 행동 (북마크, 인증, 피드백)
├── entities/             # 도메인 모델 (question, progress)
└── shared/               # 공통 인프라 (ui, lib, config, supabase)
```

**의존성 방향 (단방향):** `app → views → widgets → features → entities → shared`

- 라우트 파일은 얇게, 화면 로직은 `views`에 위임
- 비즈니스 로직은 `entities`/`features`, UI는 도메인 무지(domain-agnostic) 유지
- import는 슬라이스 공개 API(`index.ts`)를 통해서만

<br>

## Database Schema

```
categories ─┐
             ├── questions ──┬── quiz_options
             │               ├── user_progress
             │               └── bookmarks
             └── daily_streaks
```

- `categories` / `questions` — 공개 읽기 (RLS)
- `user_progress` / `bookmarks` / `daily_streaks` — 사용자별 접근 제어 (RLS)

<br>

## SEO & Security

포트폴리오 프로젝트지만 프로덕션 기준으로 다듬었습니다.

- **SEO** — `generateMetadata` 동적 메타/OG, `sitemap.ts`(카테고리 자동 반영), `robots.ts`, JSON-LD
- **렌더링** — 레퍼런스는 SSG + ISR(`revalidate`)로 정적 서빙, 상호작용 영역만 클라이언트 컴포넌트
- **경계 처리** — `error.tsx` · `not-found.tsx` · `loading.tsx`로 로딩/에러 UX 보장
- **보안 헤더** — `next.config.ts`에서 HSTS · X-Frame-Options · Permissions-Policy 등 적용
- **비밀 관리** — `service_role` 키는 서버 전용(`SUPABASE_SERVICE_ROLE_KEY`)으로만 사용, 클라이언트 번들 노출 금지

<br>

## Getting Started

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.local.example .env.local
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 등 값 채우기

# 3. 개발 서버 실행
npm run dev
```

`http://localhost:3009`에서 확인할 수 있습니다.

<br>

## Scripts

```bash
npm run dev       # 개발 서버 (port 3009)
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버
npm run lint      # ESLint 검사

# 질문 후보 자동 생성 (Gemini) — GEMINI_API_KEY 필요
node scripts/suggest-questions.mjs
```

<br>

## License

[MIT](./LICENSE) © KimDanwoo
