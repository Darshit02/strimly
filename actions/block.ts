"use server"

import { blockUser, unblockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

export const onblock = async (id: string) => {
    // TODO : Disconnect the user from the socket
    // TODO : ability kike the guest
   
        
        const bloackedUser = await blockUser(id)
        revalidatePath("/")
        if (bloackedUser) {
            revalidatePath(`/${bloackedUser.blocked.username}`)
        }
        return bloackedUser
}
export const onUnblock = async (id: string) => {
    const unbloackedUser = await unblockUser(id)
    revalidatePath("/")
    if (unbloackedUser) {
        revalidatePath(`/${unbloackedUser.blocked.username}`)
    }
    return unbloackedUser
}