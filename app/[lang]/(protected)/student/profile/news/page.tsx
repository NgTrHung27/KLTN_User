"use server";

import { currentUser } from "@/lib/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import { ProfileSidebar } from "../_components/profile-sidebar";
import { getSchoolById } from "@/data/school";

const StudentProfileNewsPage = async () => {
  const user = await currentUser();

  if (!user || !user.schoolId) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const school = await getSchoolById(user.schoolId);

  if (!school) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  return (
    <div className="hidden h-full w-full gap-3 rounded-lg bg-slate-100 p-8 text-primary dark:bg-primary md:grid md:grid-cols-[70px_repeat(11,_1fr)]">
      {/* TODO: SIDEBAR */}
      <div className="col-span-1 grid auto-rows-min gap-3 text-primary lg:col-span-3">
        <ProfileSidebar schoolName={school.name} user={user} />
        <div className="bg-white text-black">BP</div>
      </div>
      {/* TODO: MAIN */}
      <div className="col-span-11 grid gap-3 bg-black text-white lg:col-span-9 lg:grid-cols-7">
        <div className="items-ceneter flex flex-col justify-start gap-3 bg-white text-black lg:col-span-5">
          <div className="bg-black text-white">C</div>
          <div className="bg-black text-white">D</div>
          <div className="bg-black text-white">E</div>
        </div>
        <div className="flex flex-col gap-3 bg-white text-black lg:col-span-2">
          <div className="bg-black text-white">F</div>
          <div className="bg-black text-white">G</div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileNewsPage;
