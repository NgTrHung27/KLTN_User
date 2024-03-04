import { test, expect, chromium } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://kltn-demo-deploy.vercel.app/en/auth/login");
});
