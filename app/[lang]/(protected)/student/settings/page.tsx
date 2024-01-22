"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const StudentSettingsPage = () => {
  const currentUser = useCurrentUser();

  return <div>Settings Page:</div>;
};

export default StudentSettingsPage;
