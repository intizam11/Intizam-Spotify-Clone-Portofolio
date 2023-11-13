"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import PlayMusicMobile from "@/app/components/componentMobile/viewPlayMusic";
import SpotifyWebApi from "spotify-web-api-js";
import AudioPlayerMobile from "@/app/components/componentMobile/audioPlayerMobile";
import { UserContext } from "../context/context";
import SkeltonDiscover from "@/app/components/componentMobile/skeltonDiscover";
import SkeltonTrending from "@/app/components/componentMobile/skeltonTrending";
import SkeltonHotHits from "@/app/components/componentMobile/skeltonHotHits";
import DetailAlbumMobile from "@/app/components/componentMobile/detailAlbumMobile";

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
  const [skeltonMusic, setSkeltonMusic] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [genre, setGenre] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [tipeSearch, setTipeSearch] = useState("track");
  const debounceTimeout = 1000;
  let debounceTimer;
  const [resultAlbum, setResultAlbum] = useState();
  const [resultArtist, setResultForArtist] = useState();
  const [resultTrack, setResultTrack] = useState();
  const [isHover, setIsHover] = useState();
  const [titleDelay, setTitleDelay] = useState(true);

  const colorClassNames = [
    "bg-amber-600",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-indigo-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-yellow-600",
    "bg-teal-600",
    "bg-cyan-600",
    "bg-lime-600",
    "bg-fuchsia-600",
    "bg-gray-600",
    "bg-orange-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-purple-700",
    "bg-red-700",
    "bg-yellow-700",
    "bg-teal-700",
  ];

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

  const fetchGenre = async () => {
    const response = await fetch(
      "https://api.spotify.com/v1/recommendations?seed_genres=acoustic",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const data = await response.json();
    setGenre(data.tracks);
  };

  function fillInput(e) {
    setInputSearch(e.target.value);
  }

  const changeTipeSearch = (item) => {
    setTipeSearch(item);
  };

  const fetchTrack = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/search?q=${inputSearch}&type=track&limit=30`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      setResultTrack(data.tracks.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArtist = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/search?q=${inputSearch}&type=artist&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      setResultForArtist(data.artists.items);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchAlbum = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     const response = await fetch(
  //       `${baseUrl}/search?q=${inputSearch}&type=album&limit=50`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setResultAlbum(data.albums.items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const formatYear = (releaseDate) => {
    let result = new Date(releaseDate).getFullYear();
    return result;
  };

  useEffect(() => {
    getToken();
    localStorage.removeItem("history");
    setTimeout(() => {
      getplaylist();
      getLagiViral();
      getHotHits();
      fetchGenre();
      setTitleDelay(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (inputSearch !== "") {
      debounceTimer = setTimeout(() => {
        // fetchAlbum();
        fetchArtist();
        fetchTrack();
      }, debounceTimeout);
    }
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputSearch, tipeSearch]);

  return (
    <>
      <div className=" h-screen bg-black  ">
        <div className=" h-1/5 ">
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
                  onClick={() => {
                    setViewPageMobile("landingpageMobile");
                  }}
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
                  onChange={fillInput}
                  placeholder="search"
                  className="rounded-lg outline-none w-40 p-1 text-gray-950"
                  type="text"
                />
              </div>
              <div className=" grid gap-x-8 gap-y-4 grid-cols-3 w-1/2"></div>
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
            {titleDelay ? (
              <></>
            ) : (
              <>
                <div className="h-6 ms-2 flex animate__animated animate__fadeIn">
                  <h1 className=" font-bold  text-white font-bold">
                    Discover{" "}
                  </h1>
                  <img className="w-8 h-4 ms-2" src="/arrow2.png" alt="" />
                </div>
              </>
            )}

            {skeltonMusic ? (
              <SkeltonDiscover />
            ) : (
              <>
                <div class=" flex  overflow-x-scroll ">
                  {music?.map((item1, index) => (
                    <div
                      key={index}
                      className=" bg-neutral-800 h-28 w-28 flex-shrink-0 rounded-lg m-2 relative"
                    >
                      <img
                        className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                        src={item1.track.album.images[1].url}
                        alt="tidak ada gambar"
                      />
                      <div
                        className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                        onClick={() => {
                          setBottomBar(true);
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
                        <img
                          className="w-6 h-6"
                          src="/playbutton.jpg"
                          alt="not"
                        />
                      </div>
                      {/* <div className="flex justify-center align-item items-center overflow-hidden">
                    <h1 className="text-white text-sm font-semibold">{item1.track.name}</h1>
                  </div> */}
                    </div>
                  ))}
                </div>
              </>
            )}
            {titleDelay ? (
              <></>
            ) : (
              <>
                <div className="h-6 ms-2 flex animate__animated animate__fadeIn">
                  <h1 className=" font-bold  text-white font-bold">
                    Trending{" "}
                  </h1>
                  <img className="w-8 h-4 ms-2" src="/arrow2.png" alt="" />
                </div>
              </>
            )}

            {skeltonMusic ? (
              <SkeltonTrending />
            ) : (
              <div class=" flex overflow-x-scroll animate__animated animate__fadeIn">
                {lagiViral?.map((item2, index) => (
                  <div
                    key={index}
                    className="flex justify-center align-item items-center  h-28 w-32 flex-shrink-0 rounded-lg m-2 relative"
                  >
                    <img
                      className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                      src={item2.track.album.images[1].url}
                      alt="tidak ada gambar"
                    />
                    <div
                      className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                      onClick={() => {
                        setBottomBar(true);
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
                      <img
                        className="w-6 h-6"
                        src="/playbutton.jpg"
                        alt="not"
                      />
                    </div>
                    {/* <div className="flex justify-center align-item items-center overflow-hidden">
                    <h1 className="text-white text-sm font-semibold">
                      {item2.track.name}
                    </h1>
                  </div> */}
                  </div>
                ))}
              </div>
            )}
            {titleDelay ? (
              <></>
            ) : (
              <>
                <div className="h-6 ms-2 flex ">
                  <h1 className=" font-bold  text-white font-bold">
                    Hot Hits{" "}
                  </h1>
                </div>
              </>
            )}

            {skeltonMusic ? (
              <SkeltonHotHits />
            ) : (
              <div class=" grid gap-x-2 gap-y-6 grid-cols-3 sm:grid-cols-4 p-4">
                {hotHits?.map((item3, index) => (
                  <>
                    <div
                      key={index}
                      className=" h-24 w-24 flex-shrink-0 rounded-lg m-2 relative"
                    >
                      <img
                        className="mx-auto   rounded-md h-16 w-16  w-full h-full "
                        src={item3.track.album.images[1].url}
                        alt="tidak ada gambar"
                      />
                      <div
                        className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                        onClick={() => {
                          setBottomBar(true);
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
            )}
          </div>
        )}

        {viewPageMobile == "playMusicMobile" && (
          <>
            <PlayMusicMobile />
          </>
        )}

        {viewPageMobile == "searchMusicMobile" && (
          <>
            {inputSearch == "" ? (
              <div className="h-4/5   grid gap-x-2 gap-y-4 grid-cols-3 sm:grid-cols-4  overflow-auto">
                {genre?.map((itemGenre, index) => (
                  <div
                    key={index}
                    className={` h-28 w-28 rounded-lg overflow-hidden relative animate__animated animate__fadeIn ${
                      colorClassNames[index % colorClassNames.length]
                    }`}
                  >
                    <div className=" mt-2 ms-2">
                      <h1 className="text-sm font-bold">{itemGenre.name}</h1>
                    </div>
                    <div className=" absolute  -bottom-4  -right-4 w-16 h-16 ">
                      <img
                        className="rotate-45 w-16 h-16"
                        src={itemGenre.album.images[1].url}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" h-4/5  overflow-auto">
                {/* <div className="h-8   w-full">
                  {inputSearch ? (
                    <div className="  grid gap-x-4 gap-y-4 grid-cols-1 animate__animated animate__fadeIn">
                      {tipeSearch === "album" ? (
                        <div
                          className="w-24  bg-white text-slate-950  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("album")}
                        >
                          <h1>Album</h1>
                        </div>
                      ) : (
                        <div
                          className="w-24 bg-neutral-800  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("album")}
                        >
                          <h1>Album</h1>
                        </div>
                      )}
                      {tipeSearch === "artist" ? (
                        <div
                          className="w-24 bg-white text-slate-950  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("artist")}
                        >
                          <h1>Artis</h1>
                        </div>
                      ) : (
                        <div
                          className="w-24 bg-neutral-800  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("artist")}
                        >
                          <h1>Artis</h1>
                        </div>
                      )}
                      {tipeSearch === "track" ? (
                        <div
                          className="w-24 bg-white text-slate-950  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("track")}
                        >
                          <h1>Track</h1>
                        </div>
                      ) : (
                        <div
                          className="w-24 bg-neutral-800  h-7 rounded-lg flex justify-center cursor-pointer drop-shadow-2xl"
                          onClick={() => changeTipeSearch("track")}
                        >
                          <h1>Track</h1>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="animate__animated animate__fadeOut"> </div>
                  )}
                </div> */}

                {/* {tipeSearch === "album" && (
                  <div className="  grid gap-x-2 gap-y-4 grid-cols-3 ">
                    {resultAlbum?.map((itemAlbum, index) => (
                      <div
                        key={index}
                        className={`bg-neutral-800 h-44  rounded-lg animate__animated animate__fadeIn cursor-pointer drop-shadow-2xl overflow-hidden`}
                        onClick={() => {
                          setViewPageMobile("detailAlbumMobile");
                          dispatch({
                            type: "SET_DETAIL_ALBUM",
                            payload: {
                              detailValueIdAlbum: itemAlbum.id,
                              detailValueTypeAlbum: itemAlbum.type,
                              detailValueImageAlbum: itemAlbum.images[0].url,
                              detailValueArtisName: itemAlbum.artists[0].name,
                              detailValueReleaseAlbum: itemAlbum.release_date,
                              detailValueTotalTrackAlbum:
                                itemAlbum.total_tracks,
                              detailValueNameAlbum: itemAlbum.name,
                            },
                          });
                        }}
                      >
                        <div className="rounded-md mx-auto mt-2  w-24 h-24 ">
                          <img
                            className="w-24 h-24 rounded-md"
                            src={itemAlbum.images[0].url}
                            alt=""
                          />
                        </div>
                        <div className=" mx-auto overflow-hidden mt-2  w-36 h-4">
                          <p className="font-bold text-xs text-white">
                            {" "}
                            {itemAlbum.name}
                          </p>
                        </div>
                        <div className="flex  mx-auto overflow-hidden mt-1  w-36 h-6">
                          <div className="ms-1 me-1">
                            <p className="text-xs text-gray-300"> • </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-300 font-medium">
                              {itemAlbum.artists[0].name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                {/* {tipeSearch === "artist" && (
                  <>
                    <div className="  grid gap-x-2 gap-y-4 grid-cols-3 mt-4 ">
                      {resultArtist?.map((itemArtis, index) => (
                        <div
                          key={index}
                          className={` bg-neutral-800 h-48 w-34 rounded-lg animate__animated animate__fadeIn drop-shadow-2xl`}
                        >
                          {itemArtis.images[0] && itemArtis.images[0].url ? (
                            <div className="rounded-full mx-auto mt-2  w-28 h-28 ">
                              <img
                                className=" w-28 h-28  rounded-full"
                                src={itemArtis.images[0].url}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className=" rounded-full mx-auto mt-2  w-28 h-28 ">
                              <img
                                className=" w-28 h-28  rounded-full"
                                src="/baru.jpg"
                                alt=""
                              />
                            </div>
                          )}

                          <div className=" mx-auto overflow-hidden mt-2  w-36 h-4">
                            <p className="font-bold text-xs text-white">
                              {" "}
                              {itemArtis.name}
                            </p>
                          </div>
                          <div className="flex  mx-auto overflow-hidden mt-1  w-36 h-6">
                            <div>
                              <p className="text-xs text-gray-300 font-medium">
                                {itemArtis.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )} */}

                {tipeSearch === "track" && (
                  <>
                    <div>
                      <div className="">
                        {resultTrack?.map((itemTrack, index) => (
                          <div
                            key={index}
                            className="mt-6  h-full flex "
                            onClick={() => {
                              dispatch({
                                type: "SETAUDIO_PLAYER",
                                isLoading: true,
                                payload: {
                                  audioName: itemTrack.name,
                                  artisName: itemTrack.artists[0].name,
                                  audioImage: itemTrack.album.images[0].url,
                                  audioUrl: itemTrack.preview_url,
                                },
                              });
                            }}
                            onMouseEnter={() => setIsHover(index)}
                            onMouseLeave={() => setIsHover(null)}
                          >
                            <div className=" flex w-full">
                              {isHover === index ? (
                                <div className="  w-14 flex justify-center align-item items-center cursor-pointer">
                                  <div className="bg-green-500 w-8 h-8  flex items-center justify-center rounded-full mx-auto">
                                    <img
                                      className="w-5 h-5"
                                      src="/playbutton.jpg"
                                      alt="not"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="  w-14 flex justify-center align-item items-center">
                                  <p>{index + 1}</p>
                                </div>
                              )}

                              <div className="">
                                <img
                                  className="h-14 w-14"
                                  src={itemTrack.album.images[0].url}
                                  alt=""
                                />
                              </div>
                              <div className=" ms-2  w-full">
                                <p className="text-sm font-bold">
                                  {itemTrack.name}
                                </p>
                                <div className="m-2"></div>
                                <p className="text-sm text-gray-300 font-medium">
                                  {itemTrack.artists[0].name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {viewPageMobile == "detailAlbumMobile" && (
          <>
            <div className=" bg-neutral-900 overflow-auto h-screen md:w-4/5 relative">
              <div className=" rounded-md flex ">
                <div className=" animate__animated animate__fadeIn w-1/3 flex justify-center align-item items-center ">
                  <div>
                    <img
                      className=" w-32 h-34  "
                      src={state.detailAlbum.detailValueImageAlbum}
                      alt=""
                    />
                  </div>
                </div>

                <div className=" animate__animated animate__fadeIn w-2/3 flex justify-center align-item items-center">
                  <div className="ps-2   w-full  ">
                    <div className="">
                      <p className="text-white">
                        {state.detailAlbum.detailValueTypeAlbum}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-white">
                        {state.detailAlbum.detailValueNameAlbum}
                      </h1>
                    </div>
                    <div className="h-8  flex">
                      {/* <div>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={state.detailAlbum.detailValueImageAlbum}
                          alt=""
                        />
                      </div> */}
                      <div className="mt-2">
                        <p className="text-xs text-white">
                          {state.detailAlbum.detailValueArtisName}
                        </p>
                      </div>
                      <div className="mt-2 ms-2">
                        <p className="text-xs text-white">
                          {state.detailAlbum.detailValueReleaseAlbum}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-4">
                <DetailAlbumMobile />
              </div>
            </div>
          </>
        )}
      </div>
      {/* navbar bottom */}
      {state.isLoading ? <></> : <>{bottomBar && <AudioPlayerMobile />}</>}

      {/* navbar bottom */}
    </>
  );
}
