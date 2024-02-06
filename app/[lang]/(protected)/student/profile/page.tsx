"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { redirect } from "next/navigation";

const StudentProfilePage = () => {
  const user = useCurrentUser();

  return redirect(`/student/profile/${user?.studentCode}`);
};

export default StudentProfilePage;
