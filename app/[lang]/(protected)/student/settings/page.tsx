"use client";

import { useRouter } from "next/navigation";

const StudentSettingsPage = () => {
  const router = useRouter();

  return router.push("/student/settings/account");
};

export default StudentSettingsPage;
