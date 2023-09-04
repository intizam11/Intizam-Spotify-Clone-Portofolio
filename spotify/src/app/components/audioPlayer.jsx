"client use";

import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/context";
import Image from "next/image";

const AudioPlayer = (props) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);

  // const handleHistory = () => {
  //   const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
  //   const updatedHistory = [...existingHistory, state.audioData];
  //   localStorage.setItem("history", JSON.stringify(updatedHistory));
  // };
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

  // useEffect(() => {
  //   handleHistory()
  // },[state.audioData])

  return (
    <div className="relative  w-full flex flex justify-between ">
      {state.audioData.audioImage ? (
        <div className=" w-80 flex h-20 rounded-lg animate__animated animate__fadeIn">
          <div className="rounded-lg overflow-hidden w-14 h-14 mt-2.5 ms-2">
            <Image
              width={56}
              height={56}
              src={state.audioData.audioImage}
              alt="none"
              className="w-14 h-14"
            />
          </div>
          <div className="rounded-lg  overflow-hidden  w-full h-14 mt-2.5 ms-2">
            <h1 className="font-semibold">{state.audioData.audioName}</h1>
            <h3 className="text-sm">{state.audioData.artisName}</h3>
          </div>
        </div>
      ) : (
        <div className="w-80 h-20 rounded-lg"></div>
      )}

      <div className=" w-96 h-20 rounded-lg animate__animated animate__fadeIn ">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={state.audioData.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div onClick={togglePlay}>
          {isPlaying ? (
            <div className="">
              <div className="bg-green-500 w-12 h-12  flex items-center justify-center rounded-full mx-auto ">
                <Image
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  src="/pausebutton.png"
                  alt="not"
                />
              </div>
              <div className=" flex justify-center align-item items-center">
                <div className="me-2">
                  <p className="text-xs text-gray-400 font-semibold">
                    {formatTime(currentTime)}
                  </p>
                </div>
                <input
                  className="w-80"
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) =>
                    (audioRef.current.currentTime = e.target.value / 1000)
                  }
                />
                <div className="ms-2">
                  <p className="text-xs text-gray-400 font-semibold">
                    {formatTime(duration)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="bg-green-500 w-12 h-12  flex items-center justify-center rounded-full mx-auto ">
                <Image
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  src="/playbutton.jpg"
                  alt="not"
                />
              </div>
              <div className=" flex justify-center align-item items-center">
                <div className="me-2">
                  <p className="text-xs text-gray-400 font-semibold">
                    {formatTime(currentTime)}
                  </p>
                </div>
                <input
                  className="w-80"
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) =>
                    (audioRef.current.currentTime = e.target.value / 1000)
                  }
                />
                <div className="ms-2">
                  <p className="text-xs text-gray-400 font-semibold">
                    {formatTime(duration)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" w-80 h-20 rounded-lg"></div>
    </div>
  );
};

export default AudioPlayer;
