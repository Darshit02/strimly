import StreamPlayer from "@/components/stream-player";
import getUserByUserName from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreaterPageProps {
  params: {
    username: string;
  };
}

const CreaterPage = async ({ params }: CreaterPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("unauthorized");
  }

  return( 
  <div className="h-full">
    <StreamPlayer 
      user={user}
      stream={user.stream}
      isFollowing
  />
  </div>
  )
};

export default CreaterPage;
