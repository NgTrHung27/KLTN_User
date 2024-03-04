import { GetProfileLib } from "@/lib/profile/profile";
import { PostLib, ProfileLib } from "@/types";
import { ProfileInformation } from "./_components/profile-information";
import { ProfilePosts } from "./_components/profile-post";
import { ProfilePostsList } from "./_components/profile-posts-list";
import { CrispProvider } from "@/scripts/crisp-provider";
import { GetPostsLib } from "@/lib/profile/post";
const ProfileIdPage = async ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const profile: ProfileLib = await GetProfileLib(studentCode);
  const posts: PostLib[] = await GetPostsLib();

  return (
    <div className="hidden gap-4 md:grid lg:grid-cols-12 relative">
      <div className="lg:col-span-3">
        <ProfileInformation
          address={profile.user?.address}
          dob={profile.user?.dob}
          schoolLogo={profile.user.school?.logoUrl}
          schoolName={profile.user.school?.name}
          biography={profile?.biography} 
        />
      </div>
      <div className="lg:col-span-9">
        <ProfilePosts
          name={profile.user?.name}
          image={profile.user?.image || undefined}
        />
        <div className="flex flex-col gap-4 text-primary">
          {posts?.length! > 0 && (
            <ProfilePostsList
              posts={posts}
              name={profile.user?.name}
              logo={profile.user?.image || ""}
              profileId={profile.id}
            />
            )}
           <CrispProvider />
        </div>
      </div>
    </div>
  );
};

export default ProfileIdPage;
