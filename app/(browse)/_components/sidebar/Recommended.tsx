"use client";

import { Stream, User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import  {UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: (User & {
    stream : Stream | null
  })[];
}
const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLable = !collapsed && data.length > 0;
  return (
    <div>
      {showLable && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
            <UserItem key={user.id}
               username = {user.username}
               imageURl = {user.imageURl}
               isLive = {user.stream?.isLive}
               />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;

export const RecommendedSkeleton = () => {
return (
  <ul className="px-2">
    {
      [...Array(3)].map((_,i) => (
        <UserItemSkeleton key={i}/>
      ))
    }
  </ul>
)
}