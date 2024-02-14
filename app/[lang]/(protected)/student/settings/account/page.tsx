"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { AccountForm } from "./_components/account-form";

const SettingsAccountPage = () => {
  const user = useCurrentUser();

  return <AccountForm user={user!} />;
};

export default SettingsAccountPage;
