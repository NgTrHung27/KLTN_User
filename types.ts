import { Program, School } from "@prisma/client";

export type Ward = {
  Id: string;
  Name: string;
  Level: string;
};

export type District = {
  Id: string;
  Name: string;
  Wards: {
    Id: string;
    Name: string;
    Wards: Ward[];
  };
};

export type City = {
  Id: string;
  Name: string;
  Districts: District[];
};

export type SchoolWithPrograms = School & { programs: Program[] };
