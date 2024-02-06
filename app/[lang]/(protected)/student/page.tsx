import { auth } from "@/auth";
import { currentUser } from "@/lib/user";
import { redirect } from "next/navigation";

const StudentPage = async () => {
  return redirect("/student/profile");
};

export default StudentPage;
