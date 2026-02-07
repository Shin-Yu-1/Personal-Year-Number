# Personal Year Number

생년월일과 기준 연도를 입력하면 해당 해의 개인 연도수(Personal Year Number)를 계산하고,  
숫자별 의미(키워드, 요약, 설명)를 함께 보여주는 웹 애플리케이션입니다.

Numerology의 1~9년 주기 개념을 바탕으로, 각 해의 흐름과 주목할 포인트를 간결하게 안내합니다.

---

## 주요 기능

- 생년월일(YYYY-MM-DD) + 기준 연도 입력
- 개인 연도수 계산(1~9로 환산)
- 숫자별 의미 제공
  - 타이틀
  - 키워드(칩 형태)
  - 요약(summary)
  - 상세 포인트(infos)

---

## 기술 스택

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- pnpm

---

## 실행 방법

### 1) 설치

```bash
pnpm install
```

### 2) 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 http://localhost:3000 로 접속합니다.

### 3) 빌드 / 실행

```bash
pnpm build
pnpm start
```

---

## 프로젝트 구조

이 프로젝트는 Feature(도메인) 단위로 코드를 묶는 구조를 사용합니다.

```bash
src/
├─ app/                          # 라우팅(페이지/레이아웃)
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ page.module.css
│
├─ features/
│  └─ personal-year/             # 개인 연도수 도메인(기능) 모듈
│     ├─ components/
│     │  ├─ PersonalYearResult.tsx
│     │  └─ PersonalYearResult.module.css
│     ├─ data/
│     │  └─ personalYear.ts      # 숫자별 의미 데이터(1~9)
│     ├─ hooks/
│     │  └─ usePersonalYear.ts   # 폼 상태/검증/계산 흐름
│     ├─ utils/
│     │  └─ calculate.ts         # 개인 연도수 계산 로직
│     └─ index.ts                # public export (barrel)
│
└─ styles/
   └─ globals.css                # 전역 스타일
```

#### 왜 Feature 구조인가요?

- 특정 기능의 컴포넌트/훅/유틸/데이터가 한 곳에 모여 유지보수하기 쉽습니다.
- 코드가 커져도 “어디를 고치면 되는지”가 명확해집니다.

---

## 계산 방식

개인 연도수는 아래 계산을 통해 1-9로 환산됩니다.  
생월 + 생일 + (기준연도의 자릿수 합을 1자리로 환산한 값)
결과값도 다시 1자리(1-9) 로 환산

```
예)
생일: 12월 28일
기준연도: 2026
기준연도 계산: 2+0+2+6 = 10 → 1
전체 합계: 1 + 2 + 2 + 8 + 1 = 1 + 4 = 5
결과: 5
```

---

## 코드 컨벤션 (간단)

도메인 내부에서만 쓰는 코드는 features/personal-year/\* 안에 둡니다.  
여러 기능에서 공통으로 쓰는 코드가 생기면 src/shared(또는 src/lib)로 분리합니다.

---

## 스크립트

```bash
pnpm dev # 개발 서버
pnpm build # 빌드
pnpm start # 프로덕션 실행
pnpm lint # 린트
```

---

## Screenshot

<img width="360" height="394" alt="image" src="https://github.com/user-attachments/assets/0fba2ed3-dff0-4762-a971-6551b5402bf8" />

