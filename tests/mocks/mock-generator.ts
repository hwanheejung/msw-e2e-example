import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { generateMocks } = require("@dataai/msw-auto-mock/node");
import { controllers } from "./controllers";

import { type TOptions } from "@dataai/msw-auto-mock";
import type { TControllers } from "./__types__/controllers/index";

async function autoGenerateMocks() {
  try {
    console.log("[MSW] 목 파일 생성 시작...");

    const options: TOptions<TControllers> = {
      controllers,
      input: "./swagger/openapi.yml",
      outputDir: "./tests/mocks",
      environment: "react",
      baseUrl: "http://localhost:3000/api",
      controllerPath: "@tests/mocks/controllers/index.ts",
    };

    const result = await generateMocks(options);

    console.log("[MSW] 목 파일 생성 완료!");
    console.log("[MSW] 생성된 파일 경로:", result.targetFolder);

    return result;
  } catch (error) {
    console.error("[MSW] 목 파일 생성 중 오류 발생:", error);
    throw error;
  }
}

autoGenerateMocks();
