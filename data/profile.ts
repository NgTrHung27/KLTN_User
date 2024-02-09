import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";

export const getProfileById = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    return profile;
  } catch {
    return null;
  }
};

export const getProfileByStudentCode = async (code: string) => {
  try {
    const session = await currentUser();
    const user = await db.user.findUnique({
      where: {
        id: session?.id,
        studentCode: code,
      },
    });

    if (!user) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    return profile;
  } catch {
    return null;
  }
};
