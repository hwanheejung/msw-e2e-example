import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 1,
  workers: undefined,
  reporter: [
    ["html", { outputFolder: "./tests/reporters" }],
    ["json", { outputFile: "./tests/reporters/results.json" }],
  ],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  webServer: {
    command: "yarn dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
