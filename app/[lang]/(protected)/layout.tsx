import { ProtectedNavbar } from "@/components/navbar/navbar";
import { Lang, getDictionary } from "@/data/dictionaries";
import { getProfileByStudentCode } from "@/data/profile";
import { getSchoolByUserId } from "@/data/school";
import { currentUser } from "@/lib/user";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const school = await getSchoolByUserId(user.id);

  if (!school) {
    return redirect("/");
  }

  const profile = await getProfileByStudentCode(user.studentCode);

  if (!profile) {
    return redirect("/");
  }

  const dict = await getDictionary(params.lang);

  return (
    <div className="h-full w-full">
      <ProtectedNavbar user={user} dict={dict} />
      {children}
    </div>
  );
};

export default ProtectedLayout;
