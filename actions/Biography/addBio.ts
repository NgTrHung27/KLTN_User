"use server"
import { db } from "@/lib/db"

export const BiographyAdd = async (studentCode: string, content : string) => {
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
        await db.biography.create({
            data:{
                profileId: profile.id,
                content: content
            }
        });
        return { success: "tao biography thanh cong"}
    } catch (error) {
        console.log(error)
        return { error: "tao biography that bai"}
    }
}