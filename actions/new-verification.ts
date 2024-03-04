"use server";

export const newVerification = async (token?: string) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/auth/new-verification`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      },
    );

    const res = await req.json();

    if (res.error) {
      return { error: res.error };
    }

    return { success: "Verified email successfully" };
  } catch (error) {
    console.log("VERIFICATION EMAIL ERROR", error);

    return { error: "Failed to verify email" };
  }
};
