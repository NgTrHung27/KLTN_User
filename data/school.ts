import { db } from "@/lib/db";

export const getSchoolsWithPrograms = async () => {
  try {
    const schools = await db.school.findMany({
      where: {
        isPublished: true,
      },
      include: {
        programs: {
          where: {
            isPublished: true,
          },
        },
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

export const getSchoolById = async (id: string) => {
  try {
    const school = await db.school.findUnique({
      where: {
        id,
      },
    });

    return school;
  } catch {
    return null;
  }
};

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
