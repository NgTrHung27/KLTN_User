"use client";

import { redirect } from "next/navigation";
import { ProfileSidebar } from "../_components/profile-sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";

const StudentProfileNewsPage = () => {
  const user = useCurrentUser();

  if (!user || !user.schoolId) {
    return redirect("/auth/login");
  }

  const school = user.school;

  if (!school) {
    return redirect("/auth/login");
  }

  return <div className="">News Page</div>;
};

export default StudentProfileNewsPage;
