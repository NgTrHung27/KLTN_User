export const GetProfileLib = async (studentCode: string) => {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/profiles/${studentCode}`,
      {
        method: "GET",
        cache: "force-cache",
      },
    );

    const res = await req.json();

    if (res.error) {
      return { error: res.error };
    }

    return res;
  } catch (error) {
    console.log("GET PROFILE LIB ERROR", error);

    return null;
  }
};
