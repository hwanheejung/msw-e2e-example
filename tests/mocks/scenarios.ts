import type { TScenarioConfig } from "./__types__/scenarios/scenarios.type";

/**
 * MSW 시나리오 설정
 *
 * 헤더 'x-scenario'를 통해 특정 시나리오를 활성화할 수 있습니다.
 *
 * 예시:
 * - 기본 (헤더 없음): 성공 응답 (200-299)
 * - curl -H "x-scenario: success" /api/users
 * - curl -H "x-scenario: error" /api/users
 *
 * allowCustomStatus: true를 사용하면 OpenAPI 명세에 없는 status 코드도 사용 가능합니다.
 */
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
