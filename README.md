# msw-e2e-example

[MSW](https://mswjs.io/), [@dhlab/msw-auto-mock](https://github.com/dhlab-org/msw-auto-mock), [@dhlab/e2e-autogen](https://github.com/dhlab-org/e2e-autogen), [Playwright](https://playwright.dev/) 통합 예시입니다.

## Flow

- OpenAPI 명세를 기반으로 MSW 핸들러 자동 생성 (`msw-auto-mock`)
- 커스텀 컨트롤러 주입 (`msw-auto-mock`)
- 시나리오 기반 API 응답 제어 (`msw-auto-mock`)
- 구글 시트에서 테스트 케이스 관리 및 스텁 코드 자동 생성 (`e2e-autogen`)
- Playwright codegen, Cursor AI를 활용하여 E2E 테스트 작성
- 구글 시트에 테스트 결과 자동 업데이트 (`e2e-autogen`)

## 시작하기

### 1. 의존성 설치

```bash
yarn add -D @dhlab/msw-auto-mock @dhlab/e2e-autogen @msw/playwright msw @playwright/test @faker-js/faker
```

### 2. MSW 설정

1. MSW 서비스 워커 생성

```bash
npx msw init public/ --save
```

2. `package.json`에 MSW 설정 추가

```json
{
  "msw": {
    "workerDirectory": ["public"]
  }
}
```

### 3. 시나리오 설정

1. `msw-auto-mock`으로 자동 생성된 `tests/mocks/scenarios.ts`에 커스텀 시나리오 설정

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

### 4. Playwright 설정

`tests/e2e/playwright.setup.ts` 생성

- [코드 복붙](./tests/e2e/playwright.setup.ts)

### 5. 테스트 작성

[`tests/e2e/user.spec.ts`](./tests/e2e/user.spec.ts)

```typescript
import { test } from "./playwright.setup";
import { expect } from "@playwright/test";

test("[TC-1.1] 유저 목록 조회 성공", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("list")).toBeVisible();
});

test("[TC-1.2] 유저 목록 조회 실패", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("에러")).toBeVisible();
});
```

### 6. 테스트 실행

```bash
yarn playwright test
```

## 시나리오 동작 방식

1. 테스트 제목에서 `[TC-1.1]`과 같은 시나리오 ID를 추출
2. 모든 API 요청에 `x-scenario: TC-1.1` 헤더를 자동으로 주입
3. MSW가 헤더를 보고 `scenarios.ts`에 정의된 응답을 반환
4. fetch, axios 등 HTTP 클라이언트 종류에 관계없이 동작

## 구글 시트 연동

시트: [E2E 테스트 케이스](https://docs.google.com/spreadsheets/d/1EjjINCvD-4FkSETb_Z88qauXUpF7NU9y7jXN0RTNTm4/edit?gid=1841735669#gid=1841735669)

### 테스트 생성

```bash
yarn e2e-autogen:generate
```
- [`__generated-stub__`](./tests/e2e/__generated-stub__) 경로에 생성된 스텁 코드를 복사하여 [user.spec.ts](./tests/e2e/user.spec.ts)에서 테스트 구현
- playwright의 code generator, Cursor AI를 사용하면 빠르게 테스트 작성 가능

### 테스트 실행
```bash
yarn playwright test
```

### 테스트 결과 업데이트

```bash
yarn e2e-autogen:update
```
<img width="1369" alt="스크린샷 2025-07-10 오후 6 02 04" src="https://github.com/user-attachments/assets/7b62c44e-a74a-4c3f-a457-ea48703dba7c" />

## 참고 사항

- 시나리오 ID는 반드시 `[TC-숫자.숫자]` 형식을 따라야 함
- API 응답은 OpenAPI 명세에 정의된 스키마를 따름
