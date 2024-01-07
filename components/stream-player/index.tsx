"use client"
import { useViewerToken } from "@/hooks/use-viewer-token";
import {LiveKitRoom} from "@livekit/components-react";
import { Stream, User } from "@prisma/client";
import {Video} from "./Video";
import { cn } from "@/lib/utils";

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
    <>
        <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
        )}
      >
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <Video
                hostName = {user.username}
                hostIdentity = {user.id}
                />
            </div>
        </LiveKitRoom>
    </>
  )
}

export default StreamPlayer