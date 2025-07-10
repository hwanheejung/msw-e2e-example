import { expect } from "@playwright/test";
import { test } from "./playwright.setup";

test("[TC-1.1] 유저 목록 조회 성공 시나리오", async ({ page }) => {
  await test.step("[TC-1.1.1] 메인화면 로드 -> 제목(User Management)이 표시되어야 한다", async () => {
    // 📍 UI Path: 홈
    // 🎬 When: 메인화면 로드
    await page.goto("http://localhost:5173/");
    // ✅ Then: 제목(User Management)이 표시되어야 한다
    await expect
      .soft(page.getByRole("heading", { name: "User Management" }))
      .toBeVisible();
  });

  await test.step("[TC-1.1.2] Username, Email 인풋필드가 표시되어야 한다", async () => {
    // ✅ Then: Username, Email 인풋필드가 표시되어야 한다
    await expect
      .soft(page.getByRole("textbox", { name: "Username" }))
      .toBeVisible();
    await expect
      .soft(page.getByRole("textbox", { name: "Email" }))
      .toBeVisible();
  });

  await test.step("[TC-1.1.3] 유저가 4명 표시되어야 한다", async () => {
    // ✅ Then: 유저가 4명 표시되어야 한다
    await expect(page.getByRole("list")).toMatchAriaSnapshot(`
        - list:
          - listitem: Dobby (dobby@hogwarts.com)
          - listitem: Harry Potter (harry.potter@hogwarts.com)
          - listitem: Hermione Granger (hermione.granger@hogwarts.com)
          - listitem: Ron Weasley (ron.weasley@hogwarts.com)
        `);
  });
});

test("[TC-1.2] 유저 목록 조회 실패 시나리오", async ({ page }) => {
  await test.step("[TC-1.2.1] 메인화면 로드 -> 에러 메시지(유저 목록을 불러오는 데 실패했습니다)가 표시되어야 한다", async () => {
    // 📍 UI Path: 홈
    // 🎬 When: 메인화면 로드
    await page.goto("http://localhost:5173/");

    // ✅ Then: 에러 메시지(유저 목록을 불러오는 데 실패했습니다)가 표시되어야 한다
    await expect(
      page.getByText("유저 목록을 불러오는 데 실패했습니다")
    ).toBeVisible();
  });
});
