"use server"

import { Stream } from "@prisma/client"
import { db } from "@/lib/db"
import getSelf from "@/lib/auth-service"
import { revalidatePath } from "next/cache"


export const updateStream =async (values:Partial<Stream>) => {
    try{
        const self = await getSelf()
        const selfStream = await db.stream.findUnique({
            where:{
                userId : self.id
            }
        })

        if(!selfStream){
            throw new Error("Stream not found")
        }
        const validDate = {
            name : values.name,
            isChatEnabled : values.isChatEnabled,
            isChatFollowersOnly : values.isChatFollowersOnly,
            isChatDelayed : values.isChatDelayed,
        }
const stream = await db.stream.update({
    where:{
        userId : self.id
    },
    data : {
        ...validDate,
    }
})
revalidatePath(`u/${self.username}/chat`)
revalidatePath(`u/${self.username}`)
revalidatePath(`/${self.username}`)



    }
    catch{
        throw new Error ("Internal Error")
    }
}