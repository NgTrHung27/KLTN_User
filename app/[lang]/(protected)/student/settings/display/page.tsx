"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { DisplayForm } from "./_components/display-form";

const SettingsDisplayPage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return <DisplayForm />;
};

export default SettingsDisplayPage;