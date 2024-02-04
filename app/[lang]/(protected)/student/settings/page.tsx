import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const StudentSettingsPage = () => {
  const user = currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }
  return redirect("/student/settings/account");
};

export default StudentSettingsPage;
