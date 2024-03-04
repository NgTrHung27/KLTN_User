"use server"
import { db } from "@/lib/db"


export const BiographyAdd = async (studentCode: string, content : string) => {
    try {
        const profile = await db.profile.findFirst({
            where: {
                user: {
                    studentCode
                },
            },
            include: {
                biography: true
            }
        })
        if (!profile) {
            return { error: "Khong tim thay profile"}
        }
        if(profile.biography) {
            // update
            await db.biography.update({
                where:{
                    profileId:profile.id
                },
                data:{
                    content:content
                }
            })
        }
        else
        {
        return { success: "update biography thanh cong"}
            
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