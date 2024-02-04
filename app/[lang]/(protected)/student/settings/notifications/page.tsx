"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { NotificationsForm } from "./_components/notifications-form";

const SettingsNotificationsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return <NotificationsForm />;
};

export default SettingsNotificationsPage;
