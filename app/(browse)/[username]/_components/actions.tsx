"use client"

import { onblock, onUnblock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
    isFollowing: boolean;
    isBlocked : boolean;
    userId : string;
}

const Actions = ({isFollowing ,isBlocked, userId}:ActionsProps) => {
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

    const handleBlock = () => {
      startTransition(() => {
        onUnblock(userId)
          .then((data) => toast.success(`blocked the user ${data.blocked.username}`))
          .catch(() => toast.error("Something went wrong"));
      });
    }


  return (
    <>
   
    <Button disabled={isPending} onClick={onClick} variant="default">
        {isFollowing ? "UnFollow" : "Follow"}
    </Button>
    <Button disabled={isPending} onClick={handleBlock} variant={'secondary'}>
        block
    </Button>
    </>
  )
}

export default Actions