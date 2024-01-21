import { db } from "@/lib/db";

export const getProgramByName = async (
  schoolName: string,
  programName: string,
) => {
  try {
    const school = await db.school.findUnique({
      where: {
        name: schoolName,
      },
    });

    if (!school) {
      return null;
    }

    const program = await db.program.findUnique({
      where: {
        schoolId_name: {
          schoolId: school.id,
          name: programName,
        },
      },
    });

    return program;
  } catch {
    return null;
  }
};
