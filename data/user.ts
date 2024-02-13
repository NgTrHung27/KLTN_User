import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        password: true,
        image: true,
        studentCode: true,
        dob: true,
        gender: true,
        phoneNumber: true,
        idCardNumber: true,
        address: true,
        schoolId: true,
        degreeType: true,
        certificateType: true,
        certificateImg: true,
        gradeType: true,
        gradeScore: true,
        isTwoFactorEnabled: true,
        status: true,
        school: {
          select: {
            name: true,
            logoUrl: true,
            backgroundUrl: true,
            colorValue: true,
          },
        },
        program: {
          where: {
            user: {
              email,
            },
          },
          select: {
            program: {
              select: {
                coverImage: true,
                description: true,
                name: true,
              },
            },
          },
        },
        profile: {
          where: {
            user: { email },
          },
          select: {
            id: true,
            status: true,
            coverImage: true,
            posts: {
              select: {
                id: true,
                status: true,
                createdAt: true,
                content: true,
                updatedAt: true,
                postImages: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        studentCode: true,
        dob: true,
        gender: true,
        phoneNumber: true,
        idCardNumber: true,
        address: true,
        schoolId: true,
        degreeType: true,
        certificateType: true,
        certificateImg: true,
        gradeType: true,
        gradeScore: true,
        isTwoFactorEnabled: true,
        status: true,
        school: {
          select: {
            name: true,
            logoUrl: true,
            backgroundUrl: true,
            colorValue: true,
          },
        },
        program: {
          where: {
            userId: id,
          },
          select: {
            program: {
              select: {
                coverImage: true,
                description: true,
                name: true,
              },
            },
          },
        },
        profile: {
          where: {
            userId: id,
          },
          select: {
            status: true,
            coverImage: true,
            posts: {
              select: {
                id: true,
                status: true,
                createdAt: true,
                content: true,
                updatedAt: true,
                postImages: true,
                comments: {
                  include: {
                    commentImage: true,
                    parentComment: true,
                    children: true,
                    profile: {
                      select: {
                        user: {
                          select: {
                            image: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdCardNumber = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { idCardNumber: id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        studentCode: true,
        dob: true,
        gender: true,
        phoneNumber: true,
        idCardNumber: true,
        address: true,
        schoolId: true,
        degreeType: true,
        certificateType: true,
        certificateImg: true,
        gradeType: true,
        gradeScore: true,
        isTwoFactorEnabled: true,
        status: true,
        school: {
          select: {
            name: true,
            logoUrl: true,
            backgroundUrl: true,
            colorValue: true,
          },
        },
        program: {
          where: {
            userId: id,
          },
          select: {
            program: {
              select: {
                coverImage: true,
                description: true,
                name: true,
              },
            },
          },
        },
        profile: {
          where: {
            userId: id,
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};
