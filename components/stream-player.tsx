"use client"
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
    user : User & { stream: Stream  | null};
    stream: Stream 
    isFollowing : boolean;
    
}
const StreamPlayer = ({user,stream,isFollowing}:StreamPlayerProps) => {
    const {
        token ,
         name,
         identity
    } = useViewerToken(user.id)

    if (!token || !name || !identity) {
        return (
            <div>
                Can not watch a Stream
            </div>
        )
    }
  return (
    <div>
        allowed to watch a stream
    </div>
  )
}

export default StreamPlayer