import { getPostsByProfileId } from "@/data/posts";
import { getProfileByStudentCode } from "@/data/profile";
import { currentUser } from "@/lib/user";
import { ProfilePosts } from "./_components/profile-post";
import { ProfilePostsList } from "./_components/profile-posts-list";
import { ProfileInformation } from "./_components/profile-information";
import { getSchoolByUserId } from "@/data/school";

const ProfileIdPage = async ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const user = await currentUser();
  const school = await getSchoolByUserId(user?.id!);
  const profile = await getProfileByStudentCode(studentCode);
  const posts = await getPostsByProfileId(profile?.id!);

  return (
    <div className="hidden gap-4 md:grid lg:grid-cols-12">
      <div className="lg:col-span-3">
        <ProfileInformation
          address={user?.address!}
          dob={user?.dob!}
          schoolLogo={school?.logoUrl!}
          schoolName={school?.name!}
        />
      </div>
      <div className="lg:col-span-9">
        <ProfilePosts name={user?.name!} image={user?.image || ""} />
        <div className="flex flex-col gap-4 text-primary">
          {posts?.length! > 0 && (
            <ProfilePostsList
              posts={posts || []}
              name={user?.name!}
              logo={user?.image || ""}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileIdPage;
