import { SchoolLib } from "@/types";

export const GetSchoolLib = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/schools`, {
      method: "GET",
      cache: "no-store",
    });

    const schools: SchoolLib[] = await res.json();

    return schools;
  } catch (error) {
    console.log("GET SCHOOL LIB ERROR", error);
    return null;
  }
};
