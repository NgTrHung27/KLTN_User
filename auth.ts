import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import {
  CertificateType,
  DegreeType,
  Gender,
  GradeType,
  Profile,
  Program,
  School,
  StudentStatus,
} from "@prisma/client";
import { NextResponse } from "next/server";

export type ExtendedUser = DefaultSession["user"] & {
  studentCode: string;
  dob: Date;
  gender: Gender;
  phoneNumber: string;
  idCardNumber: string;
  address: string;
  schoolId: string;
  degreeType: DegreeType;
  certificateType: CertificateType;
  certificateImg: string;
  gradeType: GradeType;
  gradeScore: number;
  isTwoFactorEnabled: boolean;
  status: StudentStatus;

  school: Pick<School, "logoUrl" | "name" | "backgroundUrl" | "colorValue">;

  program: Program;

  profile: Profile;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.studentCode) {
          session.user.studentCode = token.studentCode as string;
        }
        if (token.dob) {
          session.user.dob = token.dob as Date;
        }
        if (token.gender) {
          session.user.gender = token.gender as Gender;
        }
        if (token.phoneNumber) {
          session.user.phoneNumber = token.phoneNumber as string;
        }
        if (token.idCardNumber) {
          session.user.idCardNumber = token.idCardNumber as string;
        }
        if (token.address) {
          session.user.address = token.address as string;
        }
        if (token.schoolId) {
          session.user.schoolId = token.schoolId as string;
        }
        if (token.degreeType) {
          session.user.degreeType = token.degreeType as DegreeType;
        }
        if (token.certificateType) {
          session.user.certificateType =
            token.certificateType as CertificateType;
        }
        if (token.certificateImg) {
          session.user.certificateImg = token.certificateImg as string;
        }
        if (token.gradeType) {
          session.user.gradeType = token.gradeType as GradeType;
        }
        if (token.gradeScore) {
          session.user.gradeScore = token.gradeScore as number;
        }

        if (token.isTwoFactorEnabled) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        }

        if (token.status) {
          session.user.status = token.status as StudentStatus;
        }

        if (token.school) {
          session.user.school = token.school as Pick<
            School,
            "logoUrl" | "name" | "backgroundUrl" | "colorValue"
          >;
        }

        if (token.program) {
          session.user.program = token.program as Program;
        }

        if (token.profile) {
          session.user.profile = token.profile as Profile;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.studentCode = existingUser.studentCode;
      token.dob = existingUser.dob;
      token.gender = existingUser.gender;
      token.phoneNumber = existingUser.phoneNumber;
      token.idCardNumber = existingUser.idCardNumber;
      token.address = existingUser.address;

      token.schoolId = existingUser.schoolId;
      token.degreeType = existingUser.degreeType;
      token.certificateType = existingUser.certificateType;
      token.certificateImg = existingUser.certificateImg;
      token.gradeType = existingUser.gradeType;
      token.gradeScore = existingUser.gradeScore;

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      token.status = existingUser.status;

      token.school = existingUser.school;

      token.program = existingUser.program?.program;

      token.profile = existingUser.profile;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  ...authConfig,
});
