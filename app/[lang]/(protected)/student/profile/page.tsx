"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const StudentProfilePage = () => {
  const currentUser = useCurrentUser();

  return <div>Profile</div>;
};

export default StudentProfilePage;
