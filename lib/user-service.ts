import { db } from "@/lib//db";

const getUserByUserName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
    });
    return user;

}

export default getUserByUserName;