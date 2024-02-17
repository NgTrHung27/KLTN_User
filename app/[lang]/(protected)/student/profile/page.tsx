import { currentUser } from "@/lib/user";
import { redirect } from "next/navigation";

const StudentProfilePage = async () => {
  const user = await currentUser();

  return redirect(`/student/profile/${user?.studentCode}`);
};

export default StudentProfilePage;
