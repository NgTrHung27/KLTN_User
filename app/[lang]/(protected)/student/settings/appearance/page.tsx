"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { AppearanceForm } from "./_components/appearance-form";

const SettingsAppearancePage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return <AppearanceForm />;
};

export default SettingsAppearancePage;
