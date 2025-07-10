/* eslint-disable react-hooks/rules-of-hooks */
import { test as testBase } from "@playwright/test";
import { createNetworkFixture, type NetworkFixture } from "@msw/playwright";
import { handlers } from "../mocks/__handlers__";

// 시나리오 ID를 테스트 제목에서 추출하는 유틸
function extractScenarioId(title: string): string | undefined {
  // 제목 포맷: "[TC-1.1] ..." 와 같이 대괄호 안에 TC-... 가 포함됨
  const match = title.match(/\[(TC-[\d.]+)]/);
  return match?.[1];
}

type TFixtures = {
  network: NetworkFixture;
};

export const test = testBase.extend<TFixtures>({
  network: createNetworkFixture({
    initialHandlers: handlers,
  }),

  // page fixture를 확장하여 자동으로 x-scenario 헤더를 주입한다
  page: async ({ page }, use, testInfo) => {
    const scenarioId = extractScenarioId(testInfo.title);

    if (scenarioId) {
      // 모든 fetch 요청에 헤더를 주입하기 위해 fetch를 래핑한다
      await page.addInitScript((sid: string) => {
        const originalFetch = window.fetch.bind(window);
        window.fetch = (
          input: RequestInfo | URL,
          init?: RequestInit
        ): Promise<Response> => {
          const newInit: RequestInit = {
            ...(init ?? {}),
            headers: {
              ...(init?.headers ?? {}),
              "x-scenario": sid,
            },
          };
          return originalFetch(input, newInit);
        };
      }, scenarioId);
    }

    await use(page);
  },
});
