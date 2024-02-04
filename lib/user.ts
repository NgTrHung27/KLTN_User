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
