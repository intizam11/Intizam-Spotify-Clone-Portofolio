"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlayMusicMobile from "@/app/components/componentMobile/viewPlayMusic";
import SpotifyWebApi from "spotify-web-api-js";

export default function Mobile() {
  const [viewPageMobile, setViewPageMobile] = useState("landingpageMobile");
  const spotifyAPI = new SpotifyWebApi();
  let greet = new Date().getHours();
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const client_id = process.env.NEXT_PUBLIC_CLIENT;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [music, setMusic] = useState();
  console.log(music);
  const [skeltonMusic, setSkeltonMusic] = useState(false);

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
        <div className="h-1/5 border border-red-400">
          {/* header */}
          <div className="border border-red-400 flex">
            {/* header kiri */}
            <div className="border w-1/2">
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
            <div className="w-1/2 border "></div>
            {/* header kanan */}
          </div>
          {/* header */}

          {viewPageMobile == "searchMusicMobile" ? (
            <div className="border flex p-4 ">
              <div className="w-1/2  border">
                <input
                  // onChange={handleInput}
                  placeholder="search"
                  className="rounded-lg outline-none w-40 p-1 text-gray-950"
                  type="text"
                />
              </div>
              <div className="flex justify-items-center border  w-1/2"></div>
            </div>
          ) : (
            <div className="border flex p-4 ">
              <div className="border w-full flex justify-center align-item items-center">
                <h1 className="text-3xl font-bold  text-white font-bold md:visible">
                  {greetings()}
                </h1>
              </div>
            </div>
          )}
          {/* search bar */}

          {/* search bar */}
        </div>

        {viewPageMobile == "landingpageMobile" && (
          <div className="border h-4/5 overflow-auto">
            <div class=" flex  border border-red-400 overflow-x-scroll ">
              {music?.map((item1) => (
                <div className="border bg-neutral-800 h-28 w-28 flex-shrink-0 rounded-lg m-2 relative">
                  <img
                    className="mx-auto border  rounded-md h-16 w-16  w-full h-full "
                    src={item1.track.album.images[1].url}
                    alt="tidak ada gambar"
                  />
                  <div
                    className="bg-green-500 w-8 h-8  absolute z-10 bottom-2 right-3 flex items-center justify-center rounded-full cursor-pointer "
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
                    <img className="w-6 h-6" src="/playbutton.jpg" alt="not" />
                  </div>
                </div>
              ))}
            </div>

            <div class=" flex  border border-red-400 overflow-x-scroll mt-6">
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
            </div>
            <div class=" flex  border border-red-400 overflow-x-scroll mt-6">
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
            </div>
            <div class=" flex  border border-red-400 overflow-x-scroll ">
              <div className="flex justify-center align-item items-center border h-28 w-28 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-28 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-28 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-28 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-28 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
            </div>
            <div class=" flex  border border-red-400 overflow-x-scroll mt-6">
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-28 w-56 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
            </div>
            <div class=" flex  border border-red-400 overflow-x-scroll mt-6">
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
              <div className="flex justify-center align-item items-center border h-20 w-20 flex-shrink-0 rounded-lg m-2">
                <div>cek</div>
              </div>
            </div>
          </div>
        )}

        {viewPageMobile == "playMusicMobile" && (
          <>
            <PlayMusicMobile />
          </>
        )}

        {viewPageMobile == "searchMusicMobile" && (
          <div className="h-4/5 border">cek</div>
        )}
      </div>
      {/* navbar bottom */}
      <div className=" absolute inset-x-0 bottom-0 h-16  bg-black z-20 border grid grid-cols-4">
        <div
          onClick={() => setViewPageMobile("landingpageMobile")}
          className="border flex h-full justify-center align-item items-center"
        >
          <div className="bg-white w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
            <Image width={24} height={24} src="/playbutton.jpg" alt="not" />
          </div>
        </div>
        <div className="border flex h-full justify-center align-item items-center">
          <div className=" w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
            <Image width={24} height={24} src="/radio.png" alt="not" />
          </div>
        </div>
        <div className="border flex h-full justify-center align-item items-center">
          <div className=" w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
            <Image width={24} height={24} src="/music.png" alt="not" />
          </div>
        </div>
        <div
          onClick={() => setViewPageMobile("searchMusicMobile")}
          className="border flex h-full justify-center align-item items-center"
        >
          <div className=" w-8 h-8  flex items-center justify-center rounded-full mx-auto ">
            <Image width={24} height={24} src="/pencarian.png" alt="not" />
          </div>
        </div>
      </div>
      {/* navbar bottom */}
    </>
  );
}
