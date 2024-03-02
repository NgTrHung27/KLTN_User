import { test, expect } from "@playwright/test";

test.beforeEach(({ page }) => {
  page.goto("");
});
