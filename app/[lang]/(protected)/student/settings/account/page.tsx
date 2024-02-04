"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { AccountForm } from "./_components/account-form";

const SettingsAccountPage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return <AccountForm user={user} />;
};

export default SettingsAccountPage;
