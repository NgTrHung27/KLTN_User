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
  UserRole,
} from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
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
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
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
      }

      console.log(session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

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

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
