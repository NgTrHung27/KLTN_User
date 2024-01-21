// @ts-ignore
const { PrismaClient } = require("@prisma/client");
// @ts-ignore
const db = new PrismaClient();

async function main() {
  try {
    // await db.school.createMany({
    //   data: [
    //     {
    //       logoUrl:
    //         "https://utfs.io/f/7fe89f50-7db2-4b9b-93fd-829532ba21ed-nm33wo.jpg",
    //       backgroundUrl:
    //         "https://utfs.io/f/edca68a3-f850-41b2-801c-2351a0f65b08-zi32f6.png",
    //       name: "HUFLIT AMERICA",
    //       colorValue: "#9fff5b",
    //       isPublished: true,
    //     },
    //     {
    //       logoUrl:
    //         "https://utfs.io/f/7317e9f8-b11f-4bd3-974b-f7caa344a9d2-jlxnzo.jpg",
    //       backgroundUrl:
    //         "https://utfs.io/f/98263804-6bb4-4ed5-99d8-aa2be115cf76-csekpy.png",
    //       name: "Metropolitan International",
    //       colorValue: "#003234",
    //       isPublished: true,
    //     },
    //   ],
    // });

    await db.program.createMany({
      data: [
        {
          name: "UI UX Design Specialist",
          description: "Test",

          coverImage:
            "https://utfs.io/f/1ddd79dd-dbf9-4841-aa39-fd363ad66639-i4sqms.png",
          isPublished: true,
          schoolId: "clrnyxesi0000ujgsze80gzhe",
        },
        {
          name: "Khoa Học Máy Tính",
          description: "Test",
          coverImage:
            "https://utfs.io/f/e5f5624d-5d06-458a-a2eb-9b11e21447eb-1yjes.jpg",
          isPublished: true,
          schoolId: "clrnyxesl0001ujgsjsduou62",
        },
      ],
    });

    console.log("success");
  } catch (error) {
    console.log("Error Seeding", error);
  } finally {
    await db.$disconnect();
  }
}

main();
