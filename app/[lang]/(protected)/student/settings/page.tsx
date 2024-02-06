import { currentUser } from "@/lib/user";

import { redirect } from "next/navigation";

const StudentSettingsPage = () => {
  const user = currentUser();

  if (!user) {
    return redirect("/auth/login");
  }
  return redirect("/student/settings/account");
};

export default StudentSettingsPage;
