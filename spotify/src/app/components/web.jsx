import Image from "next/image";
import SkeltonMusic from "../components/load";
import React, { useEffect, useState, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import AudioPlayer from "../components/audioPlayer";
import Style from "../components/viewDetailAlbum.module.css";
import ViewDetailAlbum from "./viewDetailAlbum";
// import { useSelector, useDispatch } from "react-redux";
// import { setMyState } from "@/app/redux/action";
import { UserContext } from "../context/context";

import About from "@/app/components/aboutCompnt/about";

export default function Web() {
  const spotifyAPI = new SpotifyWebApi();
  let greet = new Date().getHours();
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const client_id = process.env.NEXT_PUBLIC_CLIENT;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [music, setMusic] = useState();
  console.log(music);
  const [skeltonMusic, setSkeltonMusic] = useState(false);
  // search
  const [ViewPage, setViewPage] = useState("viewLandingPage");
  // search
  // state hover
  const [isHover, setIsHover] = useState();
  // state hover
  // state Search component
    const [inputSearch, setInputSearch] = useState("");
  const [tipeSearch, setTipeSearch] = useState("album");
  const [resultAlbum, setResultAlbum] = useState();
  const [resultArtist, setResultForArtist] = useState();
  const [resultTrack, setResultTrack] = useState();
  const debounceTimeout = 1000;
  const [genre, setGenre] = useState();
  let debounceTimer;
  const [state, dispatch] = useContext(UserContext);
  const [history, setHistory] = useState();
  console.log(history);

  const mappingHistory = () => {
    setHistory(JSON.parse(localStorage.getItem("history")));
  };

  const remooveHistory = () => {
    localStorage.removeItem("history");
    setHistory();
  };

  const handleHistory = () => {
    const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
    const updatedHistory = [...existingHistory, state.audioData];
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const formatYear = (releaseDate) => {
    let result = new Date(releaseDate).getFullYear();
    return result;
  };
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

  const getAlbum1 = async () => {
    const response = await fetch(`${baseUrl}/albums/029WUoBjWc7Js1QiPH3mw0`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  function fillInput(e) {
    setInputSearch(e.target.value);
  }

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

  const fetchAlbum = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(
        `${baseUrl}/search?q=${inputSearch}&type=album&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const data = await response.json();
      setResultAlbum(data.albums.items);
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

  useEffect(() => {
    if (inputSearch !== "") {
      debounceTimer = setTimeout(() => {
        fetchAlbum();
        fetchArtist();
        fetchTrack();
      }, debounceTimeout);
    }
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [inputSearch, tipeSearch]);

  const changeTipeSearch = (item) => {
    setTipeSearch(item);
  };
  // state Search component

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

  useEffect(() => {
    handleHistory();
    mappingHistory();
  }, [state.audioData]);

  useEffect(() => {
    remooveHistory();
    getToken();
    localStorage.removeItem("history");
    setTimeout(() => {
      getplaylist();
      fetchGenre();
    }, 500);
  }, []);

  return (
    <>
      <div className=" md:flex ">
        {/* kiri */}
        <div className=" md:h-screen overflow-hidden  md:w-1/4 ">
          <div className="h-screen pb-20">
            <div className=" m-2 p-2  rounded-md bg-neutral-900 h-1/5 ">
              <div className="m-3 flex animate__animated animate__fadeIn cursor-pointer">
                <img className="w-5 h-5 m-2" src="/home.png" alt="" />
                <h1
                  className="m-1 text-slate-300 font-bold"
                  onClick={() => setViewPage("viewLandingPage")}
                >
                  Home
                </h1>
              </div>
              <div
                className="m-2 flex animate__animated animate__fadeIn cursor-pointer"
                onClick={() => setViewPage("viewSearchPage")}
              >
                <img className=" w-5 h-5  m-2" src="/pencarian.png" alt="" />
                <h1 className="m-1 text-slate-300 font-bold">Cari</h1>
              </div>
              <div
                onClick={() => setViewPage("aboutDeveloper")}
                className="m-2 cursor-pointer flex animate__animated animate__fadeIn cursor-pointer"
              >
                <img className=" w-5 h-5  m-2" src="/eng.png" alt="" />
                <h1 className="m-1 text-slate-300 font-bold">Settings</h1>
              </div>
            </div>
            <div className=" m-2 p-2 overflow-auto rounded-md bg-neutral-900   h-4/5 ">
              <div className="flex ">
                <h1 className="m-1 text-slate-300 font-bold">History</h1>
              </div>
              <div className=" animate__animated animate__fadeIn">
                {skeltonMusic ? (
                  <>
                    <div></div>
                  </>
                ) : (
                  <>
                    {history?.map((item) => (
                      <>
                        <div className="flex m-2 bg-neutral-800 rounded-md drop-shadow-2xl">
                          <div className="">
                            {item.audioImage ? (
                              <img
                                className="w-12 h-12 rounded-md"
                                src={item.audioImage}
                                alt=""
                              />
                            ) : (
                              <img
                                className="w-12 h-12 rounded-md"
                                src="/baru.jpg"
                                alt=""
                              />
                            )}
                          </div>
                          <div className="flex justify-center align-item items-center ms-3">
                            <h1 className="text-xs font-medium">
                              {item.audioName}
                            </h1>
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* kiri */}

        {/* kanan */}
        {ViewPage === "viewLandingPage" && (
          <div className="bg-neutral-900  pb-20  overflow-auto h-screen md:w-3/4">
            <div className=" md:bg-gradient-to-b from-green-900 to-neutral-900 rounded-md ">
              <div className="md:p-10 animate__animated animate__fadeIn ">
                <h1 className="text-3xl font-bold invisible text-white font-bold md:visible">
                  {greetings()}
                </h1>
              </div>
              {/* main container inner */}
              <div className=" grid gap-x-4 gap-y-4 grid-cols-2 overflow-x-auto md:m-6 md:grid md:gap-x-8 md:gap-y-4 md:grid-cols-3 animate__animated animate__fadeIn">
                <div className=" rounded-md overflow-hidden drop-shadow-2xl">
                  <div className="flex">
                    <div>
                      <img className="w-20 h-20" src="TULUS.jpg" alt="" />
                    </div>
                    <div className="w-full bg-gray-600 bg-opacity-50 ">
                      <div className="mt-6 ms-5">
                        <h1 className="text-white font-bold ">Tulus</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-md overflow-hidden drop-shadow-2xl ">
                  <div className="flex">
                    <div>
                      <img className="w-20 h-20" src="cek1.jpg" alt="" />
                    </div>
                    <div className="w-full bg-gray-600 bg-opacity-50 ">
                      <div className="mt-6 ms-5">
                        <h1 className="text-white font-bold ">Tulus</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-md overflow-hidden drop-shadow-2xl">
                  <div className="flex">
                    <div>
                      <img className="w-20 h-20" src="cek2.jpg" alt="" />
                    </div>
                    <div className="w-full bg-gray-600 bg-opacity-50 ">
                      <div className="mt-6 ms-5">
                        <h1 className="text-white font-bold ">Tulus</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" rounded-md overflow-hidden drop-shadow-2xl">
                  <div className="flex">
                    <div>
                      <img className="w-20 h-20" src="cek3.jpg" alt="" />
                    </div>
                    <div className="w-full bg-gray-600 bg-opacity-50 ">
                      <div className="mt-6 ms-5">
                        <h1 className="text-white font-bold ">Tulus</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* main container inner */}
            </div>
            {/* main container bawah */}

            {skeltonMusic ? (
              <SkeltonMusic />
            ) : (
              <div className=" grid gap-4 grid-cols-2 md:grid md:gap-x-8 md:gap-y-4 md:grid-cols-3 md:p-4  lg:grid lg:gap-x-12 lg:gap-y-12 lg:grid-cols-4 lg:p-4">
                {music?.map((item1) => (
                  <div className=" bg-neutral-800 p-4 rounded-md md:w-40 md:h-56 animate__animated animate__fadeIn drop-shadow-2xl">
                    <div className="relative ">
                      <img
                        className="mx-auto  rounded-md h-16 w-16  md:h-32  md:w-32 "
                        src={item1.track.album.images[1].url}
                        alt="tidak ada gambar"
                      />
                      <div
                        className="bg-green-500 w-12 h-12 absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
                        onClick={() => {
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
                          className="w-8 h-8"
                          src="/playbutton.jpg"
                          alt="not"
                        />
                      </div>
                    </div>
                    <div className=" ">
                      <h1 className="text-center font-bold text-xs">
                        {item1.track.name}
                      </h1>
                    </div>
                    <div className=" ">
                      <h1 className="text-center font-bold text-xs">
                        {item1.track.artists[0].name}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* halaman search page */}
        {ViewPage === "viewSearchPage" && (
          <>
            <div className="bg-neutral-900   pb-20 overflow-auto h-screen md:w-3/4 ">
              <div className=" p-4  bg-neutral-900 animate__animated animate__fadeIn">
                <div>
                  <input
                    className="bg-neutral-800 rounded-lg p-2  w-80"
                    type="text"
                    placeholder="Apa yang ingin kamu dengarkan"
                    onChange={fillInput}
                  />
                </div>
                {inputSearch ? (
                  <div className=" w-96  mt-4 grid gap-x-8 gap-y-4 grid-cols-3 animate__animated animate__fadeIn">
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
              </div>

              {inputSearch === "" && (
                <div className="  md:grid md:gap-x-2 md:gap-y-4 md:grid-cols-3 md:mt-6 lg:grid lg:gap-x-2 lg:gap-y-4 lg:grid-cols-4  lg:mt-6  xl:grid xl:gap-x-2 xl:gap-y-4 xl:grid-cols-5 xl:mt-6 ">
                  {genre?.map((itemGenre, index) => (
                    <div
                      key={index}
                      className={` h-44 w-44 rounded-lg overflow-hidden relative animate__animated animate__fadeIn ${
                        colorClassNames[index % colorClassNames.length]
                      }`}
                    >
                      <div className=" mt-2 ms-2">
                        <h1 className="font-bold">{itemGenre.name}</h1>
                      </div>
                      <div className=" absolute  -bottom-4  -right-4 w-24 h-24 ">
                        <img
                          className="rotate-45 w-32 h-24"
                          src={itemGenre.album.images[1].url}
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tipeSearch === "album" && (
                <div className="  md:grid md:gap-x-2 md:gap-y-4 md:grid-cols-3 md:mt-6 lg:grid lg:gap-x-2 lg:gap-y-4 lg:grid-cols-4  lg:mt-6  xl:grid xl:gap-x-2 xl:gap-y-4 xl:grid-cols-5 xl:mt-6 ">
                  {resultAlbum?.map((itemAlbum, index) => (
                    <div
                      key={index}
                      className={`bg-neutral-800 h-56 w-44 rounded-lg animate__animated animate__fadeIn cursor-pointer drop-shadow-2xl`}
                      onClick={() => {
                        setViewPage("viewDetailAlbumPage");
                        dispatch({
                          type: "SET_DETAIL_ALBUM",
                          payload: {
                            detailValueIdAlbum: itemAlbum.id,
                            detailValueTypeAlbum: itemAlbum.type,
                            detailValueImageAlbum: itemAlbum.images[0].url,
                            detailValueArtisName: itemAlbum.artists[0].name,
                            detailValueReleaseAlbum: itemAlbum.release_date,
                            detailValueTotalTrackAlbum: itemAlbum.total_tracks,
                            detailValueNameAlbum: itemAlbum.name,
                          },
                        });
                      }}
                    >
                      <div className="rounded-md mx-auto mt-2  w-36 h-36 ">
                        <img
                          className="w-36 h-36 rounded-md"
                          src={itemAlbum.images[0].url}
                          alt=""
                        />
                      </div>
                      <div className=" mx-auto overflow-hidden mt-2  w-36 h-6">
                        <p className="font-bold text-sm"> {itemAlbum.name}</p>
                      </div>
                      <div className="flex  mx-auto overflow-hidden mt-1  w-36 h-6">
                        <div>
                          <p className="text-xs text-gray-300 font-medium">
                            {formatYear(itemAlbum.release_date)}{" "}
                          </p>
                        </div>
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
              )}

              {tipeSearch === "artist" && (
                <div className="  md:grid md:gap-x-2 md:gap-y-4 md:grid-cols-3 md:mt-6 lg:grid lg:gap-x-2 lg:gap-y-4 lg:grid-cols-4  lg:mt-6  xl:grid xl:gap-x-2 xl:gap-y-4 xl:grid-cols-5 xl:mt-6 ">
                  {resultArtist?.map((itemArtis, index) => (
                    <div
                      key={index}
                      className={` bg-neutral-800 h-56 w-44 rounded-lg animate__animated animate__fadeIn drop-shadow-2xl`}
                    >
                      {itemArtis.images[0] && itemArtis.images[0].url ? (
                        <div className="rounded-full mx-auto mt-2  w-36 h-36 ">
                          <img
                            className=" w-36 h-36  rounded-full"
                            src={itemArtis.images[0].url}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="rounded-full mx-auto mt-2  w-36 h-36 ">
                          <img
                            className=" w-36 h-36  rounded-full"
                            src="/baru.jpg"
                            alt=""
                          />
                        </div>
                      )}

                      <div className=" mx-auto overflow-hidden mt-2  w-36 h-6">
                        <p className="font-bold text-sm"> {itemArtis.name}</p>
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
              )}

              {tipeSearch === "track" && (
                <div>
                  <div className="  ">
                    <div className="mt-6   h-8 ms-4 me-4 flex">
                      <div className=" flex w-3/4">
                        <div className="  w-14 flex justify-center align-item items-center">
                          <p className="text-gray-400 text-sm">#</p>
                        </div>
                        <div className=" ms-4 ">
                          <p className="text-sm text-gray-400 ">Judul</p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-1/3">
                        <p className="font-medium text-sm text-gray-400 text-gray-500">
                          Album
                        </p>
                      </div>
                    </div>
                    {resultTrack.map((itemTrack, index) => (
                      <div
                        key={index}
                        className="mt-6  h-16 ms-4 me-4 flex "
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
                        <div className=" flex w-3/4">
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
                          <div className=" ms-2 ">
                            <p className="text-sm font-bold">
                              {itemTrack.name}
                            </p>
                            <div className="m-2"></div>
                            <p className="text-sm text-gray-300 font-medium">
                              {itemTrack.artists[0].name}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-1/3">
                          <p className="font-medium text-sm text-gray-300">
                            {itemTrack.album.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {/* halaman search page */}

        {ViewPage === "viewDetailAlbumPage" && (
          <>
            <div className="bg-neutral-900  pb-20  overflow-auto h-screen md:w-3/4 relative">
              <div className=" h-96 md:bg-gradient-to-b from-gray-500 to-neutral-900 rounded-md flex ">
                <div className="bg-transparent  ">
                  <div
                    className=" m-4 w-12  flex justify-center align-item items-center rounded-lg bg-gray-600 cursor-pointer"
                    onClick={() => setViewPage("viewSearchPage")}
                  >
                    <h1 className="text-2xl"> ← </h1>
                  </div>
                </div>

                <div className=" animate__animated animate__fadeIn w-1/3 flex justify-center align-item items-center ">
                  <div>
                    <img
                      className=" md:w-52 md:h-44  lg:h-64 lg:w-64"
                      src={state.detailAlbum.detailValueImageAlbum}
                      alt=""
                    />
                  </div>
                </div>

                <div className=" animate__animated animate__fadeIn w-2/3 flex justify-center align-item items-center">
                  <div className="w-full h-50 ">
                    <div>
                      <p>{state.detailAlbum.detailValueTypeAlbum}</p>
                    </div>
                    <div>
                      <h1 className={Style.title}>
                        {state.detailAlbum.detailValueNameAlbum}
                      </h1>
                    </div>
                    <div className="h-8 flex">
                      <div>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={state.detailAlbum.detailValueImageAlbum}
                          alt=""
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-bold">
                          {state.detailAlbum.detailValueArtisName}
                        </p>
                      </div>
                      <div className="mt-2 ms-2 me-2">
                        <p className="text-xs">•</p>
                      </div>
                      <div className="mt-2 me-2">
                        <p className="text-xs font-bold">
                          {state.detailAlbum.detailValueTotalTrackAlbum} Lagu
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs">
                          {state.detailAlbum.detailValueReleaseAlbum}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <ViewDetailAlbum />
              </div>
            </div>
          </>
        )}

        {ViewPage === "aboutDeveloper" && <About />}

        {/* kanan */}

        {/* play button */}
        <div className=" absolute inset-x-0 bottom-0 h-20  bg-black z-20">
          {/* {loadingValuePlayer ? ( */}
          {state.isLoading  ? <div></div> : <AudioPlayer />}
            
        </div>
        {/* play button */}
      </div>
    </>
  );
}
