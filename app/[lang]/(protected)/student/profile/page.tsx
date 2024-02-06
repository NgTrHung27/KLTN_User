"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const StudentProfilePage = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return redirect("/student/profile/news");
};

export default StudentProfilePage;
