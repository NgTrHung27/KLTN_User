import { test, expect } from "@playwright/test";
import { Gender } from "@prisma/client";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/en/auth/register");
});

const test_user_valid = {
  email: "test@gmail.com",
  password: "Persie17@",
  confirmPassword: "Persie17@",
  dob: new Date("17/10/2003"),
  name: "Phùng Quang Long",
  gender: Gender.FEMALE,
  phone: "0123456789",
  idCard: "123456789",
};

const test_name_invalid = {
  digitCharacters: "1Long 23Quang 4Long",
  specialCharacters: "Phùng! Quang !Long@",
  tooLong: "abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdea",
};

const test_password_invalid = {
  shortCharacter: "abcdefg",
  longCharacter: "abcdefghijklmnopqrstuvwxyz",
  missingDigit: "Persiee@",
  missingLower: "PERSIE17@",
  missingUpper: "persie17@",
  missingSpecial: "Persie177",
};

const test_phone_invalid = {
  short: "123456789",
  long: "12345678912345",
  text: "1234asdf1234",
};

const test_cccd_invalid = {
  short: "12345678",
  mid: "1234567890",
  long: "1234567890123",
  text: "123456!a9",
};

const tab_list = {
  account: "Account",
  profile: "Profile",
  education: "Education",
};

test.describe("Họ và Tên", () => {
  test("Báo lỗi khi không đúng quy định", async ({ page }) => {
    // Kích thông báo lỗi
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    // Báo lỗi khi bỏ trống
    await page.getByRole("tab", { name: tab_list.account }).click();
    await expect(page.getByText("Fullname is required")).toBeVisible();

    // Báo lỗi khi chứa ký tự số
    const nameInp = page.getByPlaceholder("Enter your fullname");
    await nameInp.fill(test_name_invalid.digitCharacters);
    await expect(
      page.getByText("Name must only contain letters, spaces"),
    ).toBeVisible();

    // Báo lỗi khi chứa ký tự đặc biệt
    await nameInp.fill(test_name_invalid.specialCharacters);
    await expect(
      page.getByText("Name must only contain letters, spaces"),
    ).toBeVisible();

    // Báo lỗi khi vượt quá 50 ký tự
    await nameInp.fill(test_name_invalid.tooLong);
    await expect(
      page.getByText("Name must not exceed 50 characters"),
    ).toBeVisible();
  });
});

test.describe("Email", () => {
  test("Báo lỗi khi không đúng định dạng", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.account }).click();

    // Báo lỗi khi bỏ trống
    await expect(page.getByText("Email is required")).toBeVisible();

    // Báo lỗi khi sai cú pháp
    const emailInp = page.getByPlaceholder("Enter your email");
    await emailInp.fill("abcd@123meomeo");
    await expect(page.getByText("Invalid type of email")).toBeVisible();
  });
});

test.describe("Mật khẩu", () => {
  test("Báo lỗi khi không đúng định dạng", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.account }).click();
    const passInp = page.getByPlaceholder("Enter your password", {
      exact: true,
    });

    // Báo lỗi khi bỏ trống
    await expect(
      page.getByText("Password is required", { exact: true }),
    ).toBeVisible();

    // Báo lỗi khi ít hơn 8 ký tự
    await passInp.fill(test_password_invalid.shortCharacter);
    await expect(
      page.getByText("Password must be at least 8 characters long"),
    ).toBeVisible();

    // Báo lỗi khi nhiều hơn 25 ký tự
    await passInp.fill(test_password_invalid.longCharacter);
    await expect(
      page.getByText("Password cannot exceed 25 characters"),
    ).toBeVisible();

    // Báo lỗi khi không có ký tự số
    await passInp.fill(test_password_invalid.missingDigit);
    await expect(
      page.getByText("Password must contain at least one digit"),
    ).toBeVisible();

    // Báo lỗi khi không có ký tự in hoa
    await passInp.fill(test_password_invalid.missingUpper);
    await expect(
      page.getByText("Password must contain at least one uppercase letter"),
    ).toBeVisible();

    // Báo lỗi khi không có ký tự thường
    await passInp.fill(test_password_invalid.missingLower);
    await expect(
      page.getByText("Password must contain at least one lowercase letter"),
    ).toBeVisible();

    // Báo lỗi khi không có ký tự đặc biệt
    await passInp.fill(test_password_invalid.missingSpecial);
    await expect(
      page.getByText("Password must contain at least one special character"),
    ).toBeVisible();
  });
});

test.describe("Nhập lại mật khẩu", () => {
  test("Báo lỗi khi bỏ trống", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.account }).click();

    // Báo lỗi khi bỏ trống
    await expect(page.getByText("Confirm password is required")).toBeVisible();
  });
});

test.describe("Ngày sinh", () => {
  test("Báo lỗi khi không đúng định dạng", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await page.getByText("Date of birth01 tháng 01,").click();

    await page.getByLabel("tháng 01, 2006").click();
    await page.getByRole("combobox", { name: "Month:" }).selectOption("9");
    await page.getByRole("combobox", { name: "Year:" }).selectOption("2003");
  });
});

test.describe("Số điện thoại", () => {
  test("Báo lỗi khi bỏ trống", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(page.getByText("Phone number is required")).toBeVisible();
  });

  test("Báo lỗi khi ít hơn 10 ký tự", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your phone number");
    await phoneInp.fill(test_phone_invalid.short);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Minimum 10 numbers is required"),
    ).toBeVisible();
  });

  test("Báo lỗi khi nhiều hơn 13 ký tự", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your phone number");
    await phoneInp.fill(test_phone_invalid.long);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Maximum 13 numbers is required"),
    ).toBeVisible();
  });

  test("Báo lỗi khi chuỗi chứa chữ cái", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your phone number");
    await phoneInp.fill(test_phone_invalid.text);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Please enter a valid id phone number"),
    ).toBeVisible();
  });
});

test.describe("Căn cước công dân", () => {
  test("Báo lỗi khi bỏ trống", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(page.getByText("Id card number is required")).toBeVisible();
  });

  test("Báo lỗi khi ít hơn 9 ký tự", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your identity card number");
    await phoneInp.fill(test_cccd_invalid.short);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Id card number must be 9 or 12 characters"),
    ).toBeVisible();
  });

  test("Báo lỗi khi không phải 9 hoặc 12 ký tự", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your identity card number");
    await phoneInp.fill(test_cccd_invalid.mid);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Id card number must be 9 or 12 characters"),
    ).toBeVisible();
  });

  test("Báo lỗi khi vượt quá 12 ký tự", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your identity card number");
    await phoneInp.fill(test_cccd_invalid.long);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Id card number must be 9 or 12 characters"),
    ).toBeVisible();
  });

  test("Báo lỗi khi chuỗi chứa chữ cái", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    const phoneInp = page.getByPlaceholder("Enter your identity card number");
    await phoneInp.fill(test_cccd_invalid.text);

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(
      page.getByText("Please enter a valid id card number"),
    ).toBeVisible();
  });
});

test.describe("Địa chỉ", () => {
  test("Báo lỗi khi bỏ trống địa chỉ chi tiết", async ({ page }) => {
    await page.getByRole("tab", { name: tab_list.profile }).click();

    await page.getByRole("tab", { name: tab_list.education }).click();

    const btnRegister = page.getByRole("button", { name: "Sign Up" });

    await btnRegister.click();

    await page.getByRole("tab", { name: tab_list.profile }).click();

    await expect(page.getByText("Address line is required")).toBeVisible();
  });
});
