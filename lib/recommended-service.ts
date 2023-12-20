import { db } from "@/lib/db";
import getSelf from "@/lib/auth-service";

const getRecommended = async () => {
    const user = await db.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    })

    return user
}

export default getRecommended
