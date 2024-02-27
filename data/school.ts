import { db } from "@/lib/db";

export const getSchoolByUserId = async (id: string) => {
  try {
    const school = await db.school.findFirst({
      where: {
        users: {
          some: {
            id: id,
          },
        },
      },
    });

    return school;
  } catch (error) {
    return null;
  }
};
