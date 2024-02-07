import { auth, signIn } from "@/auth";
import { getUserByEmail, getUserByIdCardNumber } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateStudentCode, generateVerificationToken } from "@/lib/tokens";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSchoolByName } from "@/data/school";
import { getProgramByName } from "@/data/program";
import { db } from "@/lib/db";

export { GET } from "@/auth";

export async function POST(req: Request) {
  try {
    if (req.url.includes("signin")) {
      const body = await req.json();

      const validatedFields = LoginSchema.safeParse(body);

      if (!validatedFields.success) {
        return NextResponse.json({ error: "Invalid fields!" }, { status: 406 });
      }

      const { email, password } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email) {
        return NextResponse.json(
          { error: "User does not exist" },
          { status: 401 },
        );
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
          existingUser.email,
        );

        await sendVerificationEmail(
          existingUser.name,
          process.env.NODE_SENDER_EMAIL!,
          verificationToken.email,
          verificationToken.token,
        );

        return NextResponse.json(
          {
            error:
              "Email is not verified, please check your email for confirmation of account",
          },
          { status: 403 },
        );
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      const session = await auth();

      const user = session?.user;

      return NextResponse.json(user, { status: 200 });
    }

    if (req.url.includes("register")) {
      const body = await req.json();
      body.dob = new Date(body.dob);

      const validatedFields = RegisterSchema.safeParse(body);

      if (!validatedFields.success) {
        return NextResponse.json(
          { error: validatedFields.error.issues },
          { status: 406 },
        );
      }

      const {
        confirmPassword,
        city,
        district,
        ward,
        addressLine,
        schoolName,
        programName,
        gradeScore,
        ...value
      } = validatedFields.data;

      const existingUser =
        (await getUserByEmail(value.email)) ||
        (await getUserByIdCardNumber(value.idCardNumber));

      if (existingUser) {
        return NextResponse.json(
          { error: "Email or id card number already in use!" },
          { status: 403 },
        );
      }

      if (value.password && confirmPassword) {
        const passwordMatch = value.password === confirmPassword;

        if (!passwordMatch) {
          return NextResponse.json(
            { error: "Password mismatch!" },
            { status: 406 },
          );
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);

        value.password = hashedPassword;
      }

      const address = `${addressLine}, ${ward}, ${district}, ${city}`;

      const existingSchool = await getSchoolByName(schoolName);

      if (!existingSchool) {
        return NextResponse.json(
          { error: "School not found!" },
          { status: 404 },
        );
      }

      const existingProgram = await getProgramByName(
        existingSchool.name,
        programName,
      );

      if (!existingProgram) {
        return NextResponse.json(
          { error: "Program not found!" },
          { status: 404 },
        );
      }

      const studentCode = generateStudentCode(value.degreeType);

      const profile = await db.profile.create({
        data: {
          user: {
            create: {
              studentCode: studentCode,
              address,
              gradeScore: parseFloat(gradeScore),
              schoolId: existingSchool.id,
              program: {
                create: {
                  programId: existingProgram.id,
                },
              },
              ...value,
            },
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      const verificationToken = await generateVerificationToken(
        profile.user.email,
      );

      await sendVerificationEmail(
        profile.user.name,
        process.env.NODE_SENDER_EMAIL!,
        verificationToken.email,
        verificationToken.token,
      );

      return NextResponse.json(
        "Register successfull, please check your email for confirmation",
        { status: 200 },
      );
    }

    return NextResponse.json("Method not allowed", { status: 405 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json("Invalid credentials", { status: 406 });
        case "AuthorizedCallbackError":
          return NextResponse.json("Email is not verified", { status: 403 });
        default:
          return NextResponse.json("Something went wrong", { status: 400 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
