import { db } from "@/lib//db";

const getUserByUserName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        include :{
                stream : true,
                _count : {
                    select : {
                        followedBy : true,
                    }
                }
            }
    });
    return user;

}

export default getUserByUserName;

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id,
        },
        include :{
                stream : true   
            }
    });
    return user;

}

