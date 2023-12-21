import { db } from "@/lib/db";
import getSelf from "@/lib/auth-service";

const getRecommended = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const user = await db.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    })

    return user
}

export default getRecommended
