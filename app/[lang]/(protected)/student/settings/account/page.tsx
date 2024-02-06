"use client";

import { redirect } from "next/navigation";
import { AccountForm } from "./_components/account-form";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsAccountPage = () => {
  const user = useCurrentUser();

  return <AccountForm user={user!} />;
};

export default SettingsAccountPage;
