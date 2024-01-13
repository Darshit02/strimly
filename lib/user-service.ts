import { db } from "@/lib//db";

const getUserByUserName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select :{
            id : true,
            externalUserId : true,
            username : true,
            bio : true,
            imageURl : true,
                stream : {
                    select:{
                        id : true,
                        isLive : true,
                        isChatEnabled : true,
                        isChatDelayed : true,
                        isChatFollowersOnly : true,
                        thumbnail : true,
                        name : true,
                    },
                },
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

