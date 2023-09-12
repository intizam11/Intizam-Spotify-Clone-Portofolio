"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import PlayMusicMobile from "@/app/components/componentMobile/viewPlayMusic";
import SpotifyWebApi from "spotify-web-api-js";
import AudioPlayerMobile from "@/app/components/componentMobile/audioPlayerMobile";
import { UserContext } from "../context/context";

export default function Mobile() {
  const [viewPageMobile, setViewPageMobile] = useState("landingpageMobile");
  const spotifyAPI = new SpotifyWebApi();
  let greet = new Date().getHours();
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const client_id = process.env.NEXT_PUBLIC_CLIENT;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [music, setMusic] = useState();
  const [lagiViral, setLagiViral] = useState();
  const [hotHits, setHotHits] = useState();
  console.log(hotHits);
  // console.log(music);
  const [skeltonMusic, setSkeltonMusic] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const greetings = () => {
    if (greet < 11) {
      return "Selamat Pagi";
    } else if (greet >= 11 && greet < 16) {
      return "Selamat Siang";
    } else if (greet >= 16 && greet < 18) {
      return "Selamat Sore";
    } else if (greet >= 18) {
      return "Selamat Malam";
    }
  };

  const getplaylist = async () => {
    try {
      setSkeltonMusic(true);
      const response = await fetch(
        `${baseUrl}/playlists/37i9dQZF1E393iiHDlOR3i`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.tracks.items) {
        setMusic(data.tracks.items);
        setSkeltonMusic(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLagiViral = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/playlists/37i9dQZF1E4yACKd7wTw5b`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.tracks.items) {
        setLagiViral(data.tracks.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHotHits = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/playlists/37i9dQZF1DWY8wQ1UHaykc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.tracks.items) {
        setHotHits(data.tracks.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        },
        body: "grant_type=client_credentials",
      });
      const data = await response.json();
      const acces_token = data.access_token;
      spotifyAPI.setAccessToken(acces_token);
      localStorage.setItem("Token", acces_token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    localStorage.removeItem("history");
    setTimeout(() => {
      getplaylist();
      getLagiViral();
      getHotHits();
    }, 500);
  }, []);

  // const [inputSearch, setInputSearch] = useState("Ed sheran");

  // const handleInput = (event) => {
  //   setInputSearch(encodeURIComponent(event.target.value));
  // };

  // const searchArtist = async () => {
  //   const response = await fetch(
  //     `${baseURL}/search?q=${inputSearch}&type=artist`,
  //     {
  //       headers: {
  //         Authorization: `Bearer  ${localStorage.getItem("Token")}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data.artists.items);
  // };

  // useEffect(() => {
  //   searchArtist();
  // }, []);

  return (
    <>
      <div className=" h-screen bg-black  ">
        <div className="h-1/5 ">
          {/* header */}
          <div className=" flex">
            {/* header kiri */}
            <div className=" w-1/2">
              <Image
                width={56}
                height={56}
                className="w-14 h-14"
                src="/spo.png"
                alt="none"
              />
            </div>
            {/* header kiri */}
            {/* header kanan */}
            <div className="w-1/2  flex  justify-end">
              {viewPageMobile == "searchMusicMobile" ? (
                <div
                  onClick={() => {setViewPageMobile("landingpageMobile")}}
                  className=" flex h-full justify-center align-item items-center w-14 h-full"
                >
                  <div className=" w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
                    <Image width={24} height={24} src="/music.png" alt="not" />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setViewPageMobile("searchMusicMobile")}
                  className=" flex h-full justify-center align-item items-center w-14 h-full"
                >
                  <div className=" w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
                    <Image
                      width={24}
                      height={24}
                      src="/pencarian.png"
                      alt="not"
                    />
                  </div>
                </div>
              )}

              <div
                onClick={() => setBottomBar(!bottomBar)}
                className=" w-14 h-full flex justify-center align-item items-center"
              >
                <Image width={38} height={38} src="/humberger.png" alt="none" />
              </div>
            </div>
            {/* header kanan */}
          </div>
          {/* header */}

          {viewPageMobile == "searchMusicMobile" ? (
            <div className=" flex p-4 ">
              <div className="w-1/2  ">
                <input
                  // onChange={handleInput}
                  placeholder="search"
                  className="rounded-lg outline-none w-40 p-1 text-gray-950"
                  type="text"
                />
              </div>
              <div className="flex justify-items-center   w-1/2"></div>
            </div>
          ) : (
            <div className=" flex p-4 ">
              <div className=" w-full flex justify-center align-item items-center">
                <h1 className="text-3xl font-bold  text-white font-bold">
                  {greetings()}
                </h1>
              </div>
            </div>
          )}
          {/* search bar */}

          {/* search bar */}
        </div>

        {viewPageMobile == "landingpageMobile" && (
          <div className=" h-4/5 overflow-auto">
            <div className="h-6 ms-2 flex ">
              <h1 className=" font-bold  text-white font-bold">Discover </h1>
              <img className="w-8 h-4 ms-2" src="/arrow2.png" alt="" />
            </div>
            <div class=" flex  overflow-x-scroll ">
              {music?.map((item1) => (
                <div className=" bg-neutral-800 h-28 w-28 flex-shrink-0 rounded-lg m-2 relative">
                  <img
                    className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                    src={item1.track.album.images[1].url}
                    alt="tidak ada gambar"
                  />
                  <div
                    className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                    onClick={() => {
                      setBottomBar(true)
                      dispatch({
                        type: "SETAUDIO_PLAYER",
                        isLoading: true,
                        payload: {
                          audioName: item1.track.name,
                          artisName: item1.track.artists[0].name,
                          audioImage: item1.track.album.images[0].url,
                          audioUrl: item1.track.preview_url,
                        },
                      });
                    }}
                  >
                    <img className="w-6 h-6" src="/playbutton.jpg" alt="not" />
                  </div>
                  {/* <div className="flex justify-center align-item items-center overflow-hidden">
                    <h1 className="text-white text-sm font-semibold">{item1.track.name}</h1>
                  </div> */}
                </div>
              ))}
            </div>
            <div className="h-6 ms-2 flex">
              <h1 className=" font-bold  text-white font-bold">Trending </h1>
              <img className="w-8 h-4 ms-2" src="/arrow2.png" alt="" />
            </div>
            <div class=" flex overflow-x-scroll">
              {lagiViral?.map((item2) => (
                <div className="flex justify-center align-item items-center  h-28 w-32 flex-shrink-0 rounded-lg m-2 relative">
                  <img
                    className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                    src={item2.track.album.images[1].url}
                    alt="tidak ada gambar"
                  />
                  <div
                    className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                    onClick={() => {
                      setBottomBar(true)
                      dispatch({
                        type: "SETAUDIO_PLAYER",
                        isLoading: true,
                        payload: {
                          audioName: item2.track.name,
                          artisName: item2.track.artists[0].name,
                          audioImage: item2.track.album.images[0].url,
                          audioUrl: item2.track.preview_url,
                        },
                      });
                    }}
                  >
                    <img className="w-6 h-6" src="/playbutton.jpg" alt="not" />
                  </div>
                  {/* <div className="flex justify-center align-item items-center overflow-hidden">
                    <h1 className="text-white text-sm font-semibold">
                      {item2.track.name}
                    </h1>
                  </div> */}
                </div>
              ))}
            </div>
            <div className="h-6 ms-2 flex ">
              <h1 className=" font-bold  text-white font-bold">Hot Hits </h1>
            </div>
            <div class=" grid gap-x-2 gap-y-6 grid-cols-3 sm:grid-cols-4 p-4">
              {hotHits?.map((item3) => (
                <>
                  <div className=" h-24 w-24 flex-shrink-0 rounded-lg m-2 relative">
                    <img
                      className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                      src={item3.track.album.images[1].url}
                      alt="tidak ada gambar"
                    />
                    <div
                      className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                      onClick={() => {
                        setBottomBar(true)
                        dispatch({
                          type: "SETAUDIO_PLAYER",
                          isLoading: true,
                          payload: {
                            audioName: item3.track.name,
                            artisName: item3.track.artists[0].name,
                            audioImage: item3.track.album.images[0].url,
                            audioUrl: item3.track.preview_url,
                          },
                        });
                      }}
                    >
                      <img
                        className="w-6 h-6"
                        src="/playbutton.jpg"
                        alt="not"
                      />
                    </div>
                    <div className="h-6  overflow-hidden ">
                      <h1 className="text-white text-sm font-semibold">
                        {item3.track.name}
                      </h1>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}

        {viewPageMobile == "playMusicMobile" && (
          <>
            <PlayMusicMobile />
          </>
        )}

        {viewPageMobile == "searchMusicMobile" && (
          <div className="h-4/5 ">cek</div>
        )}
      </div>
      {/* navbar bottom */}
      {state.isLoading ? <></> : <>{bottomBar && <AudioPlayerMobile />}</>}

      {/* navbar bottom */}
    </>
  );
}
