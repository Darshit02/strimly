"use client";

import { Participant, Track } from "livekit-client";
import { useRef, useState,useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { useTracks } from "@livekit/components-react";
import FullScreenControl from "@/components/stream-player/fullscreen-control";
import { VolumeControl } from "@/components/stream-player/volume-control";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrepperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [Volume, setVolume] = useState(0)
  
  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted= value === 100
      videoRef.current.volume = +value * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = Volume === 0;
    setVolume(isMuted ? 50 : 0)

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  }
  useEffect(()=>{
    onVolumeChange(0)
  },[])

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrepperRef?.current) {
      wrepperRef.current.requestFullscreen();
    }
  };
  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };
  useEventListener("fullscreenchange", handleFullscreenChange, wrepperRef);
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div className="relative h-full flex" ref={wrepperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl 
            onChange={onVolumeChange}
            onToggle={toggleMute}
            value={Volume}
          />
          <FullScreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
