"use client";

import { useRouter } from "next/navigation";

const StudentPage = () => {
  const router = useRouter();
  return router.push("/student/profile");
};

export default StudentPage;
