import { getFollowedUsers } from "@/lib/follow-service";
import {getRecommended} from "@/lib/recommended-service";
import React from "react";
import Wrapper from "./wrapper";
import Toggle, { ToggleSkeleton } from "./Toggle";
import Recommended, { RecommendedSkeleton } from "./Recommended";

import { FollowingSkeleton } from "./Following";
import {Following} from "./Following";

const Sidebar = async () => {
  const recommended = await getRecommended()
  const following = await getFollowedUsers()
  
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following}/>
        <Recommended data={recommended}/>
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
      <ToggleSkeleton/>
      <FollowingSkeleton/>
      <RecommendedSkeleton/>
    </aside>
  );
};