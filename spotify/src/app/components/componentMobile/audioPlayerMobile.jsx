"client use";

import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "@/app/context/context";

export default function AudioPlayerMobile() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, dispatch] = useContext(UserContext);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (ms) => {
    const minute = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed();
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurentTime(audioRef.current.currentTime * 1000);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration * 1000);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  return (
    <>
      <div className=" absolute inset-x-0 bottom-0 h-16  bg-black z-20 border grid grid-cols-3 animate__animated animate__fadeIn">
        <div className="border flex h-full justify-center align-item items-center h-full ">
          {state.audioData.audioImage ? (
            <div className=" w-10 h-10 m-2">
              <img
                className="w-10 h-10 rounded-lg"
                src={state.audioData.audioImage}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="border flex h-full justify-center align-item items-center">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={state.audioData.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div
            onClick={togglePlay}
            className="bg-white w-8 h-8  flex items-center justify-center rounded-full mx-auto "
          >
            {isPlaying ? (
              <>
                <Image
                  width={24}
                  height={24}
                  src="/pausebutton.png"
                  alt="not"
                />
              </>
            ) : (
              <>
                <Image width={24} height={24} src="/playbutton.jpg" alt="not" />
              </>
            )}
          </div>
        </div>
        <div className="border flex h-full justify-center align-item items-center"></div>
      </div>
    </>
  );
}
