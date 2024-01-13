import Link from "next/link";
import { Stream, User } from "@prisma/client";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import  LiveBadge  from "@/components/live-badge";
import  UserAvatar  from "@/components/UserAvatar";
import { UserAvatarSkeleton } from "@/components/UserAvatar";

interface ResultCardProps {
  data: {
    user: User,
    isLive: boolean;
    name: string;
    thumbnail: string | null;
  };
};

export const ResultCard = ({
  data,
}: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnail}
          fallback={data.user.imageURl}
          isLive={data.isLive}
          username={data.user.username}
        />
        {data.isLive && (
          <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
            <LiveBadge />
          </div>
        )}
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageURl={data.user.imageURl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="trunacte font-semibold hover:text-blue-500">
              {data.name}
            </p>
            <p className="text-muted-foreground">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>
    </div>
  );
};