import { getPostsByProfileId } from "@/data/posts";
import { getProfileByStudentCode } from "@/data/profile";
import { currentUser } from "@/lib/user";
import { ProfilePosts } from "./_components/profile-post";

const ProfileIdPostPage = async ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const user = await currentUser();

  const profile = await getProfileByStudentCode(studentCode);
  const posts = await getPostsByProfileId(profile?.id!);

  return (
    <ProfilePosts
      posts={posts || []}
      name={user?.name!}
      image={user?.image || undefined}
    />
  );
};

export default ProfileIdPostPage;
