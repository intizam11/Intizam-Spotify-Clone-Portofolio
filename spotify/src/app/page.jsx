"use client";

import Progres from "@/app/components/progres";
import { useEffect, useState } from "react";
import FirstLoad from "../app/components/firstLoad";
import Web from "../app/components/web";
import Mobile from "@/app/components/mobile";

export default function Home() {
  const [loadBaru, setLoadBaru] = useState(true);
  const mobileWidth = 768;
  const [windowWidth, setWindowWidth] = useState(0);
  

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoadBaru(false);
    }, 1500);
  }, []);

  return (
    <div>
      {loadBaru ? (
        <FirstLoad />
      ) : (
        <div className="container mx-auto overflow-hidden ">
          {windowWidth < mobileWidth ? (
            // <Progres />
            <Mobile />
          ) : (
            <Web />
          )}
        </div>
      )}
    </div>
  );
}
