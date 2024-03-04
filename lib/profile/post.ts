import { currentUser } from "../user";

export const GetPostsLib = async () => {
  try {
    const user = await currentUser();

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/profiles/${user?.studentCode}/posts`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const res = await req.json();

    if (res.error) {
      return null;
    }

    return res;
  } catch (error) {
    console.log("ERROR GET POSTS BY PROFILE ID", error);

    return null;
  }
};
