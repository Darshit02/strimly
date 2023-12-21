import { currentUser } from "@clerk/nextjs";

import {db} from "@/lib/db";

const getSelf = async () => {
    const self = await currentUser()

    if (!self || !self.username) {
        throw new Error("Unauthorized")
    }
    
    const user = await db.user.findUnique({
        where : {
            externalUserId : self.id
        }
    })
    if(!user) {
        throw new Error("Not found")
    }
return user
}

export default getSelf


