"use server"

import { db } from "@/lib/db"

export const LikeCmt = async (studentCode: string, postCmtId: string) => {
    try {
        const profile = await db.profile.findFirst({
            where: {
                user: {
                    studentCode 
                },
            }
        })

        if (!profile) 
        {
            return { error: "Khong tim thay profile"}
        }

        const postCmt = await db.postComment.findUnique({
            where: {
                id: postCmtId,
            }
        })
        
        if (!postCmt) {
            return {error: "Khong tim thay cmt cua post"}
        }

        const like = await db.postCommentLike.findUnique({
            where: {
                profileId_postCommentId:{
                    postCommentId:postCmt.id,
                    profileId:profile.id
                }
            }
        })

        if (like) {
            await db.postCommentLike.delete({
                where: {
                    id: like.id,
                }
            })

            return { success: "Unlike cmt thanh cong"}
        }

        await db.postCommentLike.create({
            data: {
                postCommentId: postCmt.id,
                profileId: profile.id
            }
        })

        return { success: "Like cmt thanh cong"}
    } catch (error) {
        console.log(error)
        return { error: "Like that bai"}
    }
}