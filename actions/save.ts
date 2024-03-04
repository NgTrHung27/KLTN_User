"use server"
import { db } from "@/lib/db"

export const Save = async (studentCode: string, postId: string) => {
    try {
        const profile = await db.profile.findFirst(
            {
                where:{
                    user:
                    {
                        studentCode
                    },
                }
            })
            
            if(!profile)
            {
                return {error: "khong tim thay user "};
            }
            
            const post = await db.post.findUnique({
                where:
                {
                    id: postId,
                    isArchived: false
                }
            })      
            
            if(!post)
            {
                return {error: "khong tim thay post"};
            }

            const save =  await db.postSave.findUnique({
                where: {
                    profileId_postId:
                    {
                        profileId: profile.id,
                        postId: post.id
                    }
                }
            })

            if (save) 
            {
                await db.postSave.delete({
                    where:
                    {
                        id:save.id
                    }
                })
                return {success: "unSave thanh cong"};
                
            }
            
            await db.postSave.create({
                data:{
                    postId: post.id,
                    profileId: profile.id
                }
            })
            return {success: "save thanh cong!!! "}
    }
    catch(error)
    {
        console.log(error);
        return {error: "save that bai "}
    }
}