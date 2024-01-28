import { auth } from "@/auth";
import { redirect } from "next/navigation";

const StudentPage = async () => {
  const session = await auth();

  if (!session || !session?.user) {
    redirect("/auth/login");
  }

  return redirect("/student/profile");
};

export default StudentPage;
