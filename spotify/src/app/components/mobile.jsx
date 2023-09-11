"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlayMusicMobile from "@/app/components/componentMobile/viewPlayMusic";

export default function Mobile() {
  const [viewPageMobile, setViewPageMobile] = useState("landingpageMobile");
  let greet = new Date().getHours();

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

  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
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
            <div className="border h-4/5">
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
      </div>
    </>
  );
}
