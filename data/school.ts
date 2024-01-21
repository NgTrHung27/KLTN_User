import { db } from "@/lib/db";

export const getSchoolsWithPrograms = async () => {
  try {
    const schools = await db.school.findMany({
      where: {
        isPublished: true,
      },
      include: {
        programs: true,
      },
    });

    return schools;
  } catch {
    return null;
  }
};

export const getSchoolByName = async (name: string) => {
  try {
    const school = await db.school.findUnique({
      where: {
        name,
      },
    });

    return school;
  } catch {
    return null;
  }
};
