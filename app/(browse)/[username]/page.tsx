import getUserByUserName from "@/lib/user-service";
import { notFound } from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import Actions from "./_components/actions";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);


  return (
  <div className="flex flex-col gap-y-4">
    <p>User Name : {user.username}</p>
    <p>User Id : {user.id}</p>
    <p>is Following : {`${isFollowing}`}</p>
    <Actions isFollowing={isFollowing} userId={user.id}/>
    </div>
  )
};

export default UserPage;
