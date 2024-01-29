import { db } from "./db";

export const getStudentProgramByUserId = async (
  id: string,
  programId: string,
) => {
  try {
    const studentProgram = await db.studentProgram.findUnique({
      where: {
        userId_programId: {
          userId: id,
          programId,
        },
      },
    });

    return studentProgram;
  } catch {
    return null;
  }
};
