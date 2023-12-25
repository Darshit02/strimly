"use client"

import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
    isFollowing: boolean;
    userId : string;
}

const Actions = ({isFollowing , userId}:ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
          onFollow(userId)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      };
    
      const handleUnfollow = () => {
        startTransition(() => {
          onUnfollow(userId)
            .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      };
    const onClick = () => {
        if (isFollowing) {
            handleUnfollow()
        } else {
            handleFollow()
        }
    
    }

  return (
    <Button disabled={isPending} onClick={onClick} variant="default">
        {isFollowing ? "UnFollow" : "Follow"}
    </Button>
  )
}

export default Actions