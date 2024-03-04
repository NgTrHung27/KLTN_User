import { GetProfileLib } from "@/lib/profile/profile";
import { PostLib, ProfileLib } from "@/types";
import { ProfileHeader } from "./_components/profile-header";
import { GetPostsLib } from "@/lib/profile/post";

const ProfileIdLayout = async ({
  children,
  params: { studentCode },
}: {
  children: React.ReactNode;
  params: { studentCode: string };
}) => {
  const profile: ProfileLib = await GetProfileLib(studentCode);
  const posts: PostLib[] = await GetPostsLib();

  if (!profile.user?.studentCode.match(studentCode)) {
    return <div className="hidden px-24 py-6 md:block"></div>;
  }

  return (
    <div className="hidden flex-col gap-3 px-24 py-6 md:flex">
      <ProfileHeader
        name={profile.user?.name!}
        schoolName={profile.user.school?.name!}
        coverUrl={profile?.coverImage || ""}
        logoUrl={profile.user?.image || undefined}
        postCount={posts.length}
      />
      {children}
    </div>
  );
};

export default ProfileIdLayout;
