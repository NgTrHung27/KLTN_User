"use server"

import { db } from "@/lib/db"

export const Like = async (studentCode: string, postId: string) => {
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

        
        const post = await db.post.findUnique({
            where: {
                id: postId,
                isArchived: false
            }
        })
        
        if (!post) {
            return {error: "Khong tim thay post"}
        }

        const like = await db.postLike.findUnique({
            where: {
                profileId_postId: {
                    postId: post.id,
                    profileId: profile.id  
                }
            }
        })

        if (like) {
            await db.postLike.delete({
                where: {
                    id: like.id
                }
            })

            return { success: "Unlike thanh cong"}
        }

        await db.postLike.create({
            data: {
                postId: post.id,
                profileId: profile.id
            }
        })

        return { success: "Like thanh cong"}
    } catch (error) {
        console.log(error)
        return { error: "Like that bai"}
    }
}