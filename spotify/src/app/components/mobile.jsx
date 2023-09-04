"use client";

// import { useEffect, useState } from "react";
import Image from "next/image";

export default function Mobile() {
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
      <div className="h-20 border h-screen bg-black  ">
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
            <div className="w-1/2 border grid justify-items-end">
              <div
                onClick={() => coba()}
                className="border m-2 h-12 w-12 grid justify-items-center p-2"
              >
                <div className="bg-white h-1 w-8  rounded-md "></div>
                <div className="bg-white h-1 w-8  rounded-md "></div>
                <div className="bg-white h-1 w-8  rounded-md "></div>
              </div>
            </div>
            {/* header kanan */}
          </div>
          {/* header */}
          {/* search bar */}
          <div className="border flex p-4 ">
            <div className="w-1/2  border">
              <input
                onChange={handleInput}
                placeholder="search"
                className="rounded-lg outline-none w-40 p-1 text-gray-950"
                type="text"
              />
            </div>
            <div className="flex justify-items-center border  w-1/2"></div>
          </div>
          {/* search bar */}
        </div>

        <div className=" h-4/5 border border-orange-200">
          <div className="m-8 h-80 border"></div>
        </div>
      </div>
    </>
  );
}
