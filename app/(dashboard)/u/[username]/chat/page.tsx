import getSelf from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import ToggleCard from './_components/toggle-card'

const ChatPage = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if (!stream) {
        throw new Error('Stream not found') 
    }


  return (
    <div className='p-6'>
        <div className="mb-4">
            <h1 className="text-2xl font-bold">
                Chat Settings
            </h1>
        </div>
        <div className="space-y-4">
            <ToggleCard
                 feild ='isChatEnabled'
                label = 'Enable Chat'
                value={stream.isChatEnabled}
            />
             <ToggleCard
                 feild ='isChatDelayed'
                label = 'Delayed Chat'
                value={stream.isChatDelayed}
            />
                <ToggleCard
                 feild ='isChatFollowersOnly'
                label = 'Must be following to Chat'
                value={stream.isChatFollowersOnly}
            />
        </div>
    </div>
  )
}

export default ChatPage