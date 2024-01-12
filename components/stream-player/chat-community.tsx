"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import CommunityItem from "@/components/stream-player/community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";


interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

const ChatCommunity = ({
  hostName,
  viewerName,
  isHidden,
}: ChatCommunityProps) => {
  const participant = useParticipants();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const  filteredParticipants = useMemo(() => {
    const deduped = participant.reduce((acc,participant) => {
      const hostAsViewer = `host-${participant.identity}`
      if(!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant)
      }
      return acc;
    },[] as (RemoteParticipant | LocalParticipant)[])

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLocaleLowerCase())
    })
  },[debouncedValue ,participant])
  

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disable</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results found
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name} // Add the participantName property
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
