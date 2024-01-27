"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const StudentSettingsPage = () => {
  const currentUser = useCurrentUser();

  return <div>{currentUser?.role}</div>;
};

export default StudentSettingsPage;
