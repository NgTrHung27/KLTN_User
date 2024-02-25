import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

const StudentProfilePage = async () => {
  const user = await currentUser();

  redirect(`${DEFAULT_LOGIN_REDIRECT}/${user?.studentCode}`);
};
export default StudentProfilePage;
