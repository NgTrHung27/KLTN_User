import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user.email) {
    return null;
  }

  const user = await getUserByEmail(session?.user.email);

  if (!user) {
    return null;
  }

  return session?.user;
};

export const GetUserEmailLib = async (email: string) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/users/${email}`,
    );

    const res = await req.json();

    if (res.error) {
      return null;
    }

    return res;
  } catch (error) {
    console.log("GET USER ERROR", error);
    return null;
  }
};
