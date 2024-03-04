"use server"
import { db } from "@/lib/db"
export const BiographyUpdate = async (studentCode: string, content : string) => {
    try {
        const profile = await db.profile.findFirst({
            where: {
                user: {
                    studentCode
                },
            }
        })
        if (!profile) {
            return { error: "Khong tim thay profile"}
        }
        await db.biography.update({
            where:{
                profileId: profile.id,
                content: content
            },
            data:
            {
                content: content
            }
        });
        return { success: "update biography thanh cong"}
    } catch (error) {
        console.log(error)
        return { error: "update biography that bai"}
    }
}