# msw-e2e-example

[MSW](https://mswjs.io/), [@dhlab/msw-auto-mock](https://github.com/dhlab-org/msw-auto-mock), [@dhlab/e2e-autogen](https://github.com/dhlab-org/e2e-autogen), [Playwright](https://playwright.dev/) 통합 예시입니다.

## 📑 목차

- [Flow](#🔄-flow)
- [MSW 설정](#🔧-msw-설정)
  - [의존성 설치](#📦-의존성-설치)
  - [서비스 워커 설정](#⚙️-서비스-워커-설정)
  - [커스텀 컨트롤러](#🎮-커스텀-컨트롤러)
  - [시나리오 설정](#📝-시나리오-설정)
- [구글 시트 작성](#📊-구글-시트-작성)
  - [테스트 케이스 작성](#✍️-테스트-케이스-작성)
  - [스텁 코드 생성](#🤖-스텁-코드-생성)
- [E2E 테스트 구현](#🎭-e2e-테스트-구현)
  - [Playwright 설정](#⚙️-playwright-설정)
  - [테스트 작성](#✏️-테스트-작성)
  - [테스트 실행](#▶️-테스트-실행)
  - [테스트 결과 업데이트](#📈-테스트-결과-업데이트)

## 🔄 Flow

1. OpenAPI 명세를 기반으로 MSW 핸들러 자동 생성 (`msw-auto-mock`)
2. 커스텀 컨트롤러 주입 (`msw-auto-mock`)
3. 시나리오 기반 API 응답 제어 (`msw-auto-mock`)
4. 구글 시트에서 테스트 케이스 작성 및 관리
5. e2e-autogen으로 스텁 코드 자동 생성 (`e2e-autogen`)
6. Playwright codegen, Cursor AI를 활용하여 E2E 테스트 작성
7. 구글 시트에 테스트 결과 자동 업데이트 (`e2e-autogen`)

## 🔧 MSW 설정

### 📦 의존성 설치

```bash
yarn add -D @dhlab/msw-auto-mock @msw/playwright msw @faker-js/faker
```

### ⚙️ 서비스 워커 설정

1. `package.json`에 MSW 설정 추가

```json
{
  "msw": {
    "workerDirectory": ["public"]
  }
}
```

2. MSW 서비스 워커 생성

```bash
npx msw init public/ --save
```

### 🎮 커스텀 컨트롤러

1. [`tests/mocks/controllers/user.ts`](./tests/mocks/controllers/user.ts) 생성
   - 기본적으로 테스트에 필요한 mock 데이터를 faker를 통해 생성되지만,
   - 커스텀이 필요한 데이터의 경우 만들어서 주입할 수 있음

### 📝 시나리오 설정

`msw-auto-mock`으로 자동 생성된 `tests/mocks/scenarios.ts`에 커스텀 시나리오 설정

```typescript
export const scenarios: TScenarioConfig = {
  "TC-1.1": {
    description: "유저 목록 조회 성공 시나리오",
    api: {
      "/users": {
        GET: { status: 200 },
        POST: { status: 201 },
      },
    },
  },
  "TC-1.2": {
    description: "유저 목록 조회 실패 시나리오",
    api: {
      "/users": {
        GET: { status: 400, allowCustomStatus: true },
        POST: { status: 400 },
      },
    },
  },
};
```

## 📊 구글 시트 작성

시트: [E2E 테스트 케이스](https://docs.google.com/spreadsheets/d/1EjjINCvD-4FkSETb_Z88qauXUpF7NU9y7jXN0RTNTm4/edit?gid=1841735669#gid=1841735669)

### ✍️ 테스트 케이스 작성

테스트 ID는 `TC-{시트ID}.{시나리오ID}.{테스트ID}`로 구성됨

- [TC-x] 이름으로 시트 생성
- 각 시나리오별로 고유한 ID 부여 (예: TC-1.1, TC-1.2)
- 시나리오 설명과 예상 결과를 명확하게 기술

### 🤖 스텁 코드 생성

1. e2e-autogen 설치

```bash
yarn add -D @dhlab/e2e-autogen
```

2. 스텁 코드 생성

```bash
yarn e2e-autogen:generate
```

- [`__generated-stub__`](./tests/e2e/__generated-stub__) 경로에 시트 기반의 테스트 스텁 코드 생성
- 생성된 스텁 코드를 기반으로 테스트 구현

## 🎭 E2E 테스트 구현

### ⚙️ Playwright 설정

[`tests/e2e/playwright.setup.ts`](./tests/e2e/playwright.setup.ts) 생성

- 시나리오 ID를 테스트 제목에서 추출
- fetch/XHR 요청에 시나리오 헤더 자동 주입

### ✏️ 테스트 작성

[`tests/e2e/user.spec.ts`](./tests/e2e/user.spec.ts)에서 테스트 구현

- playwright에서 제공하는 code generator와 Cursor AI를 사용하면 빠르게 코드 작성 가능

### ▶️ 테스트 실행

```bash
yarn playwright test
```

- 결과가 `tests/reporters/results.json`에 기록됨

### 📈 테스트 결과 업데이트

```bash
yarn e2e-autogen:update
```

<img width="1369" alt="스크린샷 2025-07-10 오후 6 02 04" src="https://github.com/user-attachments/assets/7b62c44e-a74a-4c3f-a457-ea48703dba7c" />
